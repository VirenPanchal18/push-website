// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
//
import { device } from '@site/src/config/globals';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Spinner, {
  SPINNER_TYPE,
} from '@site/src/components/reusables/spinners/SpinnerUnit';
import {
  EcosystemFeaturedListUrls,
  EcosystemPartnersList,
} from '@site/src/config/EcosystemAppsList';
import EcosystemCard from './EcosystemCard';

export type EcosystemApp = {
  name?: string;
  description?: string;
  nameKey?: string;
  descriptionKey?: string;
  icon: string;
  bgImage?: string;
  bgGradientColor: string;
  tags: string[];
  twitterId?: string;
  href?: string;
  titleColor?: string;
  descriptionColor?: string;
  tagsColor?: string;
  comingsoon?: boolean;
  appoftheweek?: true;
  spotlighttext?: string;
  spotlighttextKey?: string;
  secondary?: boolean;
};

type Props = {
  apps: EcosystemApp[];
  title?: string;
};

type TabKey = 'featured' | 'integration' | 'all';

const EcosystemBlocks: React.FC<Props> = ({ apps }) => {
  const { t } = useTranslation();

  const getInitialTab = (): TabKey => {
    if (typeof window === 'undefined') return 'featured';

    const params = new URLSearchParams(window.location.search);
    if (params.get('allapps') === 'true') return 'all';
    if (params.get('partners') === 'true') return 'integration';
    if (params.get('flagship') === 'true') return 'featured';
    return 'featured';
  };

  const [activeTab, setActiveTab] = useState<TabKey>(getInitialTab);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabChange = (tab: TabKey) => {
    setIsLoading(true);
    setActiveTab(tab);

    const params = new URLSearchParams();
    if (tab === 'featured') params.set('flagship', 'true');
    else if (tab === 'integration') params.set('partners', 'true');
    else if (tab === 'all') params.set('allapps', 'true');

    window.history.pushState({}, '', `?${params.toString()}`);

    // Track tab change in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      const tabNames = {
        featured: 'Flagship Apps',
        integration: 'Partners',
        all: 'All Apps',
      };
      window.gtag('event', 'ecosystem_tab_change', {
        event_category: 'ecosystem',
        event_label: tabNames[tab],
        tab_type: tab,
      });
    }

    setTimeout(() => setIsLoading(false), 300);
  };

  const filteredApps = useMemo(() => {
    let filtered = [];
    if (activeTab === 'featured') {
      // Sort featured apps by the order in EcosystemFeaturedListUrls
      const featuredApps = apps.filter(
        (a) =>
          a.href &&
          EcosystemFeaturedListUrls &&
          EcosystemFeaturedListUrls.includes(a.href)
      );

      // Sort by the order in EcosystemFeaturedListUrls
      filtered = featuredApps.sort((a, b) => {
        const indexA = EcosystemFeaturedListUrls.indexOf(a.href);
        const indexB = EcosystemFeaturedListUrls.indexOf(b.href);
        return indexA - indexB;
      });
    } else if (activeTab === 'integration') {
      filtered = EcosystemPartnersList || [];
    } else {
      filtered = apps;
    }

    return filtered.sort((a, b) => {
      if (a.appoftheweek && !b.appoftheweek) return -1;
      if (!a.appoftheweek && b.appoftheweek) return 1;
      return 0;
    });
  }, [apps, activeTab]);

  const primaryApps = useMemo(() => {
    return filteredApps.filter((app) => !app.secondary);
  }, [filteredApps]);

  const secondaryApps = useMemo(() => {
    return filteredApps.filter((app) => app.secondary);
  }, [filteredApps]);

  useEffect(() => {
    const current =
      tabsRef.current[
        activeTab === 'featured' ? 0 : activeTab === 'integration' ? 1 : 2
      ];

    if (current) {
      setUnderlineStyle({
        left: current.offsetLeft,
        width: current.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <>
      <HeaderRow>
        <Tabs>
          <TabButton
            ref={(el) => (tabsRef.current[0] = el)}
            $active={activeTab === 'featured'}
            onClick={() => handleTabChange('featured')}
          >
            {t('pages.ecosystem.tabs.flagship-apps')}
          </TabButton>

          <TabButton
            ref={(el) => (tabsRef.current[1] = el)}
            $active={activeTab === 'integration'}
            onClick={() => handleTabChange('integration')}
          >
            {t('pages.ecosystem.tabs.partners')}
          </TabButton>

          <TabButton
            ref={(el) => (tabsRef.current[2] = el)}
            $active={activeTab === 'all'}
            onClick={() => handleTabChange('all')}
          >
            {t('pages.ecosystem.tabs.all-apps')}
          </TabButton>

          <ActiveUnderline
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
          />
        </Tabs>
      </HeaderRow>
      {isLoading ? (
        <LoadingContainer>
          <Spinner size={48} type={SPINNER_TYPE.PROCESSING} />
        </LoadingContainer>
      ) : (
        <>
          <Grid>
            {primaryApps.map((app) => (
              <EcosystemCard key={app.name} app={app} />
            ))}
          </Grid>
          {secondaryApps.length > 0 && (
            <SecondaryGrid>
              {secondaryApps.map((app) => (
                <EcosystemCard key={app.name} app={app} />
              ))}
            </SecondaryGrid>
          )}
        </>
      )}
    </>
  );
};

export default EcosystemBlocks;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  margin-top: 32px;
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  margin-top: 32px;
  gap: clamp(16px, 2.5vw, 24px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media ${device.laptop} {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
`;

const SecondaryGrid = styled.div`
  position: relative;
  display: grid;
  margin-top: 32px;
  gap: clamp(16px, 2.5vw, 24px);
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, calc(33.33% - 16px))
  ) !important;

  @media ${device.tablet} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(160px, calc(50% - 12px))
    ) !important;
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fill, minmax(120px, 100%)) !important;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Tabs = styled.div`
  position: relative;
  display: inline-flex;
  gap: 36px;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #281e4c;

  @media ${device.mobile} {
    gap: 20px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;

  color: ${({ $active }) =>
    $active ? 'var(--ifm-color-white)' : 'var(--ifm-color-overlay-white-30)'};

  &:hover {
    color: ${({ $active }) =>
      $active ? 'var(--ifm-color-white)' : 'var(--ifm-color-overlay-white-70)'};
  }

  @media ${device.laptop} {
    font-size: 20px;
  }
`;

const ActiveUnderline = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--ifm-color-custom-pink);
  transition: all 0.25s ease;
`;

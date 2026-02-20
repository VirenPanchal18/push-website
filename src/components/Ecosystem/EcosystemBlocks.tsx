// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
//
import React, { useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '@site/src/config/globals';

import EcosystemCard from './EcosystemCard';

export type EcosystemApp = {
  id: number;
  name: string;
  description: string;
  icon: string;
  bgImage: string;
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
  featured?: boolean;
  integration_partner?: boolean;
};

type Props = {
  apps: EcosystemApp[];
  title?: string;
};

type TabKey = 'featured' | 'integration' | 'all';

const EcosystemBlocks: React.FC<Props> = ({ apps }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('featured');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredApps = useMemo(() => {
    if (activeTab === 'featured') return apps.filter((a) => !!a.featured);
    if (activeTab === 'integration')
      return apps.filter((a) => !!a.integration_partner);
    return apps;
  }, [apps, activeTab]);

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
            onClick={() => setActiveTab('featured')}
          >
            Flagship Apps
          </TabButton>

          {/* <TabButton
            ref={(el) => (tabsRef.current[1] = el)}
            $active={activeTab === 'integration'}
            onClick={() => setActiveTab('integration')}
          >
            Integration Partners
          </TabButton> */}

          <TabButton
            ref={(el) => (tabsRef.current[2] = el)}
            $active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            All Apps
          </TabButton>

          <ActiveUnderline
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
          />
        </Tabs>
      </HeaderRow>
      <Grid>
        {filteredApps.map((app) => (
          <EcosystemCard key={app.name} app={app} />
        ))}
      </Grid>
    </>
  );
};

export default EcosystemBlocks;

const Grid = styled.div`
  display: grid;
  margin-top: 32px;
  gap: clamp(16px, 2.5vw, 24px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media ${device.laptop} {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

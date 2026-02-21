// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import useBaseUrl from '@docusaurus/useBaseUrl';
import { EcosystemPushApps } from '@site/src/config/EcosystemsPushApps';
import { device } from '@site/src/config/globals';
import { H2, ItemV } from '@site/src/css/SharedStyling';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const EcosystemEssentials: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ItemV gap='32px' alignItems='flex-start'>
      <H2 fontSize='26px' fontWeight='600'>
        {t('components.ecosystem-essentials.title')}
      </H2>
      <EssentialGrid>
        {EcosystemPushApps?.map((app) => {
          const handleEssentialAppClick = () => {
            // Track essential app click in Google Analytics
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'essential_app_click', {
                event_category: 'ecosystem',
                event_label: t(app.nameKey),
                app_name: t(app.nameKey),
                app_url: app.href,
              });
            }
          };

          return (
            <EssentialCard
              key={app.nameKey}
              href={app.href}
              target='_blank'
              rel='noopener'
              bgGradient={app.bgGradient}
              onClick={handleEssentialAppClick}
            >
              <EssentialIcon src={useBaseUrl(app.icon)} alt='' />
              <EssentialContent>
                <EssentialName>{t(app.nameKey)}</EssentialName>
                <EssentialDesc>{t(app.descriptionKey)}</EssentialDesc>
              </EssentialContent>
            </EssentialCard>
          );
        })}
      </EssentialGrid>
    </ItemV>
  );
};

export default EcosystemEssentials;

const EssentialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const EssentialCard = styled.a<{ bgGradient: string }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(171, 70, 248, 0.4);
  background: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  transition: transform 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    box-shadow:
      2.788px 2.598px 12px 0 rgba(255, 255, 255, 0.15) inset,
      1.858px 1.732px 6px 0 rgba(255, 255, 255, 0.15) inset;
  }

  &:hover {
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }
`;

const EssentialIcon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  flex-shrink: 0;
`;

const EssentialContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const EssentialName = styled.h3`
  font-size: 26px;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const EssentialDesc = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--ifm-color-neutral-300);
  margin: 0;
`;

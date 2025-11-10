// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { ItemV, H2 } from '@site/src/css/SharedStyling';
import { device } from '@site/src/config/globals';
import { EcosystemPushApps } from '@site/src/config/EcosystemsPushApps';
import useBaseUrl from '@docusaurus/useBaseUrl';

const EcosystemApps: React.FC = () => {
  return (
    <ItemV gap='32px' alignItems='flex-start'>
      <H2 fontSize='26px' fontWeight='600'>
        Explore Essential Testnet Apps
      </H2>
      <EssentialGrid>
        {EcosystemPushApps?.map((app) => (
          <EssentialCard
            key={app.name}
            href={app.href}
            target='_blank'
            rel='noopener'
            bgGradient={app.bgGradient}
          >
            <EssentialIcon src={useBaseUrl(app.icon)} alt='' />
            <EssentialContent>
              <EssentialName>{app.name}</EssentialName>
              <EssentialDesc>{app.description}</EssentialDesc>
            </EssentialContent>
          </EssentialCard>
        ))}
      </EssentialGrid>
    </ItemV>
  );
};

export default EcosystemApps;

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

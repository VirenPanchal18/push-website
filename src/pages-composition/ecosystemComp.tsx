// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import styled from 'styled-components';

import { Content, H1, ItemV, Section, Span } from '@site/src/css/SharedStyling';
import { device } from '@site/src/config/globals';
import { EcosystemAppsList } from '@site/src/config/EcosystemAppsList';
import EcosystemBlocks from '@site/src/components/Ecosystem/EcosystemBlocks';
import EcosystemApps from '../components/Ecosystem/EcosystemApps';

// ----- Page -----
const EcosystemComp: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <Section>
        <Content className='skeletonsmall'>
          <HeroWrap>
            <ItemV alignItems='flex-start' gap='12px'>
              <H1>Testnet Apps</H1>
              <Span fontSize='20px' lineHeight='30px'>
                Explore the ecosystem of universal apps that feel like magic to
                use. Discover apps, partners, and projects being built on Push
                Chain Testnet
              </Span>
            </ItemV>
          </HeroWrap>
        </Content>
      </Section>

      {/* Essential Apps */}
      <Section>
        <AppsContent>
          <EcosystemApps />
        </AppsContent>
      </Section>

      {/* Grid */}
      <Section id='ecosystem-list'>
        <Content>
          <EcosystemBlocks apps={EcosystemAppsList} />
        </Content>
      </Section>

      {/* CTA */}
      <Section>
        <Content>
          <CTAWrap>
            <H1
              as='h3'
              fontSize='1.5rem'
              fontWeight='600'
              color='var(--ifm-color-white)'
            >
              Want to join the fastest growing universal app ecosystem and 10x
              your userbase?
            </H1>
            <CTAButton
              href='https://portal.push.org/'
              target='_blank'
              rel='noopener'
            >
              Start Building →
            </CTAButton>
          </CTAWrap>
        </Content>
      </Section>
    </>
  );
};

export default EcosystemComp;

const HeroWrap = styled.div`
  max-width: 970px;
`;
const AppsContent = styled(Content)`
  padding: 0px 48px;

  @media ${device.laptop} {
    padding: 0px 32px;
  }

  @media ${device.mobileL} {
    padding: 0px 16px;
  }
`;

const CTAWrap = styled(ItemV)`
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: clamp(24px, 8vw, 64px) 0;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 10px 16px;
  border-radius: 999px;
  background: #d548ec;
  color: white;
  font-weight: 700;
  text-decoration: none;
`;

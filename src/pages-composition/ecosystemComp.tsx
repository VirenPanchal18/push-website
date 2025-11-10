// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  Content,
  H1,
  ItemV,
  PrimaryA,
  Section,
  Span,
} from '@site/src/css/SharedStyling';
import { device } from '@site/src/config/globals';
import { EcosystemAppsList } from '@site/src/config/EcosystemAppsList';
import EcosystemBlocks from '@site/src/components/Ecosystem/EcosystemBlocks';
import EcosystemApps from '../components/Ecosystem/EcosystemApps';
import { BsArrowRight } from 'react-icons/bs';

// ----- Page -----
const EcosystemComp: React.FC = () => {
  // Localization
  const { t } = useTranslation();
  return (
    <>
      {/* Hero */}
      <Section>
        <Content className='skeletonsmall'>
          <HeroWrap>
            <ItemV alignItems='flex-start' gap='12px'>
              <H1 margin='0px 0px'>
                {t('pages.ecosystem.hero-section.title')}
              </H1>
              <Span fontSize='20px' lineHeight='30px'>
                {t('pages.ecosystem.hero-section.description')}
              </Span>
            </ItemV>
          </HeroWrap>
        </Content>
      </Section>

      <GlowCircle />

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
        <BodyContent>
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
            <PrimaryA
              href={'https://portal.push.org'}
              title={'Start Building'}
              aria-label={'Start Building'}
              zIndex='2'
              alignItems='center'
            >
              Start Building
              <BsArrowRight className='start-svg' />
            </PrimaryA>
          </CTAWrap>
        </BodyContent>
      </Section>
    </>
  );
};

export default EcosystemComp;

const HeroWrap = styled.div`
  max-width: 970px;

  h1 {
    margin-bottom: 0px !important;
  }
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

const BodyContent = styled(Content)`
  padding: 0px 48px;

  @media ${device.laptop} {
    padding: 0px 32px;
  }

  @media ${device.mobileL} {
    padding: 0px 16px;
  }
`;

const GlowCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(179, 72, 236, 0.2);
  filter: blur(125px);
  pointer-events: none;
  z-index: 2;

  width: 600px;
  height: 600px;
  left: 10%;
  top: 150px;

  @media ${device.desktopL} {
    left: 20%;
  }

  @media ${device.laptopL} {
    width: 500px;
    height: 500px;
    left: 25%;
  }

  @media ${device.tablet} {
    width: 543px;
    height: 538px;
    left: 238px;
    top: 29px;
  }

  @media ${device.mobileL} {
    width: 395px;
    height: 392px;
    left: -12px;
    top: 102px;
  }
`;

const CTAWrap = styled(ItemV)`
  align-items: center;
  gap: 48px;
  text-align: center;
  max-width: 748px;
  margin: 0 auto;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .start-svg {
    color: var(--ifm-color-white);
    margin: 0px 0 0 8px;
  }
`;

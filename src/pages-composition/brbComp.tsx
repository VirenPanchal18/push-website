// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React, { useRef } from 'react';

// External Components
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

// Internal Components
import { CommunityPartners } from '@site/src/components/BRB/BRBCommunityPartners';
import BRBParallax from '@site/src/components/BRB/BRBParallax';
import { PartnerBounties } from '@site/src/components/BRB/BRBPartnerBounties';
import { Partners } from '@site/src/components/BRB/BRBPartners';
import Schedules from '@site/src/components/BRB/BRBSchedules';
import ImageHolder from '@site/src/components/ImageHolder';
import {
  Button,
  Content,
  Image,
  ItemH,
  ItemV,
  Section,
  Span,
} from '@site/src/css/SharedStyling';
import useMediaQuery from '@site/src/hooks/useMediaQuery';

// Import Assets
import Discord from '@site/static/assets/website/brb/Discord-BRB.svg';
import ImageBRB from '@site/static/assets/website/brb/Image-BRB.png';
import MobileBRB from '@site/static/assets/website/brb/Mobile-BRB.png';
import X from '@site/static/assets/website/brb/X-BRB.svg';

// Internal Configs
import BRBOnline from '@site/src/components/BRB/BRBOnline';
import { device } from '@site/src/config/globals';

// Interfaces and Props

// Helper Functions

// Helper Component
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Main
const BRBComp = () => {
  const d = new Date();
  const year = d.getFullYear();
  const isMobile = useMediaQuery(device.mobileL);

  const [isAlertVisible] = React.useState(true);

  const openLink = (link: string) => {
    window.open(link, '_blank');
  };

  const elem0 = useRef(null);

  return (
    <BrbWrapper background='var(--ifm-color-black)'>
      <ItemTop>
        <ItemV
          id='new'
          margin={isAlertVisible && isMobile ? '5em 0 0 0' : '0 0 0 0'}
        >
          <MemberImage
            className='pushMissingSvg'
            src={isMobile ? MobileBRB : ImageBRB}
            srcSet={isMobile ? MobileBRB : ImageBRB}
          />
        </ItemV>

        <NavText id='elems0'>
          Get ready for an epic tech showdown across 18 cities in India, where
          amazing minds come together to solve one big problem, with a chance to
          win over $50,000 USD in prizes!
        </NavText>

        <NavButtons id='elems' ref={elem0}>
          <ButtonItem
            borderRadius='24px'
            background='var(--ifm-color-pink-secondary)'
            border='1px solid var(--ifm-color-pink-secondary)'
            fontSize='18px'
            padding='16px 32px'
            fontWeight='400'
            onClick={() => handleSectionNavigation('bounties')}
          >
            Register Now
          </ButtonItem>
        </NavButtons>
      </ItemTop>

      <BRBParallax />

      <Section id='partners'>
        <Content>
          <Partners />
        </Content>
      </Section>

      <Section>
        <Content className='fluid'>
          <CommunityPartners />
        </Content>
      </Section>

      <Section id='bounties'>
        <Content>
          <PartnerBounties />
        </Content>
      </Section>

      <Section id='schedule'>
        <Content className='fluid'>
          <Schedules />
        </Content>
      </Section>

      <Section id='online'>
        <Content>
          <BRBOnline />
        </Content>
      </Section>

      <Section id='support'>
        <Content>
          <ItemV>
            <ItemH gap='28px'>
              <ItemV
                minWidth='280px'
                background='var(--ifm-color-black)'
                padding='20px 48px'
                gap='14px'
                borderRadius='48px'
                background='var(--ifm-color-gray-200)'
              >
                <SpanContent
                  fontSize='112px'
                  fontWeight='400'
                  color='var(--ifm-color-pink-secondary)'
                  letterSpacing='0.01'
                >
                  Drop us a GM!
                </SpanContent>
              </ItemV>

              <ItemV gap='28px' minWidth='280px' alignItems='stretch'>
                <FooterBar
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    openLink('https://discord.com/invite/pushchain')
                  }
                >
                  <i>
                    <Discord />
                  </i>

                  <Span
                    fontSize='36px'
                    fontWeight='400'
                    color='var(--ifm-color-discord-blue)'
                  >
                    24x7 Support on Discord
                  </Span>

                  <Image
                    width={65}
                    src={
                      require(
                        `@site/static/assets/website/brb/others/ArrowIcon.webp`
                      ).default
                    }
                    srcSet={`${require(`@site/static/assets/website/brb/others/ArrowIcon@2x.webp`).default} 2x, ${require(`@site/static/assets/website/brb/others/ArrowIcon@3x.webp`).default} 3x`}
                    alt={`Image showing BRB Chat is powered by Push Chat`}
                  />
                </FooterBar>

                <FooterBar
                  style={{ cursor: 'pointer' }}
                  onClick={() => openLink('https://x.com/PushChain')}
                >
                  <i>
                    <X className='discord' />
                  </i>

                  <Span
                    fontSize='36px'
                    fontWeight='400'
                    color='var(--ifm-color-twitter-blue)'
                  >
                    Updates & Announcements
                  </Span>

                  <Image
                    width={65}
                    src={
                      require(
                        `@site/static/assets/website/brb/others/ArrowIcon.webp`
                      ).default
                    }
                    srcSet={`${require(`@site/static/assets/website/brb/others/ArrowIcon@2x.webp`).default} 2x, ${require(`@site/static/assets/website/brb/others/ArrowIcon@3x.webp`).default} 3x`}
                    alt={`Image showing BRB Chat is powered by Push Chat`}
                  />
                </FooterBar>
              </ItemV>
            </ItemH>
          </ItemV>
        </Content>
      </Section>

      <BottomGrad>
        <Span fontSize='18px' fontWeight='400' color='var(--ifm-color-white)'>
          © {year || ''} Push. All rights reserved.
        </Span>
      </BottomGrad>
    </BrbWrapper>
  );
};

const MemberImage = styled(ImageHolder)`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const ItemTop = styled.main`
  width: 100%;
  margin: 261px 0 261px 0;

  @media ${device.mobileL} {
    width: 100%;
    margin: 125px 0 0px 0;
  }
`;

const ButtonItem = styled(Button)`
  vertical-align: middle;
  font-size: 18px;
  font-style: normal;
  font-family: Glancyr, sans-serif;
  letter-spacing: 0.03em;
  &:hover {
    box-shadow: 0px 4px 12px 0px var(--ifm-color-overlay-pink-50);
    border: 1px solid transparent;
  }
  &:hover:after {
    opacity: 0;
  }
  &:active:after {
    opacity: 0;
  }
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const BrbWrapper = styled(ItemV)`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--ifm-color-black);
  font-family: Glancyr, sans-serif;

  & .pushMissingSvg {
    width: 900px;
    @media ${device.tablet} {
      width: 50%;
    }
    @media ${device.mobileL} {
      width: 248px;
    }
  }
`;

const NavText = styled.div`
  color: var(--ifm-color-white);
  font-family: Glancyr, sans-serif;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  z-index: -1;

  width: 844px;
  text-align: center;
  margin: 20px auto 0 auto;

  @media ${device.laptop} {
    width: 80%;
  }

  @media ${device.mobileL} {
    width: 248px;
    font-size: 14px;
    font-style: normal;
    line-height: normal;
  }
`;

const NavButtons = styled.div`
  margin: 39px 0 0 0;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
  z-index: -1;

  @media ${device.laptop} {
    flex-direction: column;
  }

  @media ${device.mobileL} {
    margin: 50px auto 0 auto;
    flex-direction: column;
    width: 252px;
  }
`;

const SpanContent = styled(Span)`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;

  @media ${device.laptop} {
    -webkit-line-clamp: 3;
  }

  @media ${device.mobileL} {
    font-size: 89px;
    line-height: 110%;
  }
`;

const FooterBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 40px 48px;
  box-sizing: border-box;
  gap: 14px;

  border-radius: 48px;
  background: var(--ifm-color-gray-200);
  flex: 1;

  @media ${device.laptop} {
    flex-direction: column;
    flex-wrap: wrap;
  }

  & ${Span} {
    max-width: 312px;

    @media ${device.laptop} {
      font-size: 24px;
    }

    @media ${device.mobileL} {
      font-size: 24px;
      border-radius: 32px;
      padding: 0px;
      box-sizing: border-box;
    }
  }

  & i {
    & svg {
      transform: scale(1.8) !important;
      margin-right: 24px;

      @media ${device.mobileL} {
        transform: scale(1.2) !important;
      }
    }
  }
  & svg {
    margin-left: auto;
  }

  @media ${device.mobileL} {
    border-radius: 32px;
    padding: 35px 20px;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

const BottomGrad = styled.div`
  background: linear-gradient(
    180deg,
    var(--ifm-color-transparent) 0%,
    var(--ifm-color-grad-blue-start) 75.63%,
    var(--ifm-color-grad-pink-end) 100%
  );
  height: 340px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 57px;
  box-sizing: border-box;
`;

export default BRBComp;

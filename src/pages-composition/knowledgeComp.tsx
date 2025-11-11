// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// External Components
import styled from 'styled-components';

// Internal Components
import ImageHolder from '@site/src/components/ImageHolder';
import { MailingSignup } from '@site/src/components/MailingSignup/MailingSignup';
import {
  Content,
  H1,
  ItemH,
  ItemV,
  PrimaryA,
  Section,
  Span,
} from '@site/src/css/SharedStyling';

// Internal Configs
import { device } from '@site/src/config/globals';
import useMediaQuery from '@site/src/hooks/useMediaQuery';

import QnA from '@site/src/components/QnA/QnA';
import { getShortFAQsList } from '@site/src/config/ShortFAQsList';

import ContentBlocks from '@site/src/components/ContentBlocks/ContentBlocks';
import { KBRootResourcesList } from '@site/src/config/KBRootResourcesList';

// Interfaces and Props

// Helper Functions

// Helper Component

// Main
const KnowledgeComp = () => {
  // Localization
  const { t } = useTranslation();

  const isMobile = useMediaQuery(device.mobileL);
  const [showEmailSignup, setShowEmailSignup] = useState(false);

  const heroConfig = {
    title: t('pages.knowledge.hero-section.title'),
    description: () => (
      <>
        <SpanHighlighted>
          {t('pages.knowledge.hero-section.description.highlighted')}
        </SpanHighlighted>
        <br />
        <br />
        <b>{t('pages.knowledge.hero-section.description.developers')}</b>{' '}
        {t('pages.knowledge.hero-section.description.developers-text')}
        <br />
        <br />
        <b>{t('pages.knowledge.hero-section.description.users')}</b>{' '}
        {t('pages.knowledge.hero-section.description.users-text')}
      </>
    ),
    video: {
      src: 'https://www.youtube.com/embed/-cojsUIHcLE',
      title: 'Push Chain Public Testnet is Live',
    },
    // image: `knowledge-frame`,
    footer: {
      description: t('pages.knowledge.hero-section.footer.description'),
      cta: {
        text: t('pages.knowledge.hero-section.footer.cta.text'),
        action: 'showEmailSignup',
      },
    },
  };

  const handleCTAClick = () => {
    if (heroConfig.footer.cta.action === 'openModal') {
      open();
    } else if (heroConfig.footer.cta.action === 'showEmailSignup') {
      setShowEmailSignup(!showEmailSignup);
    }
  };

  return (
    <>
      {/* Create Header Section */}
      <Section>
        <Content className='skeletonsmall'>
          <KnowledgeBaseHero>
            <HeroTextContent
              justifyContent='flex-start'
              alignItems='flex-start'
            >
              <H1>{heroConfig.title}</H1>

              <Span>{heroConfig?.description()}</Span>
            </HeroTextContent>

            <HeroMediaCard>
              <MediaDisplayContainer>
                <EmailSignupSection>
                  <EmailSignupContent>
                    <EmailSignupTitle>
                      <Span className='long'>
                        {t(
                          'pages.knowledge.hero-section.email-signup.title.long'
                        )}
                      </Span>
                      <Span className='short'>
                        {t(
                          'pages.knowledge.hero-section.email-signup.title.short'
                        )}
                      </Span>
                    </EmailSignupTitle>
                    <EmailSignupDescription>
                      {t(
                        'pages.knowledge.hero-section.email-signup.description'
                      )}
                    </EmailSignupDescription>
                    <ItemV flex='0'>
                      <MailingSignup
                        showButton={true}
                        background={'var(--ifm-color-knowledge-bg)'}
                        borderColor={'var(--ifm-color-knowledge-border)'}
                        textColor={'var(--ifm-color-white)'}
                        placeholderColor={
                          'var(--ifm-color-knowledge-placeholder)'
                        }
                        buttonBg={'var(--ifm-color-custom-pink)'}
                        buttonBorder={
                          '1px solid var(--ifm-color-knowledge-button-border)'
                        }
                        arrowColor={'var(--ifm-color-white)'}
                        loaderColor={'var(--ifm-color-white)'}
                        blendMode='lighten'
                        boxShadow='2.788px 2.598px 12px rgba(255, 255, 255, 0.15) inset, 1.858px 1.732px 6px rgba(255, 255, 255, 0.15) inset'
                        backdrop='blur(10px)'
                      />
                    </ItemV>
                  </EmailSignupContent>
                </EmailSignupSection>

                <HeroMediaCardInner>
                  <MediaDisplay
                    showEmailSignup={showEmailSignup}
                    type={heroConfig?.image ? 'image' : 'video'}
                    borderRadius='32px'
                  >
                    {heroConfig?.video && (
                      <iframe
                        width={isMobile ? '100%' : '560px'}
                        height={isMobile ? '100%' : '325px'}
                        src={heroConfig.video.src}
                        title={heroConfig.video.title}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                      ></iframe>
                    )}

                    {heroConfig?.image && (
                      <ImageHolder
                        src={
                          require(
                            `@site/static/assets/website/chain/${heroConfig?.image}.webp`
                          ).default
                        }
                        srcSet={`${require(`@site/static/assets/website/chain/${heroConfig?.image}@2x.webp`).default} 2x, ${require(`@site/static/assets/website/chain/${heroConfig?.image}@3x.webp`).default} 3x`}
                        alt={'alt'}
                        title={'title'}
                      />
                    )}
                  </MediaDisplay>
                </HeroMediaCardInner>
              </MediaDisplayContainer>

              <MediaFooter>
                <Span
                  fontSize={isMobile ? '0.875rem' : '0.938rem'}
                  fontWeight='400'
                  lineHeight={isMobile ? '100%' : '132%'}
                  letterSpacing='-0.64px'
                  color='var(--ifm-color-neutral-300)'
                  flex='1'
                >
                  {heroConfig.footer.description}
                </Span>
                <CTAPrimaryA onClick={handleCTAClick}>
                  {showEmailSignup
                    ? 'Hide Email Signup'
                    : heroConfig.footer.cta.text}
                </CTAPrimaryA>
              </MediaFooter>
            </HeroMediaCard>
          </KnowledgeBaseHero>
        </Content>
      </Section>

      {/* Create Resources Section */}
      <Section id='resources'>
        <Content>
          <ContentBlocks item={KBRootResourcesList} />
        </Content>
      </Section>

      {/* Create FAQ at the bottom */}
      <Section id='faq'>
        <Content>
          <QnA
            titleKey='components.short-faq-snippet.title'
            titleAriaLabelKey='components.short-faq-snippet.title-aria-label'
            discordLinkTitleKey='components.short-faq-snippet.discord-link-title'
            discordLinkAriaLabelKey='components.short-faq-snippet.discord-link-aria-label'
            discordLinkTextKey='components.short-faq-snippet.discord-link-text'
            accordionAriaLabelKey='components.short-faq-snippet.accordion-aria-label'
            exploreMoreTitleKey='components.short-faq-snippet.explore-more-title'
            exploreMoreAriaLabelKey='components.short-faq-snippet.explore-more-aria-label'
            exploreMoreTextKey='components.short-faq-snippet.explore-more-text'
            discordUrl='https://discord.com/invite/pushchain'
            exploreMoreUrl='/knowledge/faq'
            getQnAsFunction={getShortFAQsList}
          />
        </Content>
      </Section>
    </>
  );
};

export default KnowledgeComp;

// Knowledge Base Hero Section - Main container for the header content
const KnowledgeBaseHero = styled(ItemH)`
  display: flex;
  align-items: center;
  gap: 128px;
  justify-content: space-between;
  flex: 1;

  @media ${device.laptop} {
    gap: 80px;
  }

  @media ${device.tablet} {
    gap: 48px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    gap: 32px;
    justify-content: flex-start;
    align-items: center;
  }
`;

// Hero Text Content - Container for title and description
const HeroTextContent = styled(ItemV)`
  justify-content: flex-start;
  align-items: flex-start;
`;

// Media Display - Container for image/video content
const MediaDisplay = styled(ItemH)`
  aspect-ratio: 16/9;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(props) =>
    props.showEmailSignup ? 'translateY(-90%)' : 'translateY(0)'};
  background: ${(props) =>
    props.type === 'image'
      ? 'var(--ifm-color-knowledge-media-pink)'
      : 'var(--ifm-color-card-dark)'};
  z-index: 2;
`;

// Hero Media Card - Card container for media and footer
const HeroMediaCard = styled.div`
  padding: 16px;
  background: var(--ifm-color-neutral-1100);
  display: flex;
  border-radius: 40px;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  min-width: 350px;
  flex: 1;

  iframe {
    border-radius: 24px;
  }

  @media ${device.tablet} {
    min-width: 300px;
    flex-grow: 1;
    align-self: center;
    padding: 16px;
  }

  @media ${device.mobileL} {
    min-width: 100%;
  }
`;

const HeroMediaCardInner = styled.div<{ showEmailSignup: boolean }>`
  overflow: hidden;
  border-radius: 32px;
  position: relative;
`;

// Media Footer - Footer section with description and CTA
const MediaFooter = styled.div`
  display: grid;
  margin: 16px 0 0 0;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;

  @media ${device.laptopM} {
    display: flex;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

// CTA Button - Call-to-action button styling
const CTAPrimaryA = styled(PrimaryA)`
  text-align: center;
  width: 100%;
  cursor: pointer;
  line-height: 180.513%;
`;

// Media Display Container - Container for layered content
const MediaDisplayContainer = styled.div`
  position: relative;
  overflow: visible;
`;

// Email Signup Section - Container for email signup form (positioned behind)
const EmailSignupSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: var(--ifm-color-primary-unified-text-inverse);
  border-radius: 32px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  @media ${device.laptopM} {
    padding: 20px;
  }

  @media ${device.mobileL} {
    padding: 24px;
  }

  @media ${device.mobile} {
    padding: 24px 16px;
  }
`;

// Email Signup Content - Inner content wrapper
const EmailSignupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

// Email Signup Title - Title for email signup
const EmailSignupTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: var(--ifm-color-white);
  margin: 0;
  line-height: 1.2;

  & Span {
    font-size: 24px;
    text-align: center;
  }

  & Span.long {
    display: block;
  }

  & Span.short {
    display: none;
  }

  @media ${device.desktop} {
    & Span.long {
      display: none;
    }

    & Span.short {
      display: block;
    }
  }

  @media ${device.tablet} {
  }

  @media ${device.mobileM} {
    display: none;
  }
`;

// Email Signup Description - Description text
const EmailSignupDescription = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--ifm-color-neutral-400);
  margin: 0;
  line-height: 1.5;
  max-width: 400px;

  @media ${device.laptopM} {
    display: none;
  }

  @media ${device.tablet} {
    display: block;
    font-size: 14px;
  }

  @media ${device.mobileL} {
    display: none;
  }
`;

const SpanHighlighted = styled.span`
  color: color-mix(
    in srgb,
    var(--ifm-color-primary-unified) 25%,
    var(--ifm-color-primary-unified-inverse) 75%
  );

  b {
    color: color-mix(
      in srgb,
      var(--ifm-color-primary-unified) 25%,
      var(--ifm-color-primary-unified-inverse) 75%
    );
  }
`;

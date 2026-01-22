// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import React, { useEffect, useState } from 'react';

// External Components
import styled from 'styled-components';

// Internal Component
import { CultContact } from '@site/src/components/CultContact';
import { GlowingEyes } from '@site/src/components/GlowingEyes';
import { device } from '@site/src/config/globals';
import {
  Content,
  H1,
  H2,
  ItemH,
  ItemV,
  MultiContent,
  Section,
  Span,
} from '@site/src/css/SharedStyling';

import QnA from '@site/src/components/QnA/QnA';
import { getShortCultQsList } from '@site/src/config/ShortCultQsList';

function CultComp() {
  // Track if user has manually interacted with the page
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Handle anchor link to auto-expand cult registration form
  useEffect(() => {
    const handleHashChange = (isInitialLoad = false) => {
      if (window.location.hash === '#apply-to-cult') {
        // Only check userHasInteracted on initial load
        if (isInitialLoad && userHasInteracted) {
          return;
        }

        // Small delay to ensure DOM is ready
        setTimeout(() => {
          // Scroll to the cult form
          const cultForm = document.getElementById('apply-to-cult');
          if (cultForm) {
            // Get the element's position and scroll with custom offset
            const elementTop = cultForm.offsetTop;
            const offsetPosition = elementTop - 150; // 150px more scroll

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });

            // Auto-expand the cult form by clicking the button
            setTimeout(() => {
              // Look for the expand button by ID
              const expandButton =
                document.getElementById('cult-expand-button');
              if (expandButton) {
                expandButton.click();
              }
            }, 800); // Longer delay to ensure scroll completes
          }
        }, 100); // Small delay for DOM readiness
      }
    };

    // Track user interactions to prevent auto-expand on initial load after manual interaction
    const handleUserInteraction = () => {
      setUserHasInteracted(true);
    };

    // Add event listeners for user interactions
    document.addEventListener('scroll', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    // Check hash on initial load
    handleHashChange(true);

    // Listen for hash changes (from link clicks)
    const hashChangeListener = () => handleHashChange(false);
    window.addEventListener('hashchange', hashChangeListener);

    // Also listen for popstate events (browser navigation)
    window.addEventListener('popstate', hashChangeListener);

    // Listen for click events on cult application links
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href.includes('#apply-to-cult')) {
        // Small delay to let navigation happen first
        setTimeout(() => handleHashChange(false), 50);
      }
    };

    document.addEventListener('click', handleLinkClick);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', hashChangeListener);
      window.removeEventListener('popstate', hashChangeListener);
      document.removeEventListener('click', handleLinkClick);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [userHasInteracted]);

  return (
    <>
      {/* Hero Section */}
      <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <GlowingEyes />
          </MultiContent>
          <MultiContent>
            <H1>Push Cult - Blood Pact for Creators</H1>
            <HeroSubtitle>
              A cult of curated yappers. Built for signal, not spam.
            </HeroSubtitle>
          </MultiContent>
          <MultiContent>
            <CultContact />
            <Span>
              Crypto is drowning in noise. Timelines are rotting with AI slop
              and empty engagement. Push Cult rejects this decay. We do not seek
              the loud. We seek visionaries. We are anointing the shepherds who
              guide their flock with truth. Not louder. Not broader. Pure
              Signal.
              <p /> <p />
              Apply now to have a chance to join the cult. 50 quality creators
              selected will split a <BountyAmount>
                20,000,000 PC
              </BountyAmount>{' '}
              bounty.
            </Span>
          </MultiContent>
        </Content>
      </Section>

      {/* QnA Section */}
      <Section>
        <Content>
          <QnA
            titleKey='components.short-cult-snippet.title'
            titleAriaLabelKey='components.short-cult-snippet.title-aria-label'
            discordLinkTitleKey='components.short-cult-snippet.discord-link-title'
            discordLinkAriaLabelKey='components.short-cult-snippet.discord-link-aria-label'
            discordLinkTextKey='components.short-cult-snippet.discord-link-text'
            accordionAriaLabelKey='components.short-cult-snippet.accordion-aria-label'
            exploreMoreTitleKey='components.short-cult-snippet.explore-more-title'
            exploreMoreAriaLabelKey='components.short-cult-snippet.explore-more-aria-label'
            exploreMoreTextKey='components.short-cult-snippet.explore-more-text'
            discordUrl='https://discord.com/invite/pushchain'
            exploreMoreUrl='/blog/introducing-the-push-cult/'
            getQnAsFunction={getShortCultQsList}
          />
        </Content>
      </Section>
    </>
  );
}

export default CultComp;

// Styled Components
const HeroSubtitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--ifm-color-primary-unified);

  @media ${device.tablet} {
    font-size: 28px;
  }

  @media ${device.mobileL} {
    font-size: 24px;
  }
`;

const BountyHighlight = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 4px solid var(--ifm-color-primary-unified);

  @media ${device.mobileL} {
    font-size: 18px;
    padding: 20px;
  }
`;

const BountyAmount = styled.span`
  color: var(--ifm-color-primary-unified);
  font-weight: 700;
`;

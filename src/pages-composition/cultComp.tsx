// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import React, { useEffect, useRef, useState } from 'react';

// External Components
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';

// Internal Component
import { CultContact } from '@site/src/components/CultContact';
import { GlowingEyes } from '@site/src/components/GlowingEyes';
import GLOBALS, { device } from '@site/src/config/globals';
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
  // Internationalization
  const { t } = useTranslation();

  // Track if user has manually interacted with the page
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Refs for the boxes
  const leftBoxesRef = useRef([]);
  const rightBoxesRef = useRef([]);

  // Animate boxes with GSAP
  useEffect(() => {
    // ========== ANIMATION CONFIG - Adjust these values ==========
    const CONFIG = {
      // Timing
      initialDelayMin: 3, // Min seconds before first appearance
      initialDelayMax: 10, // Max seconds before first appearance
      reappearDelayMin: 4, // Min seconds before reappearing after fade out
      reappearDelayMax: 10, // Max seconds before reappearing after fade out

      // Fade durations
      fadeInDuration: 0.1, // Fade in speed
      fadeOutDuration: 0, // Fade out speed
      eyeOpenDuration: 0.3, // How long eyes take to open
      eyeCloseDuration: 0.3, // How long eyes take to close

      // Blink settings
      minBlinks: 1, // Minimum number of blinks
      maxBlinks: 2, // Maximum number of blinks
      blinkDuration: 0.1, // How fast each blink is
      timeBetweenBlinks: 0.8, // Pause between blinks
      pauseBeforeFirstBlink: 0.5, // Pause after opening before first blink

      // Positioning
      minDistance: 15, // Minimum distance between eyes (in %)
      verticalRangeMin: 10, // Min vertical position (%)
      verticalRangeMax: 70, // Max vertical position (%)
      horizontalRangeMin: 20, // Min horizontal position (%)
      horizontalRangeMax: 60, // Max horizontal position (%)
    };
    // ============================================================

    const usedPositions = [];

    const isOverlapping = (newPos, existingPositions) => {
      return existingPositions.some((pos) => {
        const topDiff = Math.abs(parseFloat(newPos.top) - parseFloat(pos.top));
        return topDiff < CONFIG.minDistance;
      });
    };

    const getRandomPosition = (isLeft, existingPositions) => {
      let attempts = 0;
      let newPos;
      do {
        newPos = {
          top: `${Math.random() * (CONFIG.verticalRangeMax - CONFIG.verticalRangeMin) + CONFIG.verticalRangeMin}%`,
          [isLeft ? 'left' : 'right']:
            `${Math.random() * (CONFIG.horizontalRangeMax - CONFIG.horizontalRangeMin) + CONFIG.horizontalRangeMin}%`,
        };
        attempts++;
      } while (isOverlapping(newPos, existingPositions) && attempts < 50);
      return newPos;
    };

    const animateBox = (box, isLeft, index) => {
      const randomDelay =
        Math.random() * (CONFIG.initialDelayMax - CONFIG.initialDelayMin) +
        CONFIG.initialDelayMin;

      const animate = () => {
        // Get non-overlapping position
        const existingPositions = usedPositions.filter(
          (p) => p.side === (isLeft ? 'left' : 'right')
        );
        const newPos = getRandomPosition(isLeft, existingPositions);

        // Update used positions
        const posIndex = usedPositions.findIndex(
          (p) => p.index === index && p.side === (isLeft ? 'left' : 'right')
        );
        if (posIndex >= 0) {
          usedPositions[posIndex] = {
            ...newPos,
            side: isLeft ? 'left' : 'right',
            index,
          };
        } else {
          usedPositions.push({
            ...newPos,
            side: isLeft ? 'left' : 'right',
            index,
          });
        }

        // Random number of blinks
        const numBlinks =
          Math.floor(
            Math.random() * (CONFIG.maxBlinks - CONFIG.minBlinks + 1)
          ) + CONFIG.minBlinks;

        const timeline = gsap.timeline({
          onComplete: () => {
            // Remove from used positions when animation completes
            const idx = usedPositions.findIndex(
              (p) => p.index === index && p.side === (isLeft ? 'left' : 'right')
            );
            if (idx >= 0) usedPositions.splice(idx, 1);
            // Wait before reappearing
            const reappearDelay =
              Math.random() *
                (CONFIG.reappearDelayMax - CONFIG.reappearDelayMin) +
              CONFIG.reappearDelayMin;
            gsap.delayedCall(reappearDelay, animate);
          },
        });

        // Set position while invisible and eyes closed
        gsap.set(box, { ...newPos, opacity: 0, scaleY: 0.1 });

        // Fade in while opening eyes (initial opening, not a blink)
        timeline.to(box, {
          opacity: 1,
          scaleY: 1,
          duration: CONFIG.eyeOpenDuration,
          ease: 'power2.out',
        });

        // Wait a moment before starting blinks
        timeline.to({}, { duration: CONFIG.pauseBeforeFirstBlink });

        // Random blinks
        for (let i = 0; i < numBlinks; i++) {
          timeline
            .to(box, {
              scaleY: 0.1,
              duration: CONFIG.blinkDuration,
              ease: 'power2.inOut',
            })
            .to(box, {
              scaleY: 1,
              duration: CONFIG.blinkDuration,
              ease: 'power2.inOut',
            })
            .to({}, { duration: CONFIG.timeBetweenBlinks });
        }

        // Close eyes first
        timeline.to(box, {
          scaleY: 0.1,
          duration: CONFIG.eyeCloseDuration,
          ease: 'power2.inOut',
        });

        // Then fade out after eyes are closed
        timeline.to(box, {
          opacity: 0,
          duration: CONFIG.fadeOutDuration,
          ease: 'power2.inOut',
        });
      };

      // Set initial position
      gsap.set(box, { opacity: 0 });
      // Start animation with random delay
      gsap.delayedCall(randomDelay, animate);
    };

    // Animate all boxes with index
    leftBoxesRef.current.forEach(
      (box, index) => box && animateBox(box, true, index)
    );
    rightBoxesRef.current.forEach(
      (box, index) => box && animateBox(box, false, index)
    );
  }, []);

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
      {/* Side Overlays */}
      <LeftSideOverlay>
        <FlockEyes ref={(el) => (leftBoxesRef.current[0] = el)}>
          <FlockEye className='left flock-eye' />
          <FlockEye className='right flock-eye' />
        </FlockEyes>
        <FlockEyes ref={(el) => (leftBoxesRef.current[1] = el)}>
          <FlockEye className='left flock-eye' />
          <FlockEye className='right flock-eye' />
        </FlockEyes>
      </LeftSideOverlay>
      <RightSideOverlay>
        <FlockEyes ref={(el) => (rightBoxesRef.current[0] = el)}>
          <FlockEye className='left flock-eye' />
          <FlockEye className='right flock-eye' />
        </FlockEyes>
        <FlockEyes ref={(el) => (rightBoxesRef.current[1] = el)}>
          <FlockEye className='left flock-eye' />
          <FlockEye className='right flock-eye' />
        </FlockEyes>
      </RightSideOverlay>

      {/* Hero Section */}
      <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <GlowingEyes
              backgroundImageName='/assets/website/cult/otterface.webp'
              backgroundTop='10%'
              backgroundRight='10%'
              backgroundOpacity={0.3}
            />
          </MultiContent>
          <MultiContent>
            <H1>{t('pages.cult.hero-section.title')}</H1>
            <HeroSubtitle>{t('pages.cult.hero-section.subtitle')}</HeroSubtitle>
          </MultiContent>
          <MultiContent>
            <CultContact />
            <Span>
              {t('pages.cult.hero-section.description-paragraph-1')}
              <p /> <p />
              {t('pages.cult.hero-section.description-paragraph-2')}{' '}
              <BountyAmount>
                {t('pages.cult.hero-section.bounty-amount')}
              </BountyAmount>{' '}
              {t('pages.cult.hero-section.description-paragraph-2-end')}
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

const SideOverlay = styled.div`
  position: fixed;
  bottom: 0;
  width: calc((100vw - ${GLOBALS.STRUCTURE.MAX_WIDTH * 0.9}px) / 2);
  height: 33vh;
  z-index: 1;
  pointer-events: none;
  @media ${device.laptop} {
    display: none;
  }
`;

const LeftSideOverlay = styled(SideOverlay)`
  left: 0;
`;

const RightSideOverlay = styled(SideOverlay)`
  right: 0;
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow:
      0 0 5px rgba(217, 70, 239, 0.8),
      0 0 10px rgba(217, 70, 239, 0.6),
      0 0 15px rgba(217, 70, 239, 0.4);
  }
  50% {
    box-shadow:
      0 0 8px rgba(217, 70, 239, 1),
      0 0 15px rgba(217, 70, 239, 0.8),
      0 0 20px rgba(217, 70, 239, 0.6);
  }
`;

const FlockEyes = styled.div`
  position: absolute;
  width: 70px;
  height: 20px;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const FlockEye = styled.div`
  width: 20px;
  height: 15px;
  background: linear-gradient(135deg, #d946ef 0%, #c026d3 100%);
  border-radius: 30% 100% 80% 50% / 40% 100% 30% 90%;
  position: relative;

  &.left {
    transform: rotate(-8deg);
    animation: ${pulseGlow} 3s ease-in-out infinite;
  }

  &.right {
    transform: scaleX(-1) rotate(-8deg);
    animation: ${pulseGlow} 3s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background: radial-gradient(
      ellipse at center,
      #f0abfc 0%,
      #d946ef 50%,
      transparent 70%
    );
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    filter: blur(3px);
  }
`;

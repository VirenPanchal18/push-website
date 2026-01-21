// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import React from 'react';

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

function CultComp() {
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
            <BountyHighlight>
              An exclusive order of 50 creators selected to split a{' '}
              <BountyAmount>20,000,000 PC</BountyAmount> token bounty by
              delivering pure signal.
            </BountyHighlight>
          </MultiContent>
          <MultiContent>
            <CultContact />
          </MultiContent>
        </Content>
      </Section>

      {/* What is Push Cult */}
      {/* <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H2>What is Push Cult</H2>

            <Span>
              Crypto is drowning in noise. Timelines are rotting with AI slop
              and empty engagement. Push Cult rejects this decay. We do not seek
              the loud. We seek visionaries. We are anointing the shepherds who
              guide their flock with truth. Not louder. Not broader. Pure
              Signal.
            </Span>

            <Span>
              Push Cult is a curated, invite-only program designed to honor and
              reward real content creators. It rewards both emerging and
              established creators for delivering measurable results, not just
              noise.
            </Span>
            <VibeBox>
              <strong>What's the vibe we are looking for:</strong> If you create
              thoughtful, quality content that genuinely connects with your
              audience, you are a fit. If you rely on AI slop or post low-effort
              content, this is not for you.
            </VibeBox>
          </MultiContent>
        </Content>
      </Section> */}

      {/* Why the Cult Exists */}
      {/* <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H2>Why the Cult Exists</H2>
            <Span>
              We are proving that 50 Disciples can outshine an army of
              mercenaries. We do not pay for empty reach. We reward the Truth,
              you are fit if you can deliver:
            </Span>
            <BulletList>
              <li>Real usage.</li>
              <li>Die-hard believers.</li>
              <li>Original thinking.</li>
            </BulletList>
            <Span>
              This is not a marketing campaign. We're not trying to create
              another influencer program or invent a new distribution meta. It
              is a multi-week crusade to deliver Push Chain to the masses.
            </Span>
          </MultiContent>
        </Content>
      </Section> */}

      {/* The Rules */}
      {/* <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H2>The Rules - A Finite Order. You Perform, We Curate.</H2>
            <Span>
              We cap the Disciples at 50 to ensure focus. But the doors are
              never locked.
            </Span>
            <Span>
              Participation is renewed weekly based on impact. If you fall below
              the threshold, you rotate out. If a new voice rises from the
              Flock, they rotate in. We do not gatekeep the table. We simply
              guard the standard. Great creators compete on quality, not volume.
            </Span>

            <SectionTitle>What Creators Actually Do</SectionTitle>
            <Span>
              We do not dictate the medium.{' '}
              <strong>Threads, videos, articles — the format is yours.</strong>{' '}
              Your mandate is clear:
            </Span>
            <BulletList>
              <li>
                Threads, articles, or videos explaining Push Chain concepts
              </li>
              <li>Guide the Flock through the Testnet with tutorials.</li>
              <li>Onboard believers to Season 3.</li>
              <li>Evangelize the era of Universal Execution.</li>
            </BulletList>

            <Span>
              <strong>We arm the Disciples.</strong> We provide the raw intel:
            </Span>
            <BulletList>
              <li>Weekly missions and themes.</li>
              <li>Alpha before the public sees it.</li>
            </BulletList>
            <Span>
              We provide the ammo. You shape the narrative.{' '}
              <strong>We judge the resonance.</strong>
            </Span>
          </MultiContent>
        </Content>
      </Section> */}

      {/* Measuring Impact */}
      {/* <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H2>Measuring Impact - Proof of Devotion</H2>
            <Span>
              We ignore vanity metrics. We track conversion. Each Disciple is
              judged weekly by the <strong>Devotion Score</strong>, a fusion of:
            </Span>
            <BulletList>
              <li>
                <strong>Signal:</strong> Reach across the network.
              </li>
              <li>
                <strong>Gathering:</strong> New believers onboarded.
              </li>
              <li>
                <strong>Faith:</strong> User retention and activity.
              </li>
              <li>
                <strong>Craft:</strong> Manual review by the Push Chain Team.
              </li>
            </BulletList>
            <WarningText>
              Spam burns to ash. Only the truth survives. A final warning:
              <br />
              <strong>Devotion is not declared. It is earned.</strong>
            </WarningText>
          </MultiContent>
        </Content>
      </Section> */}

      {/* Incentives */}
      {/* <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H2>Incentives - The Sacred Bounty</H2>
            <Span>
              This program is designed for creators who want long-term upside,
              not one-off payouts.
            </Span>
            <Span>Top performers receive:</Span>
            <BulletList>
              <li>
                <strong>Guaranteed Allocation</strong> from the 20M Pool.
              </li>
              <li>
                Ultra Rare Shiny Pass, a mainnet NFT that grants:
                <ul>
                  <li>Revenue share from chain fees</li>
                  <li>Validator rewards participation</li>
                  <li>Staking multipliers</li>
                  <li>VIP ecosystem perks</li>
                </ul>
              </li>
            </BulletList>
            <WarningText>
              <strong>Rank dictates the harvest.</strong>
              <br />
              There are no participation trophies.
            </WarningText>
          </MultiContent>
        </Content>
      </Section> */}

      {/* Who Should Apply */}
      {/* <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H2>Who Should Apply - The Calling</H2>
            <Span>The Cult is designed for creators who:</Span>
            <BulletList>
              <li>
                Already create content like{' '}
                <strong>guides, threads, or explainers</strong>
              </li>
              <li>Command an engaged audience (not necessarily a huge one)</li>
              <li>Care about shipping clarity, not hype</li>
              <li>Want to be early</li>
            </BulletList>
            <WarningText>
              You do not need an army, just a loyal following. If you seek a
              quick flip, walk away.{' '}
              <strong>If you seek to build a legacy, step forward.</strong>
            </WarningText>
          </MultiContent>
        </Content>
      </Section> */}

      {/* Application Section */}
      {/* <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H2>The Initiation - How to Join</H2>
            <Span>The gates are open. Registration gives you access to:</Span>
            <BulletList>
              <li>Program details</li>
              <li>Evaluation mechanics</li>
              <li>Initial onboarding steps</li>
            </BulletList>
            <Span>
              From there, performance determines everything. Apply below 👇.
            </Span>
          </MultiContent>
        </Content>
      </Section> */}
    </>
  );
}

export default CultComp;

// Styled Components
const HeroTitle = styled(H1)`
  font-size: 64px;
  line-height: 1.2;
  margin-bottom: 24px;

  @media ${device.tablet} {
    font-size: 48px;
  }

  @media ${device.mobileL} {
    font-size: 36px;
  }
`;

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

const HeroDescription = styled(Span)`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  opacity: 0.9;
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
  font-size: 24px;

  @media ${device.mobileL} {
    font-size: 20px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(79, 172, 254, 0.1);
  border: 1px solid rgba(79, 172, 254, 0.3);
  border-radius: 8px;
  margin-bottom: 32px;
`;

const InfoIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`;

const InfoText = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: var(--ifm-color-primary-unified-text);
`;

const VibeBox = styled.div`
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border-left: 3px solid var(--ifm-color-primary-unified);
  margin-top: 24px;
  font-size: 16px;
  line-height: 1.6;
`;

const BulletList = styled.ul`
  margin: 16px 0;
  padding-left: 24px;
  line-height: 1.8;

  li {
    margin-bottom: 12px;
    font-size: 16px;
  }

  ul {
    margin-top: 12px;
    padding-left: 24px;

    li {
      margin-bottom: 8px;
      font-size: 15px;
    }
  }
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 16px;
  color: var(--ifm-color-primary-unified);

  @media ${device.mobileL} {
    font-size: 20px;
  }
`;

const WarningText = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.6;
  font-style: italic;
`;

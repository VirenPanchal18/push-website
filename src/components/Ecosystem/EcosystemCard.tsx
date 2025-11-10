// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import styled from 'styled-components';
import { ItemH, P, Span } from '@site/src/css/SharedStyling';
import type { EcosystemApp } from './EcosystemBlocks';

// Card with 16:10 media (top), icon + name, description, tags, and a heart button
const EcosystemCard: React.FC<{ app: EcosystemApp }> = ({ app }) => {
  const hrefProps = app.href
    ? { href: app.href, target: '_blank', rel: 'noopener' }
    : { href: '#', onClick: (e: React.MouseEvent) => e.preventDefault() };

  return (
    <Card {...hrefProps} aria-label={app.name} title={app.name}>
      <Background
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0) 50%, ${app.bgGradientColor} 100%),
            url(${app.bgImage})
          `,
        }}
      />

      <ContentWrap>
        <TopRow>
          <Icon src={app.icon} alt='' />
          <Name>{app.name}</Name>
          <P
            fontSize='16px'
            lineHeight='23px'
            color='var(--ifm-color-neutral-300)'
            margin='4px 0 0 0'
          >
            {app.description}
          </P>
        </TopRow>

        <Meta>
          <Tags>
            {app.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </Tags>
          <Heart>♥</Heart>
        </Meta>
      </ContentWrap>
    </Card>
  );
};

export default EcosystemCard;

// ----- Styled -----
const Card = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: 16px;
  text-decoration: none;
  color: var(--ifm-color-white);
  height: 426px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(168, 85, 247, 0.15);
  }
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: top center;
  z-index: 0;
`;

const ContentWrap = styled.div`
  position: relative;
  z-index: 2;
  padding: 16px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 40%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 60%;
`;

const TopRow = styled(ItemH)`
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: #000;
  object-fit: cover;
`;

const Name = styled(Span)`
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  margin-top: 12px;
`;

const Meta = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
`;

const Heart = styled.button`
  border: 0;
  background: transparent;
  color: #bdbdd4;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #e879f9;
  }
`;

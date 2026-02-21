// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useTweetMetrics } from '@site/src/api/GetTwitterMetrics';
import { ItemH, P, Span } from '@site/src/css/SharedStyling';
import { formatTwitterCount } from '@site/src/utils/FormatTwitterCount';
import Starsvg from '@site/static/assets/ecosystem/star.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsHeart } from 'react-icons/bs';
import styled from 'styled-components';
import type { EcosystemApp } from './EcosystemBlocks';

const EcosystemCard: React.FC<{ app: EcosystemApp }> = ({ app }) => {
  const { t } = useTranslation();
  const { data: twitterData } = useTweetMetrics(app.twitterId || '');

  // Support both old format (name/description) and new format (nameKey/descriptionKey)
  const appName = app.nameKey ? t(app.nameKey) : app.name;
  const appDescription = app.descriptionKey
    ? t(app.descriptionKey)
    : app.description;
  const appSpotlightText = app.spotlighttextKey
    ? t(app.spotlighttextKey)
    : app.spotlighttext;

  const handleAppClick = () => {
    // Track app click in Google Analytics
    if (typeof window !== 'undefined' && window.gtag && app.href) {
      const appType = app.secondary ? 'secondary' : 'primary';
      window.gtag('event', 'ecosystem_app_click', {
        event_category: 'ecosystem',
        event_label: appName,
        app_name: appName,
        app_type: appType,
        app_url: app.href,
      });
    }
  };

  const hrefProps = app.comingsoon
    ? { onClick: (e: React.MouseEvent) => e.preventDefault() }
    : app.href
      ? {
          href: app.href,
          target: '_blank',
          rel: 'noopener',
          onClick: handleAppClick,
        }
      : { href: '#', onClick: (e: React.MouseEvent) => e.preventDefault() };

  return (
    <Card
      {...hrefProps}
      aria-label={appName}
      title={appName}
      $comingsoon={app.comingsoon}
      appoftheweek={app.appoftheweek}
      $secondary={app.secondary}
      className={app.secondary ? 'secondary' : ''}
    >
      {app.appoftheweek && (
        <CardTag>
          <Starsvg />
          <Span>APP SPOTLIGHT</Span>
        </CardTag>
      )}
      {app.bgImage && !app.secondary && (
        <BackgroundWrapper>
          <Background
            style={{
              backgroundImage: `url(${useBaseUrl(app.bgImage)})`,
            }}
          />
        </BackgroundWrapper>
      )}
      <ContentWrap
        bgGradientColor={app.bgGradientColor}
        $secondary={app.secondary}
      >
        <TopRow>
          <Icon src={useBaseUrl(app.icon)} alt='' appId={app.id} />
          <Name titleColor={app.titleColor}>{appName}</Name>
          <P
            fontSize='16px'
            lineHeight='23px'
            color={app.descriptionColor || 'var(--ifm-color-neutral-300)'}
            margin='4px 0 0 0'
          >
            {appDescription}
          </P>
        </TopRow>
        <Meta>
          <Tags>
            {app.tags.map((t) => (
              <Tag key={t} tagsColor={app.tagsColor}>
                {t}
              </Tag>
            ))}
          </Tags>
          {app?.twitterId && (
            <Likes
              href={`https://x.com/PushChain/status/${app.twitterId}`}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => {
                // Track like button click in Google Analytics
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'ecosystem_like_click', {
                    event_category: 'engagement',
                    event_label: appName,
                    app_name: appName,
                    twitter_id: app.twitterId,
                    like_count: twitterData?.like_count || 0,
                  });
                }
              }}
            >
              <Tag tagsColor={app?.tagsColor}>
                {formatTwitterCount(twitterData?.like_count)}
              </Tag>
              <BsHeart
                size={22}
                color={app?.tagsColor || `var(--ifm-ecosystem-tags-color)`}
              />
            </Likes>
          )}
        </Meta>
      </ContentWrap>
      {app.comingsoon && (
        <ComingSoonOverlay>
          <ComingSoonText>Coming Soon</ComingSoonText>
        </ComingSoonOverlay>
      )}
    </Card>
  );
};

export default EcosystemCard;

const Card = styled.a<{
  $comingsoon?: boolean;
  appoftheweek?: boolean;
  $secondary?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: 16px;
  text-decoration: none;
  color: var(--ifm-color-white);
  border: ${(props) =>
    props.$comingsoon
      ? 'none'
      : props.appoftheweek
        ? '1px solid #EF46F8'
        : '1px solid rgba(171, 70, 248, 0.4)'};
  width: 100%;
  height: 426px;
  min-height: 426px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  z-index: 6;
  cursor: ${(props) => (props.$comingsoon ? 'not-allowed' : 'pointer')};

  &.secondary {
    height: auto !important;
    min-height: auto !important;
  }

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
    z-index: 100;
  }

  &:hover {
    transform: ${(props) => (props.$comingsoon ? 'none' : 'translateY(-2px)')};

    &::before {
      opacity: ${(props) => (props.$comingsoon ? 0 : 1)};
    }
  }
`;

const CardTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999999;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: #000;
  height: 28px;
  padding: 4px 12px;
  gap: 4px;

  span {
    color: var(--ifm-color-white);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
  }
`;

const ContentWrap = styled.div<{
  bgGradientColor: string;
  $secondary?: boolean;
}>`
  position: relative;
  z-index: 2;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: ${(props) => (props.$secondary ? '100%' : '55%')};
  background: ${(props) =>
    props.$secondary
      ? props.bgGradientColor
      : `linear-gradient(
    to bottom,
    transparent 0%,
    transparent 10%,
    ${props.bgGradientColor} 20%
  )`};
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-size: cover;
  background-position: top center;
`;

const TopRow = styled(ItemH)`
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }
`;

const Icon = styled.img<{ appId?: number }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${(props) =>
    props.appId === 3 || props.appId === 8 ? '#000' : 'transparent'};
  object-fit: cover;

  .secondary & {
    margin-top: 10px;
  }
`;

const Name = styled(Span)<{ titleColor?: string }>`
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  margin-top: 12px;
  color: ${(props) => props.titleColor || 'var(--ifm-color-white)'};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
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

const Likes = styled(Link)<{ tagsColor?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ tagsColor?: string }>`
  font-size: 16px;
  font-weight: 400;
  padding: 0px;
  color: ${(props) => props.tagsColor || 'var(--ifm-ecosystem-tags-color)'};
`;

const ComingSoonOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  border-radius: var(--radius-sm, 16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    180deg,
    rgba(74, 74, 74, 0.85) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const ComingSoonText = styled.span`
  color: white;
  text-align: center;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  margin-top: 50px;
`;

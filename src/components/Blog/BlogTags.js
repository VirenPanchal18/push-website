import { device } from '@site/src/config/globals';
import { Span } from '@site/src/css/SharedStyling';
import tagsData from '@site/static/content/blogtags.json';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const BlogTags = ({ scrollingTheme = true }) => {
  const { t } = useTranslation();

  if (!tagsData || tagsData.length === 0) {
    return null;
  }

  return (
    <TagsContainer>
      <TagsTitle $scrollingTheme={scrollingTheme}>
        {t('components.blog.tags.title')}
      </TagsTitle>
      <TagsList $scrollingTheme={scrollingTheme}>
        {tagsData.map((tag, index) => (
          <TagLink
            key={index}
            href={tag.link}
            title={t('components.blog.tags.tag-link-title', {
              tagName: tag.name,
            })}
            aria-label={t('components.blog.tags.tag-link-aria-label', {
              tagName: tag.name,
            })}
            $hideOnLaptop={scrollingTheme && index >= 5}
            $hideOnMobileL={scrollingTheme && index >= 4}
            $hideOnMobileM={scrollingTheme && index >= 3}
            $hideOnMobileS={scrollingTheme && index >= 2}
          >
            {tag.name} <TagCount>({tag.count})</TagCount>
          </TagLink>
        ))}
        {scrollingTheme && (
          <ShowAllLink
            href='/blog/tags'
            title='View all blog topics'
            aria-label='View all blog topics'
          >
            Show All Topics →
          </ShowAllLink>
        )}
      </TagsList>
    </TagsContainer>
  );
};

export default BlogTags;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TagsTitle = styled(Span)`
  color: var(--ifm-color-primary-blog);
  font-family:
    DM Sans,
    sans-serif;
  font-size: 37px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: -1.2px;
  display: ${(props) => (props.$scrollingTheme ? 'none' : 'block')};
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: ${(props) => (props.$scrollingTheme ? 'nowrap' : 'wrap')};
  gap: 12px;
  overflow-x: ${(props) => (props.$scrollingTheme ? 'auto' : 'visible')};
  overflow-y: hidden;
  width: 100%;
  min-width: 0;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  & > * {
    white-space: nowrap;
    flex: 0 0 auto; /* IMPORTANT: prevents flex children from shrinking weirdly */
  }

  @media ${device.desktop} {
    flex-wrap: wrap;
    overflow-x: visible;
  }
`;

const TagLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--ifm-color-tag-border);
  border-radius: 24px;
  color: var(--ifm-color-primary-blog);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: var(--ifm-color-primary-blog);
    color: var(--ifm-color-white);
  }

  @media ${device.laptop} {
    font-size: 0.85rem;
    padding: 6px 14px;
    display: ${(props) => (props.$hideOnLaptop ? 'none' : 'inline-flex')};
  }

  @media ${device.mobileL} {
    font-size: 0.8rem;
    padding: 6px 12px;
    display: ${(props) => (props.$hideOnMobileL ? 'none' : 'inline-flex')};
  }

  @media ${device.mobileM} {
    display: ${(props) => (props.$hideOnMobileM ? 'none' : 'inline-flex')};
  }

  @media ${device.mobileS} {
    display: ${(props) => (props.$hideOnMobileS ? 'none' : 'inline-flex')};
  }
`;

const ShowAllLink = styled.a`
  display: none;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: var(--ifm-color-primary-blog);
  border: 1px solid var(--ifm-color-primary-blog);
  border-radius: 24px;
  color: var(--ifm-color-white);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: transparent;
    color: var(--ifm-color-primary-blog);
  }

  @media ${device.laptop} {
    display: inline-flex;
  }
`;

const TagCount = styled.span`
  opacity: 0.7;
  font-size: 0.85em;
`;

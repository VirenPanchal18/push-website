import { device } from '@site/src/config/globals';
import { Span } from '@site/src/css/SharedStyling';
import tagsData from '@site/static/content/blogtags.json';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const BlogTags = () => {
  const { t } = useTranslation();

  if (!tagsData || tagsData.length === 0) {
    return null;
  }

  return (
    <TagsContainer>
      <TagsTitle>{t('components.blog.tags.title')}</TagsTitle>
      <TagsList>
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
          >
            {tag.name} <TagCount>({tag.count})</TagCount>
          </TagLink>
        ))}
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
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  & > * {
    white-space: nowrap;
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

  @media ${device.tablet} {
    font-size: 0.85rem;
    padding: 6px 14px;
  }
`;

const TagCount = styled.span`
  opacity: 0.7;
  font-size: 0.85em;
`;

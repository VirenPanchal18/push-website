/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useLocation } from '@docusaurus/router';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MultiContent, Span } from '@site/src/css/SharedStyling';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import SearchMetadata from '@theme/SearchMetadata';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Internal Configs
import BlogTags from '@site/src/components/Blog/BlogTags';
import FeaturedBlogPosts from '@site/src/components/Blog/FeaturedBlogPosts';
import { device } from '@site/src/config/globals';
import featuredBlogsData from '@site/static/content/featuredblogs.json';

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const location = useLocation();
  const pathname = location?.pathname;

  const isBlogOnlyMode = permalink === '/';
  const isBlogMainPage =
    pathname.includes('/page/') || pathname == '/blog/' || pathname == '/blog';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      {!isBlogMainPage && (
        <PageMetadata title={title} description={blogDescription} />
      )}
      <SearchMetadata tag='blog_posts_list' />
    </>
  );
}
function BlogListPageContent(props) {
  const { t } = useTranslation();
  const { metadata, items } = props;

  // Extract slugs from imported featured blogs data
  const featuredSlugs = featuredBlogsData.map((post) => post.slug);

  // Filter out featured posts from items on page 1
  const filteredItems =
    metadata?.page == 1 && featuredSlugs.length > 0
      ? items.filter((item) => {
          const slug = item.content.metadata.permalink
            .replace('/blog/', '')
            .replace(/\/$/, '');
          return !featuredSlugs.includes(slug);
        })
      : items;

  return (
    <Wrapper>
      {metadata?.page == 1 && (
        <MultiContent className='large'>
          <BlogTags />
        </MultiContent>
      )}
      {metadata?.page == 1 && (
        <MultiContent className='large'>
          <FeaturedTitle>{t('components.blog.featured.title')}</FeaturedTitle>
          <FeaturedBlogPosts />
        </MultiContent>
      )}
      <MultiContent className='large'>
        <ListSpan isFirstPage={metadata?.page == 1}>
          {metadata?.page == 1
            ? t('components.blog.list.recent-updates')
            : t('components.blog.list.page-title', { page: metadata?.page })}
        </ListSpan>
        {metadata?.page == 1 && (
          <BlogPostItems items={filteredItems?.slice(0, 4)} list={true} />
        )}

        <GridItem marginTop={metadata?.page == 1 ? true : false}>
          <BlogPostItems
            items={filteredItems?.slice(metadata?.page == 1 ? 4 : 0, 11)}
          />
        </GridItem>

        <BlogListPaginator metadata={metadata} />
      </MultiContent>
    </Wrapper>
  );
}
export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <BlogLayout>
        <BlogListPageMetadata {...props} />
        <BlogListPageContent {...props} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}

const Wrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

const GridItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 33px;
  box-sizing: border-box;
  margin-top: ${(props) => (props.marginTop ? '100px' : '30px')};

  & > *:nth-child(odd) {
    justify-self: start;
  }

  & > *:nth-child(even) {
    justify-self: end;
  }

  @media (max-width: 1200px) {
    margin-top: 10px;
    gap: 30px;
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const ListSpan = styled(Span)`
  color: var(--ifm-color-primary-blog);
  font-family:
    DM Sans,
    sans-serif;
  font-size: 37px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 44px */
  letter-spacing: -1.2px;
  margin-bottom: ${(props) => (props.isFirstPage ? '0' : '24px')};
`;

const FeaturedTitle = styled(Span)`
  color: var(--ifm-color-primary-blog);
  font-family:
    DM Sans,
    sans-serif;
  font-size: 37px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: -1.2px;
  display: block;
`;

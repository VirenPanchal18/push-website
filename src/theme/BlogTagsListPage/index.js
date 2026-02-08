/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import { MultiContent } from '@site/src/css/SharedStyling';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import TagsListByLetter from '@theme/TagsListByLetter';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

// Internal Components
import BlogTags from '@site/src/components/Blog/BlogTags';

export default function BlogTagsListPage({ tags }) {
  const title = translateTagsPageTitle();
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage
      )}
    >
      <PageMetadata title={title} />
      <SearchMetadata tag='blog_tags_list' />
      <BlogLayout>
        <MultiContent className='large'>
          <OtterArt>
            {`    __
  /  \\
 | oo |
 |  >  |  
  \\__/
  /  \\
 /    \\
(______)
`}
          </OtterArt>
        </MultiContent>
        <MultiContent className='large'>
          <BlogTags scrollingTheme={false} />
        </MultiContent>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}

const OtterArt = styled.pre`
  font-family: monospace;
  color: var(--ifm-color-primary-blog);
  font-size: 14px;
  line-height: 1.2;
  margin: 0;
  white-space: pre;
  text-align: center;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const TagSection = styled.div`
  margin: 50px 0;

  & h1 {
    color: var(--ifm-color-secondary-blog);
  }
`;

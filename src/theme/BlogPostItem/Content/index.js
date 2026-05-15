/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { blogPostContainerID } from '@docusaurus/utils-common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import MDXContent from '@theme/MDXContent';
import LikeAndRetweetItem from '../../BlogPostPage/LikeAndRetweetItem';

export default function BlogPostItemContent({ children, className }) {
  const { isBlogPostPage, metadata } = useBlogPost();
  const [hasInjectedSocialButtons, setHasInjectedSocialButtons] =
    useState(false);
  const contentRef = useRef(null);

  const injectSocialButtons = () => {
    const firstImage = contentRef.current?.querySelector('p > img');
    if (!firstImage) return false;

    const socialContainer = document.createElement('div');
    const insertionPoint = firstImage.parentNode.nextSibling;

    firstImage.parentNode.parentNode.insertBefore(
      socialContainer,
      insertionPoint
    );

    const { createRoot } = require('react-dom/client');
    const queryClient = new QueryClient();
    const root = createRoot(socialContainer);

    root.render(
      <QueryClientProvider client={queryClient}>
        <div style={{ marginBottom: '32px' }}>
          <LikeAndRetweetItem twitterId={metadata?.frontMatter?.twitterId} />
        </div>
      </QueryClientProvider>
    );

    return true;
  };

  useEffect(() => {
    if (!isBlogPostPage || hasInjectedSocialButtons || !contentRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      const success = injectSocialButtons();
      if (success) {
        setHasInjectedSocialButtons(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    isBlogPostPage,
    hasInjectedSocialButtons,
    metadata?.frontMatter?.twitterId,
  ]);

  return (
    <div
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx('markdown', className)}
      itemProp='articleBody'
      ref={contentRef}
    >
      <MDXContent>{children}</MDXContent>
    </div>
  );
}

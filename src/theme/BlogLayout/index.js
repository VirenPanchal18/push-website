/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import React from 'react';

// Internal Components
import { Content, Section } from '@site/src/css/SharedStyling';

// External Components
import { useTranslation } from 'react-i18next';

import SchemaMarkup from '@site/src/components/SEO/SchemaMarkup';
import Footer from '@site/src/segments/Footer';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function BlogLayout(props) {
  const { children } = props;

  // Internationalization
  const { t } = useTranslation();

  const location = useLocation();
  const pathname = location?.pathname;

  const isBlogMainPage =
    pathname.includes('/page/') || pathname == '/blog/' || pathname == '/blog';

  return (
    <Layout
      title={isBlogMainPage ? t('pages.blog.seo.title') : ''}
      description={isBlogMainPage ? t('pages.blog.seo.description') : ''}
    >
      {isBlogMainPage && (
        <>
          <Head>
            {/* <!-- Facebook Meta Tags --> */}
            <meta property='og:url' content='https://push.org/blog' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={t('pages.blog.seo.og-title')} />
            <meta
              property='og:description'
              content={t('pages.blog.seo.og-description')}
            />
            <meta
              name='twitter:image'
              content={useBaseUrl(
                require('/static/assets/previews/blogpreview.png').default,
                { absolute: true }
              )}
            />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@PushChain' />
            <meta name='twitter:creator' content='@PushChain' />
            <meta
              name='twitter:title'
              content={t('pages.blog.seo.twitter-title')}
            />
            <meta
              name='twitter:description'
              content={t('pages.blog.seo.twitter-description')}
            />
            <meta
              name='twitter:image'
              content={useBaseUrl(
                require('/static/assets/previews/blogpreview.png').default,
                { absolute: true }
              )}
            />
          </Head>

          {/* Schema Markup For Blog */}
          <SchemaMarkup
            type='Blog'
            pageDescription={t('pages.blog.seo.description')}
            pageUrl='https://push.org/blog'
          />
        </>
      )}

      <Section>
        <Content className='skeletonextrasmall blog clip'>{children}</Content>
      </Section>

      <Footer />
    </Layout>
  );
}

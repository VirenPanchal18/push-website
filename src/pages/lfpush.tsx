// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Component
import LFPushComp from '@site/src/pages-composition/lfpushComp';

// Internal Configs
import { DefaultDarkTheme } from '@site/src/css/SharedStyling';

function LFPushPage() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.lfpush.seo.title')}
      description={t('pages.lfpush.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/lfpush' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.lfpush.seo.og-title')} />
        <meta
          property='og:description'
          content={t('pages.lfpush.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/lfpushpreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Update Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.lfpush.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.lfpush.seo.description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl('/assets/previews/lfpushpreview.png', {
            absolute: true,
          })}
        />
      </Head>

      <DefaultDarkTheme>
        <LFPushComp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default LFPushPage;

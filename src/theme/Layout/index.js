/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import Head from '@docusaurus/Head';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import React from 'react';

// External Components
import AnnouncementBar from '@theme/AnnouncementBar';
import ErrorPageContent from '@theme/ErrorPageContent';
import LayoutProvider from '@theme/Layout/Provider';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Internal Components
import LivePlaygroundEditorHighlightScript from '@site/src/components/LivePlaygroundEditorHighlightScript';
import SchemaMarkup from '@site/src/components/SEO/SchemaMarkup';
import WebsiteMeta from '@site/src/components/SEO/WebsiteMeta';
import { ItemH } from '@site/src/css/SharedStyling';
import Footer from '@site/src/segments/Footer';
import Header from '@site/src/segments/Header';

// Internal Configs
import styles from './styles.module.css';

export default function Layout(props) {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
    showNavbar,
  } = props;

  const { t } = useTranslation();
  useKeyboardNavigation();

  return (
    <LayoutProvider>
      {/* Passing description as null since description is done custom on each page */}
      {/* Individual blog and docs pages handle it automatically */}
      <PageMetadata title={title} description={null} />

      {/* Default Schema Markup for all pages */}
      {/* Organization */}
      <SchemaMarkup type='Organization' />

      {/* WebSite */}
      <SchemaMarkup type='WebSite' />

      {/* Website Meta */}
      <WebsiteMeta />

      <SkipToContent />
      <AnnouncementBar />
      {/* Inject our live playground editor highlight script */}
      <LivePlaygroundEditorHighlightScript />
      {/* navbar for docs/blogs */}
      {(showNavbar === undefined || showNavbar === 'docusaurus') && <Navbar />}
      {/* navbar for website pages and sub pages */}
      {showNavbar === 'website' && <Header />}
      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {showNavbar === 'website' && (
        <ItemH background='var(--ifm-color-black)'>
          <Footer showPattern={false} />
        </ItemH>
      )}
    </LayoutProvider>
  );
}

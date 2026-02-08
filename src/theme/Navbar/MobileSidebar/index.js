/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useLocation } from '@docusaurus/router';
import { useSiteBaseUrl } from '@site/src/hooks/useSiteBaseUrl';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';
import React from 'react';
import BlogMobileSidebarContent from './BlogMobileSidebarContent';
import './styles.module.css';

export default function NavbarMobileSidebar() {
  const location = useLocation();
  const pathname = location?.pathname;
  const baseURL = useSiteBaseUrl() || '';

  const isBlogPage = !pathname?.startsWith(baseURL + '/docs');

  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={
        isBlogPage ? (
          <BlogMobileSidebarContent />
        ) : (
          <NavbarMobileSidebarPrimaryMenu />
        )
      }
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}

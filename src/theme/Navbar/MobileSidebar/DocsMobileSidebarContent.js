import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { HeaderList } from '@site/src/config/HeaderList';
import { useSiteBaseUrl } from '@site/src/hooks/useSiteBaseUrl';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function DocsMobileSidebarContent() {
  const history = useHistory();
  const location = useLocation();
  const baseURL = useSiteBaseUrl() || '';
  const mobileSidebar = useNavbarMobileSidebar();
  const { t } = useTranslation();
  const [showDocsMenu, setShowDocsMenu] = useState(true);

  const pathname = location?.pathname || '';
  const isDocsRoot =
    pathname === baseURL + '/docs' || pathname === baseURL + '/docs/';
  const isInDocsSection =
    pathname.startsWith(baseURL + '/docs/') && !isDocsRoot;

  useEffect(() => {
    // Reset to show custom menu when pathname changes
    setShowDocsMenu(true);
  }, [pathname]);

  const handleNavigation = (path) => {
    mobileSidebar.toggle();
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      history.push(baseURL + path);
    }
  };

  // Show SecondaryMenu (documentation sidebar/TOC) if user clicked "Move to Documentation"
  if (!showDocsMenu) {
    return (
      <div className='custom-docs-secondary-menu'>
        <BackButton onClick={() => setShowDocsMenu(true)}>
          ← Back to main menu
        </BackButton>
        <MenuDivider />
        <NavbarMobileSidebarSecondaryMenu />
      </div>
    );
  }

  return (
    <MobileMenuContainer>
      {isInDocsSection && (
        <>
          <BackButton onClick={() => setShowDocsMenu(false)}>
            Go to Documentation →
          </BackButton>
          <MenuDivider />
        </>
      )}

      <MenuItem onClick={() => handleNavigation('/')}>Homepage</MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs')}>
        Developer Docs
      </MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs/chain')}>
        What is Push Chain
      </MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs/chain/build')}>
        Core SDK
      </MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs/chain/ui-kit')}>
        UI Kit SDK
      </MenuItem>

      <ExploreSection>
        <ExploreHeader>Explore</ExploreHeader>

        <SubMenuContainer>
          {HeaderList.explore.map((item, index) => (
            <SubMenuItem
              key={index}
              onClick={() => handleNavigation(item.href)}
            >
              {t(item.text)}
            </SubMenuItem>
          ))}
        </SubMenuContainer>
      </ExploreSection>

      <MenuDivider />

      <MenuItem onClick={() => handleNavigation('https://portal.push.org/')}>
        Push Portal
      </MenuItem>
    </MobileMenuContainer>
  );
}

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 12px 12px;
  font-size: 1rem;
  font-weight: 400;
  color: var(--ifm-color-primary-text);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--ifm-navbar-dropdown-hover);
  }
`;

const ExploreSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExploreHeader = styled.div`
  padding: 12px 12px;
  font-size: 1rem;
  font-weight: 400;
  color: var(--ifm-color-primary-text);
`;

const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  border-left: 2px solid var(--ifm-color-pink-200);
`;

const SubMenuItem = styled.div`
  padding: 12px 12px;
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--ifm-color-primary-text);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--ifm-navbar-dropdown-hover);
    color: var(--ifm-color-pink-200);
  }
`;

const BackButton = styled.div`
  padding: 12px 1rem;
  font-size: 0.9rem;
  margin: -8px;
  font-weight: var(--ifm-button-font-weight);
  color: var(--ifm-color-primary-text);
  background: var(--ifm-menu-color-background-active);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MenuDivider = styled.div`
  height: 1px;
  margin: 8px 24px;
`;

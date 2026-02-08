import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { HeaderList } from '@site/src/config/HeaderList';
import { useSiteBaseUrl } from '@site/src/hooks/useSiteBaseUrl';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function DocsMobileSidebarContent() {
  const history = useHistory();
  const baseURL = useSiteBaseUrl() || '';
  const mobileSidebar = useNavbarMobileSidebar();
  const { t } = useTranslation();

  const handleNavigation = (path) => {
    mobileSidebar.toggle();
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      history.push(baseURL + path);
    }
  };

  return (
    <MobileMenuContainer>
      <MenuItem onClick={() => handleNavigation('/')}>Homepage</MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs/chain')}>
        What is Push Chain
      </MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs/chain/build')}>
        Let's Build
      </MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs/chain/ui-kit')}>
        UI Kit
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

      <MenuItem
        onClick={() => handleNavigation('https://discord.com/invite/pushchain')}
      >
        Ask in Discord
      </MenuItem>

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

const MenuDivider = styled.div`
  height: 1px;
  margin: 8px 24px;
`;

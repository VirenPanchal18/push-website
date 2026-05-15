/* eslint-disable */
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import styled from 'styled-components';

// Internal Configs
import { device } from '@site/src/config/globals';

interface GitHubRepoProps {
  title: string;
  repoUrl: string;
  description: string;
  className?: string;
}

export const GitHubRepo: React.FC<GitHubRepoProps> = ({
  title,
  repoUrl,
  description = 'View complete source code on GitHub',
  className = '',
}) => {
  const handleRepoClick = () => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <GitHubRepoContainer className={className}>
      <RepoButton onClick={handleRepoClick}>
        <GitHubIcon>
          <FiGithub size={20} />
        </GitHubIcon>

        <RepoContent>
          <RepoTitle>{title}</RepoTitle>
          <RepoSubtext>{description}</RepoSubtext>
        </RepoContent>

        <ExternalLinkIcon>
          <FiExternalLink size={16} />
        </ExternalLinkIcon>
      </RepoButton>
    </GitHubRepoContainer>
  );
};

// Styled Components
const GitHubRepoContainer = styled.div`
  margin: 24px 0;
  padding: 0;
`;

const RepoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 20px;
  background: var(--ifm-background-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: var(--ifm-color-primary-unified);
  }

  &:active {
    transform: translateY(0);
  }

  @media ${device.tablet} {
    padding: 14px 16px;
    gap: 10px;
  }

  @media ${device.mobileL} {
    padding: 12px 14px;
    gap: 8px;
  }
`;

const GitHubIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--ifm-color-black);
  border-radius: 6px;
  color: var(--ifm-color-white);
  flex-shrink: 0;

  @media ${device.tablet} {
    width: 36px;
    height: 36px;
  }

  @media ${device.mobileL} {
    width: 32px;
    height: 32px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const RepoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const RepoTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--ifm-color-content);
  margin-bottom: 4px;
  word-break: break-word;

  @media ${device.tablet} {
    font-size: 15px;
  }

  @media ${device.mobileL} {
    font-size: 14px;
  }
`;

const RepoSubtext = styled.div`
  font-size: 14px;
  color: var(--ifm-color-content-secondary);
  font-weight: 400;

  @media ${device.tablet} {
    font-size: 13px;
  }

  @media ${device.mobileL} {
    font-size: 12px;
  }
`;

const ExternalLinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ifm-color-content-secondary);
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  ${RepoButton}:hover & {
    opacity: 1;
  }

  @media ${device.mobileL} {
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default GitHubRepo;

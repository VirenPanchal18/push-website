/* eslint-disable */
// @ts-nocheck

// React + Web3 Essentials
import React, { useEffect, useRef, useState } from 'react';

// External Components
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiCopy, FiEye, FiMessageCircle } from 'react-icons/fi';
import styled from 'styled-components';

// Internal Configs
import { device } from '@site/src/config/globals';

interface CopyPageButtonProps {
  pageContent?: string;
  pageTitle?: string;
  pageUrl?: string;
}

export const CopyPageButton: React.FC<CopyPageButtonProps> = ({
  pageContent = '',
  pageTitle = 'Documentation Page',
  pageUrl = '',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Get Docusaurus context and doc metadata
  const { siteConfig } = useDocusaurusContext();
  let docMetadata = null;

  try {
    docMetadata = useDoc();
  } catch (error) {
    // useDoc hook is only available in doc pages, ignore error for other pages
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get page content for copying
  const getPageContent = async () => {
    if (pageContent) return pageContent;

    // Try to get the actual markdown from GitHub first
    const currentUrl = pageUrl || window.location.href;
    const githubMarkdown = await fetchGitHubMarkdown(currentUrl);

    if (githubMarkdown) {
      return githubMarkdown;
    }

    // Fallback to extracting content from the rendered page
    const docContent =
      document.querySelector('[class*="docMainContainer"]') ||
      document.querySelector('main') ||
      document.querySelector('article') ||
      document.body;

    const titleElement =
      document.querySelector('h1') || document.querySelector('title');
    const actualTitle =
      titleElement?.textContent || pageTitle || document.title;

    const textContent = docContent?.innerText || '';

    return `# ${actualTitle}\n\nSource: ${currentUrl}\n\n${textContent}`;
  };

  // Get GitHub raw URL for direct viewing
  const getGitHubRawUrl = async (url: string): Promise<string | null> => {
    try {
      // Try to get edit URL from Docusaurus metadata first
      let editUrl = docMetadata?.metadata?.editUrl;

      // If no metadata available, try to find the edit link in DOM (for production)
      if (!editUrl) {
        const editLink = document.querySelector(
          'a[href*="github.com"][href*="/edit/"]'
        );
        editUrl = editLink?.getAttribute('href');
      }

      // If still no edit URL, try to construct it manually from current path
      if (!editUrl) {
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/docs/')) {
          const docsPath = currentPath.replace('/docs/', '');
          // Use the editUrl from docusaurus config
          const baseEditUrl =
            siteConfig?.presets?.[0]?.[1]?.docs?.editUrl ||
            'https://github.com/pushchain/push-chain-website/edit/main';
          editUrl = `${baseEditUrl}/docs/${docsPath}.mdx`;
        }
      }

      if (!editUrl) {
        return null;
      }

      // Convert GitHub edit URL to raw URL
      let rawUrl = editUrl.replace('github.com', 'raw.githubusercontent.com');

      // Handle different GitHub URL patterns
      if (rawUrl.includes('/blob/')) {
        rawUrl = rawUrl.replace('/blob/', '/refs/heads/');
      } else if (rawUrl.includes('/edit/')) {
        rawUrl = rawUrl.replace('/edit/', '/refs/heads/');
      } else if (rawUrl.includes('/pull/')) {
        // PR URLs: /pull/123/files or /pull/123/commits/sha/path
        const prMatch = rawUrl.match(/\/pull\/(\d+)/);
        if (prMatch) {
          const prNumber = prMatch[1];
          const repoMatch = rawUrl.match(
            /raw\.githubusercontent\.com\/([^\/]+\/[^\/]+)/
          );

          if (repoMatch) {
            const repoPath = repoMatch[1];

            try {
              // Get PR information from GitHub API to find the head branch
              const prApiUrl = `https://api.github.com/repos/${repoPath}/pulls/${prNumber}`;
              const prResponse = await fetch(prApiUrl);

              if (prResponse.ok) {
                const prData = await prResponse.json();
                const headBranch = prData.head.ref;

                // Extract file path from the original URL
                const pathIndex = rawUrl.indexOf('/docs/');
                if (pathIndex !== -1) {
                  const filePath = rawUrl.substring(pathIndex);
                  rawUrl = `https://raw.githubusercontent.com/${repoPath}/refs/heads/${headBranch}${filePath}`;
                }
              } else {
                // Fallback to main branch if API call fails
                const pathIndex = rawUrl.indexOf('/docs/');
                if (pathIndex !== -1) {
                  const filePath = rawUrl.substring(pathIndex);
                  rawUrl = `https://raw.githubusercontent.com/${repoPath}/refs/heads/main${filePath}`;
                }
              }
            } catch (error) {
              // Fallback to main branch if API call fails
              const pathIndex = rawUrl.indexOf('/docs/');
              if (pathIndex !== -1) {
                const filePath = rawUrl.substring(pathIndex);
                rawUrl = `https://raw.githubusercontent.com/${repoPath}/refs/heads/main${filePath}`;
              }
            }
          }
        }
      }

      return rawUrl;
    } catch (error) {
      console.warn('Failed to get GitHub raw URL:', error);
      return null;
    }
  };

  // Fetch actual markdown from GitHub repository using Docusaurus metadata
  const fetchGitHubMarkdown = async (url: string) => {
    try {
      const rawUrl = await getGitHubRawUrl(url);

      if (!rawUrl) {
        return null;
      }

      const response = await fetch(rawUrl);

      if (response.ok) {
        const markdown = await response.text();
        return `# ${pageTitle || 'Push Chain Documentation'}\n\nSource: ${url}\nGitHub: ${rawUrl}\n\n${markdown}`;
      }
    } catch (error) {
      console.warn('Failed to fetch GitHub markdown:', error);
    }

    return null;
  };

  // Copy page content to clipboard
  const handleCopyPage = async () => {
    try {
      const content = await getPageContent();

      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setIsDropdownOpen(false);

      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  // View as markdown in new window - opens GitHub raw URL directly
  const handleViewAsMarkdown = async () => {
    try {
      const currentUrl = pageUrl || window.location.href;
      const githubRawUrl = await getGitHubRawUrl(currentUrl);

      if (githubRawUrl) {
        // Open GitHub raw URL directly - much cleaner and faster
        window.open(githubRawUrl, '_blank');
      } else {
        // Fallback: create a new window with extracted content
        const content = await getPageContent();
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>${pageTitle} - Markdown View</title>
                <style>
                  body { 
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; 
                    padding: 20px; 
                    background: #1a1a1a; 
                    color: #e0e0e0; 
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                  }
                  pre { 
                    white-space: pre-wrap; 
                    word-wrap: break-word; 
                  }
                </style>
              </head>
              <body>
                <pre>${content}</pre>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      }
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Failed to open markdown view:', err);
    }
  };

  // Open in ChatGPT
  const handleOpenInChatGPT = async () => {
    try {
      const content = await getPageContent();
      const titleElement =
        document.querySelector('h1') || document.querySelector('title');
      const pageTitle =
        titleElement?.textContent || pageTitle || document.title;

      let prompt;

      // If content is too long, use shorter format with GitHub raw URL
      if (content.length > 1500) {
        const githubUrl = await getGitHubRawUrl(window.location.href);
        if (githubUrl) {
          prompt = `Please help me understand this: ${pageTitle}\n\n${githubUrl}`;
        } else {
          // Fallback: truncate content if no GitHub URL available
          const truncatedContent = content.substring(0, 800) + '...';
          prompt = `Please help me understand this documentation:\n\n${truncatedContent}`;
        }
      } else {
        // Use full content if it's short enough
        prompt = `Please help me understand this documentation:\n\n${content}`;
      }

      const encodedPrompt = encodeURIComponent(prompt);
      window.open(`https://chat.openai.com/?q=${encodedPrompt}`, '_blank');
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Failed to get content for ChatGPT:', err);
    }
  };

  // Open in Claude
  const handleOpenInClaude = async () => {
    try {
      const content = await getPageContent();
      const titleElement =
        document.querySelector('h1') || document.querySelector('title');
      const pageTitle =
        titleElement?.textContent || pageTitle || document.title;

      let prompt;

      // If content is too long, use shorter format with GitHub raw URL
      if (content.length > 1500) {
        const githubUrl = await getGitHubRawUrl(window.location.href);
        if (githubUrl) {
          prompt = `Please help me understand this: ${pageTitle}\n\n${githubUrl}`;
        } else {
          // Fallback: truncate content if no GitHub URL available
          const truncatedContent = content.substring(0, 800) + '...';
          prompt = `Please help me understand this documentation:\n\n${truncatedContent}`;
        }
      } else {
        // Use full content if it's short enough
        prompt = `Please help me understand this documentation:\n\n${content}`;
      }

      const encodedPrompt = encodeURIComponent(prompt);
      window.open(`https://claude.ai/chat?q=${encodedPrompt}`, '_blank');
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Failed to get content for Claude:', err);
    }
  };

  return (
    <CopyPageContainer ref={dropdownRef}>
      <CopyPageTrigger
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        $isOpen={isDropdownOpen}
        $copySuccess={copySuccess}
        title='Copy page options'
        aria-label='Copy page options'
      >
        <FiCopy size={16} />
        <span>{copySuccess ? 'Copied!' : 'Copy page for AI'}</span>
        <FiChevronDown
          size={14}
          className={`chevron ${isDropdownOpen ? 'open' : ''}`}
        />
      </CopyPageTrigger>

      {isDropdownOpen && (
        <CopyPageDropdown>
          <DropdownItem onClick={handleCopyPage}>
            <FiCopy size={16} />
            <div>
              <ItemTitle>Copy page</ItemTitle>
              <ItemDescription>
                Copy the page as Markdown for LLMs
              </ItemDescription>
            </div>
          </DropdownItem>

          <DropdownItem onClick={handleViewAsMarkdown}>
            <FiEye size={16} />
            <div>
              <ItemTitle>View as Markdown</ItemTitle>
              <ItemDescription>View this page as plain text</ItemDescription>
            </div>
          </DropdownItem>

          <DropdownSeparator />

          <DropdownItem onClick={handleOpenInChatGPT}>
            <FiMessageCircle size={16} />
            <div>
              <ItemTitle>Open in ChatGPT</ItemTitle>
              <ItemDescription>Ask questions about this page</ItemDescription>
            </div>
          </DropdownItem>

          <DropdownItem onClick={handleOpenInClaude}>
            <FiMessageCircle size={16} />
            <div>
              <ItemTitle>Open in Claude</ItemTitle>
              <ItemDescription>Ask questions about this page</ItemDescription>
            </div>
          </DropdownItem>
        </CopyPageDropdown>
      )}
    </CopyPageContainer>
  );
};

// Styled Components
const CopyPageContainer = styled.div`
  position: relative;
  display: inline-block;

  @media ${device.tablet} {
    display: none;
  }
`;

const CopyPageTrigger = styled.button<{
  $isOpen: boolean;
  $copySuccess: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 8px 10px;
  width: 100%;
  background: transparent;
  border: 1px solid
    ${(props) =>
      props.$copySuccess
        ? 'var(--ifm-color-success-dark)'
        : 'var(--ifm-color-emphasis-200)'};
  border-radius: 4px;
  color: ${(props) =>
    props.$copySuccess
      ? 'var(--ifm-color-success-dark)'
      : 'var(--ifm-color-content)'};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(props) =>
      props.$copySuccess
        ? 'var(--ifm-color-success-dark)'
        : 'var(--ifm-color-emphasis-200)'};
    border-color: ${(props) =>
      props.$copySuccess
        ? 'var(--ifm-color-success-darker)'
        : 'var(--ifm-color-emphasis-200)'};
  }

  .chevron {
    transition: transform 0.2s ease;
    transform: ${(props) =>
      props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    flex-shrink: 0;
  }

  @media ${device.tablet} {
    padding: 6px 8px;
    font-size: 11px;
  }
`;

const CopyPageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 280px;
  background: var(--ifm-color-emphasis-0);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;

  @media ${device.tablet} {
    left: -20px;
    width: 260px;
  }
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--ifm-color-emphasis-100);
  }

  svg {
    margin-top: 2px;
    color: var(--ifm-color-content-secondary);
    flex-shrink: 0;
  }

  div {
    flex: 1;
  }
`;

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--ifm-color-content);
  margin-bottom: 2px;
`;

const ItemDescription = styled.div`
  font-size: 12px;
  color: var(--ifm-color-content-secondary);
  line-height: 1.4;
`;

const DropdownSeparator = styled.div`
  height: 1px;
  background: var(--ifm-color-emphasis-200);
  margin: 4px 0;
`;

export default CopyPageButton;

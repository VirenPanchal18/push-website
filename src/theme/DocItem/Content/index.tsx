import React, { type ReactNode, useRef } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/DocItem/Content';
import { useInjectInviteCode } from '@site/src/components/InviteCodeWidget';

function useSyntheticTitle(): string | null {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({ children }: Props): ReactNode {
  const syntheticTitle = useSyntheticTitle();
  const contentRef = useRef<HTMLDivElement>(null);
  useInjectInviteCode(contentRef);

  return (
    <div
      className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}
      ref={contentRef}
    >
      {syntheticTitle && (
        <header>
          <Heading as='h1'>{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}

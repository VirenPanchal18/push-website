import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useInjectInviteCode } from '@site/src/components/InviteCodeWidget';
import type { Props } from '@theme/DocItem/Content';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import clsx from 'clsx';
import React, { type ReactNode, useRef } from 'react';

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

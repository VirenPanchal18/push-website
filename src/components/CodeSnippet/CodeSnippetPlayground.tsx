import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import NodeJSVirtualIDE from '@site/src/components/NodeJSVirtualIDE/NodeJSVirtualIDE';
import Spinner, {
  SPINNER_TYPE,
} from '@site/src/components/reusables/spinners/SpinnerUnit';
import CodeBlock from '@theme/CodeBlock';
import React, { useEffect, useState } from 'react';

interface CodeSnippetPlaygroundProps {}

const CodeSnippetPlayground: React.FC<CodeSnippetPlaygroundProps> = () => {
  return (
    <BrowserOnly
      fallback={
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
        >
          <Spinner type={SPINNER_TYPE.PROCESSING} size={48} />
        </div>
      }
    >
      {() => <CodeSnippetPlaygroundClient />}
    </BrowserOnly>
  );
};

const CodeSnippetPlaygroundClient: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [playgroundType, setPlaygroundType] = useState<'react' | 'node'>(
    'react'
  );
  const [error, setError] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    // Set the base URL dynamically
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(() => {
    const decompressCode = (compressedCode: string): string => {
      try {
        // Use the base64 string directly - don't URL-decode it
        const base64String = compressedCode;
        console.debug('Decompressing base64, length:', base64String.length);

        // Decode base64 using TextEncoder/TextDecoder for proper Unicode handling
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const decoded = decoder.decode(bytes);
        console.debug(
          'Decompression successful, decoded length:',
          decoded.length
        );
        return decoded;
      } catch (err) {
        console.error('Decompression error:', err);
        // If decompression fails, return as-is
        return compressedCode;
      }
    };

    const parseUrl = () => {
      try {
        const hash = window.location.hash;
        console.debug('Parsing URL hash:', hash.substring(0, 100) + '...');

        if (!hash) {
          setError('No code snippet provided in URL');
          return;
        }

        // Parse hash manually to avoid URLSearchParams corrupting base64 strings
        const hashParams = hash.substring(1);
        const codeMatch = hashParams.match(/code=([^&]+)/);
        const ideMatch = hashParams.match(/ide=([^&]+)/);

        const codeParam = codeMatch ? codeMatch[1] : null;
        const ideParam = ideMatch ? ideMatch[1] : null;
        console.debug(
          'Parsed params - code length:',
          codeParam?.length,
          'ide:',
          ideParam
        );
        console.debug(
          'codeParam first 100 chars:',
          codeParam?.substring(0, 100)
        );

        if (!codeParam) {
          setError('No code parameter found in URL');
          return;
        }

        const decodedCode = decompressCode(codeParam);
        setCode(decodedCode);

        if (ideParam === 'node' || ideParam === 'react') {
          setPlaygroundType(ideParam);
        } else if (ideParam) {
          setError(
            `Invalid playground type: ${ideParam}. Using default (react)`
          );
        }
      } catch (err) {
        setError(
          `Error parsing URL: ${err?.message || err?.toString() || 'Unknown error'}`
        );
      }
    };

    parseUrl();
  }, []);

  if (error && !code) {
    return (
      <>
        <div
          style={{
            padding: '0.5rem',
            borderRadius: '12px',
            marginBottom: '1rem',
          }}
        >
          <h2>⚠️ Error</h2>
          <p
            style={{
              backgroundColor: 'var(--ifm-surface-alert-warning-subtle',
              borderColor: 'var(--ifm-border-alert-warning-subtle)',
              padding: '0.5rem',
              borderRadius: '12px',
              marginBottom: '1rem',
            }}
          >
            {error}
          </p>
        </div>
        <div>
          <h2>Examples 👇</h2>
          <h3>React Code Snippet</h3>
          <div
            style={{
              backgroundColor: 'var(--ifm-navbar-search-bg)',
              padding: '0.5rem',
              borderRadius: '12px',
              marginTop: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <a
              href='/docs/chain/code-snippet#code=YOUR_CODE&ide=react'
              style={{ color: 'var(--ifm-color-primary)', cursor: 'pointer' }}
            >
              {baseUrl}/docs/chain/code-snippet#code=YOUR_CODE&ide=react
            </a>
          </div>
          <h3>Virtual IDE Code Snippet</h3>
          <div
            style={{
              backgroundColor: 'var(--ifm-navbar-search-bg)',
              padding: '0.5rem',
              borderRadius: '12px',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <a
              href='/docs/chain/code-snippet#code=YOUR_CODE&ide=node'
              style={{ color: 'var(--ifm-color-primary)', cursor: 'pointer' }}
            >
              {baseUrl}/docs/chain/code-snippet#code=YOUR_CODE&ide=node
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {playgroundType === 'node' ? (
        <NodeJSVirtualIDE repo={null}>{code}</NodeJSVirtualIDE>
      ) : (
        <ReactPlayground code={code} />
      )}
    </>
  );
};

const ReactPlayground: React.FC<{ code: string }> = ({ code }) => {
  return (
    <CodeBlock language='jsx' live>
      {code}
    </CodeBlock>
  );
};

export default CodeSnippetPlayground;

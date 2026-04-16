# UI Components Reference — @pushchain/ui-kit

> Deep context for `push-frontend` skill. Load this file only when you need wallet provider customization, hook APIs, or connection state details.

## PushUniversalWalletProvider — Full Config

```tsx
import { PushUniversalWalletProvider, PushUI } from '@pushchain/ui-kit';

<PushUniversalWalletProvider
  config={{
    network: PushUI.CONSTANTS.PUSH_NETWORK.TESTNET, // required
    login: {
      email: true,
      google: true,
      wallet: { enabled: true },
      appPreview: true,           // show app preview in login modal
    },
    modal: {
      loginLayout: PushUI.CONSTANTS.LOGIN.LAYOUT.SPLIT,      // SPLIT | FULL
      connectedLayout: PushUI.CONSTANTS.CONNECTED.LAYOUT.HOVER, // HOVER | MODAL
      appPreview: true,
    },
  }}
  app={{
    title: 'My App',
    description: 'Short description shown in the login modal',
    logoUrl: 'https://example.com/logo.png',
  }}
>
  {children}
</PushUniversalWalletProvider>
```

### config.network values

| Constant | Network |
|---|---|
| `PushUI.CONSTANTS.PUSH_NETWORK.TESTNET` | Donut Testnet (use for development) |
| `PushUI.CONSTANTS.PUSH_NETWORK.TESTNET_DONUT` | Alias for TESTNET |
| `PushUI.CONSTANTS.PUSH_NETWORK.LOCALNET` | Local dev node |

## usePushWalletContext — Full API

```tsx
import { usePushWalletContext, PushUI } from '@pushchain/ui-kit';

const {
  connectionStatus,          // PushUI.CONSTANTS.CONNECTION.STATUS
  handleConnectToPushWallet, // () => void — open wallet connection modal
  handleUserLogOutEvent,     // () => void — disconnect and clear session
} = usePushWalletContext();

// Compare against the enum:
const isConnected =
  connectionStatus === PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTED;

// connectionStatus values:
// PushUI.CONSTANTS.CONNECTION.STATUS.NOT_CONNECTED
// PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTING
// PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTED
```

## usePushChainClient — Full API

```tsx
import { usePushChainClient } from '@pushchain/ui-kit';

const {
  pushChainClient, // PushChainClient | null — null until wallet connects
  isInitialized,   // boolean — false while client is booting
  error,           // Error | null — set if initialization fails
} = usePushChainClient(uid?); // uid: optional — target a specific PushUniversalWalletProvider instance
```

## usePushChain — Full API

```tsx
import { usePushChain } from '@pushchain/ui-kit';

const { PushChain } = usePushChain();
// PushChain is the @pushchain/core SDK — use for utilities, constants, PushChain.initialize()
// e.g. PushChain.utils.account.toChainAgnostic(address, { chain })
```

## PushUniversalAccountButton — Props

```tsx
import { PushUniversalAccountButton } from '@pushchain/ui-kit';

<PushUniversalAccountButton
  connectButtonText="Connect Wallet"          // default: 'Connect Account'
  loadingComponent={<MyLoader />}             // custom loading indicator
  uid="primary"                               // match provider config.uid (multi-instance)
  themeOverrides={{                           // --pwauth-* variables only
    '--pwauth-btn-connect-border-radius': '32px',
    light: { '--pwauth-btn-connect-bg-color': '#3459F0' },
    dark:  { '--pwauth-btn-connect-bg-color': '#6684FC' },
  }}
  loginAppOverride={{ title: 'My App', description: 'Tagline' }}
  modalAppOverride={{ title: 'My App' }}
  customConnectComponent={<MyConnectBtn />}   // replace default connect button
  customConnectedComponent={<MyConnected />}  // replace default connected button
  connectButtonClassName="my-connect"
  connectedButtonClassName="my-connected"
/>
```

Place it anywhere inside `<PushUniversalWalletProvider>`. No required props.

## Theme Customization

```tsx
// App-wide override (both themes)
<PushUniversalWalletProvider
  themeMode={PushUI.CONSTANTS.THEME.DARK}  // LIGHT | DARK
  themeOverrides={{
    '--pw-core-brand-primary-color': '#3459F0',
    '--pw-core-bg-primary-color': '#FAF3E0',
    light: { '--pw-core-bg-secondary-color': '#F9F7FC' },
    dark:  { '--pw-core-bg-secondary-color': '#2B2235' },
  }}
>
```

Key variables:

| Variable | Description |
|---|---|
| `--pw-core-brand-primary-color` | Brand accent |
| `--pw-core-bg-primary-color` | Modal / page background |
| `--pw-core-bg-secondary-color` | Surface / card background |
| `--pw-core-text-primary-color` | Primary text |
| `--pw-core-modal-border-radius` | Modal corner radius (default `24px`) |
| `--pw-core-modal-width` | Modal width (default `376px`) |
| `--pwauth-btn-connect-bg-color` | Connect button background |
| `--pwauth-btn-connect-text-color` | Connect button text |
| `--pwauth-btn-connected-bg-color` | Connected button background (default `#000`) |
| `--pwauth-btn-connect-border-radius` | Connect button radius (default `12px`) |

> `--pwauth-*` variables can also be overridden per button via `PushUniversalAccountButton.themeOverrides`.

## PushUI.CONSTANTS Reference

```ts
PushUI.CONSTANTS.PUSH_NETWORK.TESTNET              // network selector
PushUI.CONSTANTS.CONNECTION.STATUS.NOT_CONNECTED   // wallet not connected
PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTING      // wallet connecting
PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTED       // wallet connected
PushUI.CONSTANTS.THEME.LIGHT                       // light theme mode
PushUI.CONSTANTS.THEME.DARK                        // dark theme mode
PushUI.CONSTANTS.LOGIN.LAYOUT.SPLIT                // modal login layout
PushUI.CONSTANTS.CONNECTED.LAYOUT.HOVER            // modal connected layout
```

## Docs

- Full provider reference: https://push.org/docs/chain/ui-kit/customizations/push-universal-wallet-provider/
- usePushWalletContext: https://push.org/docs/chain/ui-kit/customizations/use-push-wallet-context/
- usePushChainClient: https://push.org/docs/chain/ui-kit/customizations/use-push-chain-client/
- usePushChain: https://push.org/docs/chain/ui-kit/customizations/use-push-chain/
- Theme variables: https://push.org/docs/chain/ui-kit/customizations/theme-variables/

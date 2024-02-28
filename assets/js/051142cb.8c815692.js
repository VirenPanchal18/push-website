"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[12968],{209032:e=>{e.exports=JSON.parse('{"title":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","description":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","frontMatter":{"slug":"push-nodes-p2p","title":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","authors":["push"],"image":"./cover-image.webp","description":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","text":"We are thrilled to announce the release of two new open-source EPNS tools to enhance the integration and implementation of EPNS Decentralized Notifications within your dApps and protocols, the EPNS Backend SDK Beta v1.0 and the EPNS Showrunners Framework; two of our most anticipated roadmap milestones for Q2.","tags":["Roadmap","Blockchain","Ethereum","Notifications","Newsletter"]},"content":{"id":"push-nodes-p2p","metadata":{"permalink":"/blog/push-nodes-p2p","source":"@site/blog/2021-11-24-push-nodes-p2p/index.md","title":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","description":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","date":"2021-11-24T00:00:00.000Z","formattedDate":"November 24, 2021","tags":[{"label":"Roadmap","permalink":"/blog/tags/roadmap"},{"label":"Blockchain","permalink":"/blog/tags/blockchain"},{"label":"Ethereum","permalink":"/blog/tags/ethereum"},{"label":"Notifications","permalink":"/blog/tags/notifications"},{"label":"Newsletter","permalink":"/blog/tags/newsletter"}],"readingTime":4.35,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"push-nodes-p2p","title":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","authors":["push"],"image":"./cover-image.webp","description":"Push Nodes P2P \u2014 Web3\u2019s way to communicate!","text":"We are thrilled to announce the release of two new open-source EPNS tools to enhance the integration and implementation of EPNS Decentralized Notifications within your dApps and protocols, the EPNS Backend SDK Beta v1.0 and the EPNS Showrunners Framework; two of our most anticipated roadmap milestones for Q2.","tags":["Roadmap","Blockchain","Ethereum","Notifications","Newsletter"]},"unlisted":false,"prevItem":{"title":"EPNS Enables Snapshot Voting for PUSH and PUSH/ETH LP Stakers!","permalink":"/blog/epns-enables-snapshot-voting"},"nextItem":{"title":"Fabwelt partners with EPNS to bring push notifications to crypto gaming","permalink":"/blog/fabwelt-partners-with-epns"}},"content":"import { ImageText } from \'@site/src/css/SharedStyling\';\\n\\n![Cover Image of Push Nodes P2P \u2014 Web3\u2019s way to communicate!](./cover-image.webp)\\n\\n\x3c!--truncate--\x3e\\n\\nIn our [2021 Roadmap](https://medium.com/ethereum-push-notification-service/epns-roadmap-2021-c4ededc57a12), we promised to launch the alpha of Push Nodes, which will enable communication across Ethereum and its emerging L2s.\\n\\nWe are ecstatic to share that the Push Nodes communication system has evolved beyond our initial roadmap, and is now on its way to support multi-chain, including EVM and non-EVM compatible chains!\\n\\nReady to learn how? Let\u2019s get started \ud83d\udcaa \ud83d\udd14\\n\\n### EPNS Protocol Overview / Recap\\nWe recently released an article with an [overview of the entire EPNS Protocol](https://medium.com/ethereum-push-notification-service/roadmap-q3-audited-epns-push-protocol-v1-is-here-f4560dfe550c). To summarize, the EPNS Protocol is a group of smart contracts that enables 1) validation and governance through EPNS Core and 2) communication through EPNS Communicator smart contracts and SDKs.\\n\\nUnderstanding the two components of the EPNS Protocol is critical, as Push Nodes interact with them to enable decentralized communication \u2014 aka the missing piece of Web3. We will briefly describe them below, but recommend reading [the full article](https://medium.com/ethereum-push-notification-service/roadmap-q3-audited-epns-push-protocol-v1-is-here-f4560dfe550c).\\n\\n#### EPNS Core (Governance Smart Contract)\\nBefore anyone can send a notification, they must first be activated on EPNS Core as a channel. It is important to note that the EPNS Core resides only on the Ethereum blockchain. EPNS Core handles a majority of governance and channel related task including:\\n\\n- Channel Creation\\n- Channel Modification\\n- Channel Blocking / Deletion\\n- Verified Channels\\n- Fees Management among token holders, etc\\n\\n#### EPNS Communicator\\nEPNS Communicator, as the name suggests, is the layer where actual communication happens. The Communicator Protocol is comparatively much simpler & handles tasks including:\\n\\n- Opt-in for notifications\\n- Sending Notifs\\n- Delegating responsibilities of Notifs to other wallets\\n- Verifying multichain channel creation, etc\\n\\n<blockquote><i>Note: the EPNS Communicator resides on multiple blockchains, both EVM and non-EVM compatible. In addition to being available as smart contracts, the EPNS Communicator SDK enables sending notification payloads directly to Push Nodes as well as enabling off-chain transactions.</i></blockquote>\\n\\nThe EPNS Communicator ensures that on-chain and off-chain notifications alike can make it to your wallet address regardless of what a services chooses to send them from. In other words, notifications make it to you whether they come from the logic of a smart contract, dapp, or backend.\\n\\nWith the brief intro out of the way, it\u2019s time to dive deep into Push Nodes and how they make everything possible \u2764\ufe0f!\\n\\n### Push Nodes Overview\\nMultichain, huh! So if the contracts are deployed on multiple chains and governance happens on Ethereum how does everything work together \ud83e\udd14! Well Frens, the answer to that lies in Push Nodes!!!\\n\\n![First Image of Push Nodes P2P \u2014 Web3\u2019s way to communicate!](./image-1.webp)\\n\\nPush Nodes are the central piece of the network that enables the blockchain of Web3 notifications to work. In essence, they are validators that can be run by anyone in the future with staking and slashing. Push Nodes have three crucial tasks:\\n\\n- <b>Listening</b>: Push Nodes listens to EPNS Communicator smart contracts on every blockchain. Besides that, they also enable off-chain or direct communication via API calls either from a backend or a dApp. This on-chain and off-chain communication listening enables EPNS to support just about any Web3 service\u2026 ie: smart contracts, dApps, backends or direct payloads!!\\n- <b>Validating and Governing</b>: The communication which is driven by the EPNS Communicator layers require validation (Checking if the channel exists, is not spamming, is cross-chain verified, etc) which happens via the EPNS Core layer which contains functions to enable governance and to verify the existence of the channel.\\n- <b>Admitting to Network / Dispatching</b>: Lastly, the Push Nodes admit these notifications that are tied to wallet address in the network which can then be tapped into by any crypto frontend / wallet to display them. The dispatch functionality is also present in these nodes to allow bridging of Web3 notifications to be displayed in Web2 apps in case the wallet / frontend / software wants to enable that instead of handling direct socket connection.\\n\\n<blockquote><i>Push Nodes along with the functionality outlined above are already working in a test environment. We plan to decentralize push nodes after mainnet.</i></blockquote>\\n\\n#### Push Nodes Architecture Deep Dive\\n\\n![Second Image of Push Nodes P2P \u2014 Web3\u2019s way to communicate!](./image-2.webp)\\n\\nLet\u2019s briefly look at some of the key functionalities of the Push Nodes and how the multichain construction of payload and dispatching works.\\n\\n#### History Fetcher (Syncing / Indexing)\\nSyncing the previous history of EPNS Core and EPNS Communicator is one of the crucial feature of this module. It ensures replication of data which is one of the core feature of push nodes apart from ensuring quick validation as it indexes EPNS Core data including channels.\\n\\n#### Web Sockets (Receiving)\\nThe main job of Push Nodes is to enable wss sockets on both the receiving side, ie: EPNS Comm smart contracts (on-chain) and direct payloads coming from backend / dapp (off-chain) side as a way to listen and update the state of the persistent data storage. The web socket connection and the router that enables routes ensures this functionality.\\n\\n#### Validation and Admittance (Validators)\\nThe received payloads whether direct or from EPNS Communicator smart contracts always trigger multiple validation phases which are outlined below:\\n\\n- Validating Payload Authenticity: The push nodes check any incoming payload for the channel address (or delegator address) to ensure that the payloads are authentic and will drop any payloads that doesn\u2019t fit the scenario.\\n- Extrapolating payload and recipients: The next step which happens is the extrapolation of data that fetches the actual payload from the identity following which will include looking at where the payload is stored (at the time of writing, supports IPFS and smart contract bytes), expanding on the recipient list (entire channel, subset or single), etc to get the list of recipients as well as the actual payload.\\n- Mapping to recipients inbox / spambox: The next step in the validation requires mapping these payloads of individual recipients to either their inbox or spambox based on the users opt-in that has already been recorded either via the history fetcher or via the EPNS Comm smart contracts or via direct opt-in on the push nodes itself.\\n\\n#### Dispatching via Web Sockets (Dispatching)\\nOn the opposite side, the web sockets connection ensures that any crypto frontend / wallet can listen directly to the push nodes and use it to display the notifications / communications meant for the user wallet address.\\n\\n#### Dispatching via Web3 to Web2 bridge (Dispatching)\\nAn optional functionality that runs locally and will not be synced across push nodes is the ability to transmit these notifications from Web3 to Web2 apps / extensions. For example: sending the notifications to a mobile app on iOS / Android.\\n\\nThe way this bridge works is having a local functionality of mapping wallets addresses to device ids of a particular third party app along with the centralized credentials of the app push certificates. If this module is active then that push node not only syncs and validates the data but is also responsible for pushing the notifications out to web2 apps or extension.\\n\\n#### Road Forward\\nAll these features and other crucial data outlined above are present and working which is how you guys are getting the web3 notifications we all wanted \ud83d\ude03 (though running in a controlled environment).\\n\\nIn brief, the plan from here is to create a cluster of nodes that will communicate with each other and keep the data in sync and create decentralization around this layer as well.\\n\\n<blockquote><i>\\nWe will be creating a rewards (via staking) and penalizing (via slashing) game theory around it which will ensure active participation and true decentralization of these nodes as we move further into syncing and readying our push nodes to be open for users to freely run on.\\n</i></blockquote>"}}')}}]);
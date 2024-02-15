"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[93256],{863928:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var a=n(785893),i=n(511151);const s={slug:"what-is-erc-6551-and-how-s-it-better-than-erc-721",title:"What is ERC-6551 and How\u2019s It Better than ERC-721?",authors:["push"],image:"./cover-image.png",text:"In 2017, the ERC-721 standard revolutionized the tokenization of digital assets, defining the basic set of rules and functions for creating non-fungible tokens (NFTs). Since then, NFTs have gained significant popularity, transforming how we perceive and interact with digital art, collectibles, virtual real estate, and more.",tags:["Erc6551","Eip","Ethereum","Nft","Web Tools"]},o=void 0,r={permalink:"/blog/what-is-erc-6551-and-how-s-it-better-than-erc-721",source:"@site/blog/2023-06-13-what-is-erc-6551/index.md",title:"What is ERC-6551 and How\u2019s It Better than ERC-721?",description:"Cover image of What is ERC-6551 and How\u2019s It Better than ERC-721?",date:"2023-06-13T00:00:00.000Z",formattedDate:"June 13, 2023",tags:[{label:"Erc6551",permalink:"/blog/tags/erc-6551"},{label:"Eip",permalink:"/blog/tags/eip"},{label:"Ethereum",permalink:"/blog/tags/ethereum"},{label:"Nft",permalink:"/blog/tags/nft"},{label:"Web Tools",permalink:"/blog/tags/web-tools"}],readingTime:2.99,hasTruncateMarker:!0,authors:[{name:"Push Protocol",url:"https://twitter.com/pushprotocol",imageURL:"/assets/blog/authors/authorpush.png",key:"push"}],frontMatter:{slug:"what-is-erc-6551-and-how-s-it-better-than-erc-721",title:"What is ERC-6551 and How\u2019s It Better than ERC-721?",authors:["push"],image:"./cover-image.png",text:"In 2017, the ERC-721 standard revolutionized the tokenization of digital assets, defining the basic set of rules and functions for creating non-fungible tokens (NFTs). Since then, NFTs have gained significant popularity, transforming how we perceive and interact with digital art, collectibles, virtual real estate, and more.",tags:["Erc6551","Eip","Ethereum","Nft","Web Tools"]},unlisted:!1,prevItem:{title:"$100,000 of Push x ImmuneFi Bug Bounty Program goes Live \ud83e\udeb2",permalink:"/blog/100-000-of-push-x-immune-fi-bug-bounty-program-goes-live"},nextItem:{title:"Unleashing a New Era of Social Networking | Push x SOCLLY\ud83c\udf3f",permalink:"/blog/unleashing-a-new-era-of-social-networking-push-x-soclly"}},h={image:n(46801).Z,authorsImageUrls:[void 0]},l=[{value:"Understanding ERC-6551",id:"understanding-erc-6551",level:2},{value:"How Does ERC-6551 Work?",id:"how-does-erc-6551-work",level:2},{value:"What Are the Core Benefits of ERC-6551 in the NFT Space?",id:"what-are-the-core-benefits-of-erc-6551-in-the-nft-space",level:2},{value:"Enhanced Composability",id:"enhanced-composability",level:3},{value:"On-chain Interactivity",id:"on-chain-interactivity",level:3},{value:"Trackable History",id:"trackable-history",level:3},{value:"Metadata flexibility",id:"metadata-flexibility",level:3},{value:"Potential Use Case Example: In-game enhancements",id:"potential-use-case-example-in-game-enhancements",level:2},{value:"Pushing the Boundaries of ERC-6551 with Push NFT-to-NFT Chat",id:"pushing-the-boundaries-of-erc-6551-with-push-nft-to-nft-chat",level:2}];function c(e){const t={a:"a",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"Cover image of What is ERC-6551 and How\u2019s It Better than ERC-721?",src:n(97914).Z+"",width:"1400",height:"788"})}),"\n",(0,a.jsx)(t.p,{children:"In 2017, the ERC-721 standard revolutionized the tokenization of digital assets, defining the basic set of rules and functions for creating non-fungible tokens (NFTs). Since then, NFTs have gained significant popularity, transforming how we perceive and interact with digital art, collectibles, virtual real estate, and more."}),"\n",(0,a.jsx)(t.p,{children:"However, as the NFT space evolved, it became apparent that the ERC-721 standard had certain limitations. For one, the ERC-721 was not compatible with smart contracts and dApps across Ethereum. Additionally, due to static JSON metadata, ERC-721 tokens are inflexible when it comes to Uniform Resource Identifier (URI) codes, security, and efficiency."}),"\n",(0,a.jsx)(t.p,{children:"Recognizing the need to address these limitations, and enable NFTs to evolve over time, a new standard had to be introduced. Enter the ERC-6551 standard!"}),"\n",(0,a.jsx)(t.h2,{id:"understanding-erc-6551",children:"Understanding ERC-6551"}),"\n",(0,a.jsx)(t.p,{children:"ERC-6551, also known as token-bound accounts (or TBA), builds upon the ERC-721 standard by introducing smart contract capabilities to NFTs."}),"\n",(0,a.jsx)(t.p,{children:"What does this mean?"}),"\n",(0,a.jsx)(t.p,{children:"TBA creates a smart contract wallet for each ERC-721, allowing them to perform transactions, interact with other dApps, hold tokens or other NFTs, or serve as an on-chain identity. TBA is also backward compatible with the ERC-721 standard, meaning that ERC-721 tokens can implement the ERC-6551 standard without requiring any significant modifications."}),"\n",(0,a.jsx)(t.h2,{id:"how-does-erc-6551-work",children:"How Does ERC-6551 Work?"}),"\n",(0,a.jsx)(t.p,{children:"The ERC-6551 standard leverages a permissionless registry that is compatible with existing ERC-721 tokens. This registry serves as a factory and directory for creating and managing token-bound accounts. By calling a function on the registry and paying a small fee, anyone can create a token-bound account for an ERC-721 token. The registry deploys a proxy contract that represents the token-bound account, inheriting all the properties and metadata of the original ERC-721 token."}),"\n",(0,a.jsx)(t.p,{children:"The proxy contract incorporates the EIP-1271 standard, enabling the token-bound account to sign messages and verify signatures on behalf of the NFT. This capability empowers token-bound accounts to interact with other smart contracts, including any dApps on the Ethereum network."}),"\n",(0,a.jsx)(t.h2,{id:"what-are-the-core-benefits-of-erc-6551-in-the-nft-space",children:"What Are the Core Benefits of ERC-6551 in the NFT Space?"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsx)(t.li,{children:"Enhanced Composability"}),"\n",(0,a.jsx)(t.li,{children:"On-chain Interactivity"}),"\n",(0,a.jsx)(t.li,{children:"Trackable History"}),"\n",(0,a.jsx)(t.li,{children:"Metadata flexibility"}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"enhanced-composability",children:"Enhanced Composability"}),"\n",(0,a.jsx)(t.p,{children:"ERC-6551 allows for the bundling of NFTs with related assets, such as tokens or other NFTs, into a single profile. By consolidating tokens, assets, and NFTs within a single TBA, users can effortlessly transfer assets and seamlessly switch between platforms, greatly enhancing their experience."}),"\n",(0,a.jsx)(t.h3,{id:"on-chain-interactivity",children:"On-chain Interactivity"}),"\n",(0,a.jsx)(t.p,{children:"ERC-6551 enables you to use your NFT address as your on-chain identity and hence interact with other on-chain smart contracts and dApps on the Ethereum network. All without relying on a wallet address."}),"\n",(0,a.jsx)(t.h3,{id:"trackable-history",children:"Trackable History"}),"\n",(0,a.jsx)(t.p,{children:"ERC-6551 solves the problem of limited transaction history associated with traditional NFTs. With token-bound accounts, owners can obtain insights into an asset\u2019s transaction history and utility beyond simple proof of ownership. This transparency adds value to NFTs and fosters trust and confidence among collectors and creators."}),"\n",(0,a.jsx)(t.p,{children:"Moreover, based on an NFT\u2019s history, loyalty programs, in-game rewards, airdrops, and more can leverage this new functionality. For lending protocols, this could even facilitate the establishment of credit ratings in the future."}),"\n",(0,a.jsx)(t.h3,{id:"metadata-flexibility",children:"Metadata flexibility"}),"\n",(0,a.jsx)(t.p,{children:"ERC-721 NFTs have immutable JSON metadata. That is, once the NFT is minted the data can\u2019t be changed. Conversely, ERC-6551 NFTs leave room for additional data and values to be added on the token, making them infinitely more flexible."}),"\n",(0,a.jsx)(t.h2,{id:"potential-use-case-example-in-game-enhancements",children:"Potential Use Case Example: In-game enhancements"}),"\n",(0,a.jsx)(t.p,{children:"Prior to the introduction of ERC-6551, players could own their in-game characters as ERC-721 NFTs. However, the assets they collected within the game existed as separate tokens in their wallets."}),"\n",(0,a.jsx)(t.p,{children:"Token-bound accounts change this dynamic by allowing game developers to create \u201cinventories\u201d for players. This means that all game-related assets can be automatically transferred into the character\u2019s wallet, resulting in a smoother user experience. It also enables the creation of in-game user interfaces (UIs) that were previously challenging to implement."}),"\n",(0,a.jsx)(t.p,{children:"While this example is only one way ERC-6551 NFTs can be used, there are many more applications across DeFi, DAOs, and general web3 tools."}),"\n",(0,a.jsxs)(t.p,{children:["To read more about ERC-6551 EIP, you can do so here \ud83d\udc49 ",(0,a.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-6551",children:"https://eips.ethereum.org/EIPS/eip-6551"})]}),"\n",(0,a.jsx)(t.p,{children:"Big congratulations and thank you to the team who helped author this incredible development: Jayden Windle, Benny Giang, Steve Jang, Druzy Downs, Raymond Huynh, Alanah Lam, Wilkins Chung, Paul Sullivan."}),"\n",(0,a.jsx)(t.h2,{id:"pushing-the-boundaries-of-erc-6551-with-push-nft-to-nft-chat",children:"Pushing the Boundaries of ERC-6551 with Push NFT-to-NFT Chat"}),"\n",(0,a.jsx)(t.p,{children:"In addition to the release of ERC-6551, Push NFT Chat is also here, providing even more potential utility for NFTs."}),"\n",(0,a.jsx)(t.p,{children:"Push NFT Chat enables chats to be tied to a specific NFT owned by you, instead of a chat owned by a wallet address. Built as an extension of Push Chat, Push NFT Chat benefits from all the intuitive, user-centric features that Push Chat has while revolutionizing the way NFT holders interact."}),"\n",(0,a.jsx)(t.p,{children:"By introducing web3 native NFT-to-NFT and dApp-to-NFT instant communication, we\u2019ll be adding to the suite of enhancements that the recently launched ERC-6551 is also bringing to NFTs in web3."}),"\n",(0,a.jsxs)(t.p,{children:["More info about Push NFT Chat \ud83d\udc49 ",(0,a.jsx)(t.a,{href:"https://push-protocol.medium.com/introducing-push-nft-chat-chats-and-comms-tied-to-your-nfts-done-right-98717c04438d",children:"https://push-protocol.medium.com/introducing-push-nft-chat-chats-and-comms-tied-to-your-nfts-done-right-98717c04438d"})]}),"\n",(0,a.jsx)(t.p,{children:"ERC-6551 might just be the dawn of a new era of NFTs. This game-changing standard is set to break free from the limitations of static assets, paving the way for dynamic, interconnected digital experiences. As we embrace this new paradigm, we embark on an exciting journey where NFTs shape the future of digital ownership. We\u2019re yet to see the boundless possibilities!"})]})}function d(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},46801:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/cover-image-c8a1d49f5a38ec10e0c802f706bdfc21.png"},97914:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/cover-image-c8a1d49f5a38ec10e0c802f706bdfc21.png"},511151:(e,t,n)=>{n.d(t,{Z:()=>r,a:()=>o});var a=n(667294);const i={},s=a.createContext(i);function o(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);
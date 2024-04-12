"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[68658],{824874:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>h});var a=t(474848),i=t(28453);const o={id:"docs-notifications-tutorial-create-channel",title:"Creating your channel",hide_title:!0,slug:"./create-your-channel",displayed_sidebar:"pushNotificationSidebar",sidebar_position:1,image:"/assets/docs/previews/docs_notifications_tutorial_create_channel--creating_your_channel.png"},s="Creating your Channel",r={id:"notifications/tutorials/docs-notifications-tutorial-create-channel",title:"Creating your channel",description:"Creating a channel is the very first step for sending notifications via Push. Having a Channel is allows you to establish a communication pathway with your users in Web3.",source:"@site/docs/notifications/05-tutorials/01-Tutorial-Create-Channel.mdx",sourceDirName:"notifications/05-tutorials",slug:"/notifications/tutorials/create-your-channel",permalink:"/docs/notifications/tutorials/create-your-channel",draft:!1,unlisted:!1,editUrl:"https://github.com/push-protocol/push-website/blob/main/docs/notifications/05-tutorials/01-Tutorial-Create-Channel.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"docs-notifications-tutorial-create-channel",title:"Creating your channel",hide_title:!0,slug:"./create-your-channel",displayed_sidebar:"pushNotificationSidebar",sidebar_position:1,image:"/assets/docs/previews/docs_notifications_tutorial_create_channel--creating_your_channel.png"},sidebar:"pushNotificationSidebar",previous:{title:"Tutorials",permalink:"/docs/notifications/tutorials"},next:{title:"Enabling channel on other chains",permalink:"/docs/notifications/tutorials/enabling-channel-on-other-chains"}},l={},h=[{value:"Choose your deployment environment",id:"choose-your-deployment-environment",level:2},{value:"Gather channel requirements",id:"gather-channel-requirements",level:2},{value:"Setup channel",id:"setup-channel",level:2},{value:"Step 1\ufe0f\u20e3 - Visit Push dapp",id:"step-1\ufe0f\u20e3---visit-push-dapp",level:3},{value:"Step 2\ufe0f\u20e3 - Connect to Web3",id:"step-2\ufe0f\u20e3---connect-to-web3",level:3},{value:"Step 3\ufe0f\u20e3 - Developers &gt; Create Channel",id:"step-3\ufe0f\u20e3---developers--create-channel",level:3},{value:"Step 4\ufe0f\u20e3 - Understand and fill details (Especially network and channel alias)",id:"step-4\ufe0f\u20e3---understand-and-fill-details-especially-network-and-channel-alias",level:3},{value:"Step 5\ufe0f\u20e3 - Do transactions",id:"step-5\ufe0f\u20e3---do-transactions",level:3},{value:"Step 6\ufe0f\u20e3 - Verify channel on another blockchain",id:"step-6\ufe0f\u20e3---verify-channel-on-another-blockchain",level:3},{value:"Adding Delegates For Channel",id:"adding-delegates-for-channel",level:2},{value:"Step 1\ufe0f\u20e3 - Visit your channel dashboard",id:"step-1\ufe0f\u20e3---visit-your-channel-dashboard",level:3},{value:"Step 2\ufe0f\u20e3 - Add or remove delegates",id:"step-2\ufe0f\u20e3---add-or-remove-delegates",level:3},{value:"About your channel dashboard",id:"about-your-channel-dashboard",level:2}];function c(e){const n={a:"a",admonition:"admonition",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components},{Head:o}=n;return o||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"creating-your-channel",children:"Creating your Channel"}),"\n",(0,a.jsx)(n.p,{children:"Creating a channel is the very first step for sending notifications via Push. Having a Channel is allows you to establish a communication pathway with your users in Web3."}),"\n",(0,a.jsxs)(n.p,{children:["We will be using Push dApp to create your channel for this turotial though you can also do it from ",(0,a.jsx)(n.a,{href:"docs/notifications/build/create-channel/",children:"Push SDK create channel API"})," or directly from the Push protocol smart contracts as well."]}),"\n",(0,a.jsx)(o,{children:(0,a.jsx)("title",{children:"Create Channel | Tutorial | Push Notifications | Push Documentation"})}),"\n",(0,a.jsx)(n.h2,{id:"choose-your-deployment-environment",children:"Choose your deployment environment"}),"\n",(0,a.jsx)(n.p,{children:"You can create your channel on either the staging environment or on the production environment \u2014"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"https://app.push.org/dashboard",children:"Production dApp"})," - The Production dApp is mainly useful for fully functional dapps & smart contracts that are live on the blockchain. Creating your channel on prod requires 50 PUSH, and it's recommended if you have a good user base or active community who wants notifications."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"https://staging.push.org/dashboard",children:"Staging dApp"})," - The Staging dapp is very useful for developers to test out channels, send dummy notifications, and understand the functionalities of the Push protocol."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"gather-channel-requirements",children:"Gather channel requirements"}),"\n",(0,a.jsx)(n.p,{children:"There are six crucial requirements for creating a channel. Make sure you are ready with the below list \ud83d\udc47\ud83c\udffc"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Channel name"}),"\n",(0,a.jsx)(n.li,{children:"Channel logo (an image of size 128px * 128px)"}),"\n",(0,a.jsx)(n.li,{children:"An amount of 50 $PUSH tokens in your wallet (and some ETH)"}),"\n",(0,a.jsx)(n.li,{children:"A brief channel description (250 Characters)"}),"\n",(0,a.jsx)(n.li,{children:"Channel website URL (call to action link)"}),"\n",(0,a.jsx)(n.li,{children:"Additional Network settings (Alias address) - Alias address is the representation of your channel on other selected chains of your choice."}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"The alias address allows you to provide an address that will represent your channel on the other chain selected in the Network dropdown section."}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"Important:"})," The address you pass as an alias, must be your own as it will be further verified as a part of the channel creation process."]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsx)(n.p,{children:"You can pass the same Ethereum (EVM-compatible) address, being used for channel creation, as an alias address for other EVM-compatible chains as well.\nThe Alias address is quite crucial to activate your channel on other chains. Read more about it in page."})}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsx)(n.p,{children:"Note: The channel address is basically the account(wallet) address you use when creating the channel."})}),"\n",(0,a.jsx)(n.h2,{id:"setup-channel",children:"Setup channel"}),"\n",(0,a.jsx)(n.p,{children:"Make sure you are ready with your wallet. Push protocol supports both EOA & Multisig wallets."}),"\n",(0,a.jsx)(n.h3,{id:"step-1\ufe0f\u20e3---visit-push-dapp",children:"Step 1\ufe0f\u20e3 - Visit Push dapp"}),"\n",(0,a.jsxs)(n.p,{children:["Head to the ",(0,a.jsx)(n.a,{href:"https://app.push.org/dashboard",children:"prod dapp"})," or the ",(0,a.jsx)(n.a,{href:"https://staging.push.org/dashboard",children:"staging dapp"})," based on your channel creation requirement."]}),"\n",(0,a.jsx)(n.h3,{id:"step-2\ufe0f\u20e3---connect-to-web3",children:"Step 2\ufe0f\u20e3 - Connect to Web3"}),"\n",(0,a.jsxs)(n.p,{children:["Connect your ",(0,a.jsx)(n.a,{href:"https://metamask.io",children:"Metamask wallet"})," or any other supported wallet!"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Connect your wallet",src:t(951350).A+"",title:"Representation of how to connect your web3 wallet",width:"1000",height:"752"})}),"\n",(0,a.jsx)(n.h3,{id:"step-3\ufe0f\u20e3---developers--create-channel",children:"Step 3\ufe0f\u20e3 - Developers > Create Channel"}),"\n",(0,a.jsx)(n.p,{children:"Once Connected, go to the Developers > Create Channel and fill in the details"}),"\n",(0,a.jsx)(n.admonition,{type:"caution",children:(0,a.jsx)(n.p,{children:"Currently, Channel Alias is the only way to enable multi-chain communication and it is immutable. It's heavily recommended to understand it and set it up as part of channel creation."})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Create your channel",src:t(249081).A+"",title:"Representation of how to start creating your channel",width:"1000",height:"907"})}),"\n",(0,a.jsx)(n.p,{children:"If you are on a staging environment, don't forget to mint:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Get Sepolia ETH from ",(0,a.jsx)(n.a,{href:"https://sepoliafaucet.com/",children:"Alchemy Faucet"})]}),"\n",(0,a.jsxs)(n.li,{children:["Get Sepolia ETH by joining ",(0,a.jsx)(n.a,{href:"https://discord.gg/pushprotocol",children:"Push Discord"})," > Asking an admin"]}),"\n",(0,a.jsxs)(n.li,{children:["Get Sepolia PUSH from ",(0,a.jsx)(n.a,{href:"https://sepolia.etherscan.io/token/0x37c779a1564DCc0e3914aB130e0e787d93e21804#writeContract#F5",children:"Push Testnet Contract"})]}),"\n",(0,a.jsxs)(n.li,{children:["Get Testnet Matic from ",(0,a.jsx)(n.a,{href:"https://faucet.polygon.technology/",children:"Polygon Faucet"})]}),"\n"]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["Faucets giving you trouble? Head to our ",(0,a.jsx)(n.a,{href:"https://discord.gg/pushprotocol",title:"Join Push Discord channel",children:"Push Discord"})," and ask an admin to send you some."]})}),"\n",(0,a.jsx)(n.h3,{id:"step-4\ufe0f\u20e3---understand-and-fill-details-especially-network-and-channel-alias",children:"Step 4\ufe0f\u20e3 - Understand and fill details (Especially network and channel alias)"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Fill in your channel details",src:t(528640).A+"",title:"Representation of details you need to fill for your channel including channel alias",width:"1000",height:"1298"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"What is a channel alias address?"})}),"\n",(0,a.jsx)(n.p,{children:"An alias address is required to enable your channel on other chains so that they are capable of triggering notifications on other chains apart from the Ethereum chain only."}),"\n",(0,a.jsx)(n.p,{children:"For instance, if you wish to send a notification on the polygon chain, provide the alias address of your channel on Polygon chain. Alternatively, you may choose to keep it blank if you only wish to send notifications on the Ethereum chain itself."}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsx)(n.p,{children:"Channel Alias is only shown if you switch to any other network than Ethereum. This means that your channel will be able to send notifications on both Ethereum and the other blockchains which you select!"})}),"\n",(0,a.jsx)(n.h3,{id:"step-5\ufe0f\u20e3---do-transactions",children:"Step 5\ufe0f\u20e3 - Do transactions"}),"\n",(0,a.jsx)(n.p,{children:"You will need to do two transactions (and optionally the third one if you are creating a multi-chain channel, more on that in step 6)."}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"Approval of PUSH tokens"})," -> This transaction ensures that your wallet address has successfully approved the Push core contract to use 50 PUSH tokens on your behalf."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"Channel Creation on Push Core"})," -> Once approved, the 2nd transaction calls the channel creation function on Push core contract to create the channel."]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Confirm transactions for your channel creation",src:t(564723).A+"",title:"Representation of confirm transactions screen during your channel creation process",width:"1062",height:"660"})}),"\n",(0,a.jsx)(n.h3,{id:"step-6\ufe0f\u20e3---verify-channel-on-another-blockchain",children:"Step 6\ufe0f\u20e3 - Verify channel on another blockchain"}),"\n",(0,a.jsx)(n.p,{children:"If you have created a multichain channel then you need to switch to that blockchain network and do another tx that verifies your channel on that network."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Verify channel on other blockchain",src:t(833743).A+"",title:"Representation of how to verify channel on other blockchain",width:"1386",height:"1010"})}),"\n",(0,a.jsx)(n.h2,{id:"adding-delegates-for-channel",children:"Adding Delegates For Channel"}),"\n",(0,a.jsx)(n.p,{children:"Delegate addresses enable another address to send a notification on a channel's behalf. A channel can add (or remove) multiple delegate addresses."}),"\n",(0,a.jsxs)(n.p,{children:["Adding channel delegates is a protocol level call but the recommended way to do it is via our dApp or via ",(0,a.jsx)(n.a,{href:"/docs/notifications/build/channel-delegates",title:"API for adding channel delegates",children:"Push SDK Channel Delegates API"}),"."]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsx)(n.p,{children:"Delegate addresses are useful to ensure notifications can be sent out from other wallets apart from the one that created the channel. The channel creator is the only one who is able to add or remove a delegate at any time."})}),"\n",(0,a.jsx)(n.h3,{id:"step-1\ufe0f\u20e3---visit-your-channel-dashboard",children:"Step 1\ufe0f\u20e3 - Visit your channel dashboard"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Adding or removing delegates",src:t(103860).A+"",title:"Representation of how a developer can add or remove delegates from their channel via channel dashboard",width:"2684",height:"1510"})}),"\n",(0,a.jsx)(n.h3,{id:"step-2\ufe0f\u20e3---add-or-remove-delegates",children:"Step 2\ufe0f\u20e3 - Add or remove delegates"}),"\n",(0,a.jsx)(n.p,{children:"To add or remove the delegates, tap on the three dots at the top right of your channel dashboard and choose the appropriate option."}),"\n",(0,a.jsx)(n.h2,{id:"about-your-channel-dashboard",children:"About your channel dashboard"}),"\n",(0,a.jsx)(n.p,{children:"After successful channel creation, the Push dApp will start showing the channel's profile Page. There are a few details about this page listed below for your reference;"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Explore your channel",src:t(571298).A+"",title:"Representation of how channel dashboard looks to the developer after channel is successfully created",width:"1556",height:"1192"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"This Channel Profile page shall only be visible to the Creator of the Channel."}),"\n",(0,a.jsx)(n.li,{children:"The Channel Profile page allows the channel owner to trigger notifications to its subscribers via the dApp."}),"\n",(0,a.jsx)(n.li,{children:"This page also gives the channel owner access to the Settings button through which the channel owner can perform multiple actions, such as adding a delegate notification sender for the channel, removing a delegate, deactivating the channel, etc."}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Alright, now that you own a Channel, start using it to send web3 native notifications to your subscribers and establish better communications in the Web3 world \ud83e\udd73"})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},103860:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/channelDelegates-377a420919f07d97b0a6154c2ff641ab.png"},564723:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/confirmTransaction-8436184b9008360dff9e8a9a429c9a5f.png"},951350:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/connectWallet-376cc913f3f25695642d62e0c7a6c5a4.png"},528640:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/createChannelAlias-c1a34948297f0a57e7fd0cab29d7963c.png"},249081:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/createYourChannel-8be99d22d4f0cf7243271a0f1c765fb3.png"},571298:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/knowYourChannel-17e31e6207fc2bada43d2874e0da6eab.png"},833743:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/verifyChannel-616ea1436d842166345454cbf8ffe2fa.png"},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>r});var a=t(296540);const i={},o=a.createContext(i);function s(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);
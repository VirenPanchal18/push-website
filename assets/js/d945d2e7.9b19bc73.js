"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[35209],{778e3:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>l,frontMatter:()=>o,metadata:()=>c,toc:()=>h});var s=t(474848),i=t(28453);t(113490);const o={slug:"the-developer-guide-to-enabling",title:"The Developer guide to enabling Opt-into EPNS channels via the front-end sdk.",description:"The Developer guide to enabling Opt-into EPNS channels via the front-end sdk.",authors:["push"],image:"./cover-image.webp",text:"Your users subscribe to your channel via our dApp, want to move this functionality to your dApp? Here\u2019s a definitive guide on how to do it.",tags:["Ethereum","Defi","Epnsproject","Newsletter","Blockchain"]},r="EPNS Integration",c={permalink:"/blog/the-developer-guide-to-enabling",source:"@site/blog/2022-03-21-the-developer-guide-to-enabling/index.md",title:"The Developer guide to enabling Opt-into EPNS channels via the front-end sdk.",description:"The Developer guide to enabling Opt-into EPNS channels via the front-end sdk.",date:"2022-03-21T00:00:00.000Z",formattedDate:"March 21, 2022",tags:[{label:"Ethereum",permalink:"/blog/tags/ethereum"},{label:"Defi",permalink:"/blog/tags/defi"},{label:"Epnsproject",permalink:"/blog/tags/epnsproject"},{label:"Newsletter",permalink:"/blog/tags/newsletter"},{label:"Blockchain",permalink:"/blog/tags/blockchain"}],readingTime:2.71,hasTruncateMarker:!0,authors:[{name:"Push Protocol",url:"https://twitter.com/pushprotocol",imageURL:"/assets/blog/authors/authorpush.png",key:"push"}],frontMatter:{slug:"the-developer-guide-to-enabling",title:"The Developer guide to enabling Opt-into EPNS channels via the front-end sdk.",description:"The Developer guide to enabling Opt-into EPNS channels via the front-end sdk.",authors:["push"],image:"./cover-image.webp",text:"Your users subscribe to your channel via our dApp, want to move this functionality to your dApp? Here\u2019s a definitive guide on how to do it.",tags:["Ethereum","Defi","Epnsproject","Newsletter","Blockchain"]},unlisted:!1,prevItem:{title:"EPNS and Flipside Crypto Join Forces to Facilitate Push Notifications for Users",permalink:"/blog/epns-and-flipside-crypto-join-forces"},nextItem:{title:"EPNS at ETHDenver 2022: A Throwback",permalink:"/blog/epns-at-ethdenver-2022-a-throwback"}},a={image:t(805794).A,authorsImageUrls:[void 0]},h=[{value:"Subscribing to the channel",id:"subscribing-to-the-channel",level:2},{value:"Step 5:",id:"step-5",level:2},{value:"Putting it all together",id:"putting-it-all-together",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Cover image of The Developer guide to enabling Opt-into EPNS channels via the front-end sdk.",src:t(503086).A+"",width:"1400",height:"700"})}),"\n",(0,s.jsxs)(n.p,{children:["EPNS is an open-source, decentralized notification protocol. The protocol went live on ",(0,s.jsx)(n.a,{href:"https://medium.com/ethereum-push-notification-service/the-epns-mainnet-is-here-470faec0c01",children:"Ethereum Mainnet on Jan 11th"})," and it now has 19 official channels by major projects in Web3 including ENS, MakerDAO, Coindesk and dYdX."]}),"\n",(0,s.jsxs)(n.p,{children:["Any service, protocol, or individual who wants to include the functionality to include notifications in their dApp could follow this guide. ",(0,s.jsx)(n.strong,{children:"In this post, we\u2019ve made it easy to learn how to get started."})]}),"\n",(0,s.jsxs)(n.p,{children:["The initial step for EPNS integration is ",(0,s.jsx)(n.strong,{children:"channel creation"}),". Here is the ",(0,s.jsx)(n.a,{href:"https://medium.com/ethereum-push-notification-service/getting-started-with-epns-ca2dd7f43329",children:(0,s.jsx)(n.strong,{children:"step-by-step guide on how to create a channel"})}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Once the channel is created, the channel owner could start sending notifications from the dApp and receive notifications on all of the EPNS platforms \u2014 dApp, Android App, iOS App, Browser Extension, and the users would have to subscribe on our dApp, but after this integration, you would be able to perform that very functionality on your dApp."}),"\n",(0,s.jsx)(n.h1,{id:"integrating-with-the-frontend-sdk",children:"Integrating with the Frontend SDK"}),"\n",(0,s.jsx)(n.p,{children:"Front-end SDK allows developers & protocols to integrate the notifications to their dApp or mobile app, we would specifically be focusing on the channel module of it."}),"\n",(0,s.jsx)(n.p,{children:"This module comprises of three sub-modules majorly:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Opt in and out to a channel from the SDK"}),"\n",(0,s.jsx)(n.li,{children:"Fetching the details of a channel by using it\u2019s address as an identifier."}),"\n",(0,s.jsx)(n.li,{children:"Find out if a user is subscribed to a channel."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Here is how you can integrate your React Frontend Dapp with EPNS Decentralized notification service:"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Step 1:"})," Install the npm package"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"npm install @epnsproject/frontend-sdk\n"})}),"\n",(0,s.jsx)(n.h2,{id:"subscribing-to-the-channel",children:"Subscribing to the channel"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Step 2:"})," Import the channels module from the package."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'import { channels } from "@epnsproject/frontend-sdk-staging";\n'})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Step 3:"})," Define the required variables to make a request to fetch some notifications!"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'const { library, active, account, chainId } = useWeb3React();const signer = library.getSigner(account); //this could also be any entity which has a method \\`\\_signTypedData(domain, type, message)\\` which is capable of signing messages using eip 712.const channelAddress = "0x94c3016ef3e503774630fC71F59B8Da9f7D470B7"; //the address of the channel we want to op-in to or opt-out fromconst chainId = 1; //this is for the ethereum network, and can be any of out supported chains.const userAddress = "0x57c1D4dbFBc9F8cB77709493cc43eaA3CD505432";\n'})}),"\n",(0,s.jsxs)(n.p,{children:["it is worth noting that the *signer* variable could be gotten through other means, for more information on the signer object, please refer to ",(0,s.jsx)(n.a,{href:"https://docs.ethers.io/v5/api/signer/#Signer",children:"this article."})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Step 4:"})," Opt in-to or out-of the channel!"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'const epnsSubscribe = () => {\n     await channels.optIn(\n         [signer](https://docs.ethers.io/v5/api/signer/),\n         channelAddress,\n         chainId,\n         userAddress,\n         {\n            onSuccess: () => "so something"  // do something after success\n         }\n    )}\nconst epnsUnSubscribe = () => {\n     await channels.optOut(\n         [signer](https://docs.ethers.io/v5/api/signer/),\n         channelAddress,\n         chainId,\n         userAddress,\n         {\n            onSuccess: () => "do something"  // do something after success\n         }\n    )}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"step-5",children:"Step 5:"}),"\n",(0,s.jsx)(n.p,{children:"Check if the user is subscribed to the current channel, in order to know if to subscribe to the user or unsubscribe them."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"const \\[isSubscribed, setIsSubscribed\\] = useState(false);\nchannels.isUserSubscribed(userAddress, channelAddress)\n.then((res) => {\n      setIsSubscribed(res);\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"putting-it-all-together",children:"Putting it all together"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Step 6:"})," Finally, we proceed to combine all the above into a coherent code."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'import { useEffect, useState } from "react";\nimport { useWeb3React } from "[@web3](http://twitter.com/web3)\\-react/core";\nimport { channels } from "[@epnsproject/frontend-sdk-staging](https://github.com/push-protocol/push-sdk)";\nimport ConnectButton from "./components/connect";\nimport "./App.scss";const CHANNEL\\_ADDRESS = "0x94c3016ef3e503774630fC71F59B8Da9f7D470B7";function App() {\n  const { library, active, account, chainId } = useWeb3React();// create state components to fetch all the notifications.\n  const \\[isSubscribed, setIsSubscribed\\] = useState(false);// channel details\n  const \\[channel, setChannel\\] = useState(null);\n  // load channel details on start\n  useEffect(() => {\n    if (!account) return;\n    // on page load, fetch channel details\n    channels.getChannelByAddress(CHANNEL\\_ADDRESS).then((data) => {\n      setChannel(data);\n    });\n    // fetch if user is subscribed to channel\n    channels.isUserSubscribed(account, CHANNEL\\_ADDRESS).then((res) => {\n      console.log(res);\n      setIsSubscribed(res);\n    });\n  }, \\[account\\]);const epnsSubscribe = () => {\n     await channels.optIn(\n         [signer](https://docs.ethers.io/v5/api/signer/),\n         channelAddress,\n         chainId,\n         userAddress,\n         {\n            onSuccess: () => "so something"  // do something after success\n         }\n    )}\nconst epnsUnSubscribe = () => {\n     await channels.optOut(\n         [signer](https://docs.ethers.io/v5/api/signer/),\n         channelAddress,\n         chainId,\n         userAddress,\n         {\n            onSuccess: () => "do something"  // do something after success\n         }\n    )}return (\n    <div className="App">\n      {/\\* define the header \\*/}\n      <h2 className="App\\_\\_header">\n        <span> EPNS Playground </span>\n        <ConnectButton />\n      </h2>\n      {/\\* define the header \\*/}{active ? (\n        <>\n          {/\\* section for channels \\*/}\n          {channel && (\n            <div>\n              <h3>Sample clear\n                code Channel</h3>\n              <div className="sample\\_\\_channel">\n                <div>\n                  <img src={channel.icon} className="channel\\_\\_image" />\n                  <h2>{channel.name}</h2>\n                </div>\n                <div\n                  onClick={() => {\n                    isSubscribed\n                      ? epnsUnSubscribe()\n                      : epnsSubscribe()\n                  }}\n                  className="subscribebutton"\n                >\n                  {isSubscribed ? "unsubscribe" : "subscribe"}\n                </div>\n              </div>\n            </div>\n          )}\n          {/\\* section for channels \\*/}</>\n      ) : (\n        <p>Please connect to your wallet on the kovan test network to proceed</p>\n      )}\n    </div>\n  );\n}export default App;\n'})}),"\n",(0,s.jsx)(n.h1,{id:"link-to-github-code-with-a-working-example",children:"Link to GitHub code with a working example"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/push-protocol/push-opt-demo",children:"https://github.com/push-protocol/push-opt-demo"})}),"\n",(0,s.jsx)(n.h1,{id:"mainnet-urls",children:"Mainnet URLs"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"EPNS dapp"})," -",(0,s.jsx)(n.a,{href:"https://app.epns.io/",children:"https://app.epns.io/"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Front-end SDK"})," \u2014 ",(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@epnsproject/frontend-sdk",children:"https://www.npmjs.com/package/@epnsproject/frontend-sdk"})]}),"\n",(0,s.jsx)(n.h1,{id:"testnet-urls",children:"Testnet URLs"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"EPNS Staging dapp"})," -",(0,s.jsx)(n.a,{href:"https://staging-app.epns.io/",children:"https://staging-app.epns.io/"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Front-end SDK Staging"})," -",(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@epnsproject/frontend-sdk-staging",children:"https://www.npmjs.com/package/@epnsproject/frontend-sdk-staging"})]}),"\n",(0,s.jsxs)(n.p,{children:["Follow us to stay up to date: ",(0,s.jsx)(n.a,{href:"https://twitter.com/epnsproject",children:"Twitter"}),", ",(0,s.jsx)(n.a,{href:"https://discord.gg/YVPB99F9W5",children:"Discord"}),", ",(0,s.jsx)(n.a,{href:"https://t.me/epnsproject",children:"Telegram"}),"."]})]})}function l(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},805794:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/cover-image-81e314c31c518944e9e9f1d301b5420f.webp"},503086:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/cover-image-81e314c31c518944e9e9f1d301b5420f.webp"},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>c});var s=t(296540);const i={},o=s.createContext(i);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);
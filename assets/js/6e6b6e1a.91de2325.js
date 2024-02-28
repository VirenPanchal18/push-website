"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[79344],{426096:e=>{e.exports=JSON.parse('{"title":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","description":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","frontMatter":{"slug":"epns-x-the-graph","title":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","description":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","authors":["push"],"image":"./cover-image.webp","text":"EPNS and H2O collaborate to bring decentralized push notifications to the platform.","tags":["Defi","Ethereum","Blockchain","Epnsproject"]},"content":{"id":"epns-x-the-graph","metadata":{"permalink":"/blog/epns-x-the-graph","source":"@site/blog/2022-06-05-epns-x-the-graph/index.md","title":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","description":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","date":"2022-06-05T00:00:00.000Z","formattedDate":"June 5, 2022","tags":[{"label":"Defi","permalink":"/blog/tags/defi"},{"label":"Ethereum","permalink":"/blog/tags/ethereum"},{"label":"Blockchain","permalink":"/blog/tags/blockchain"},{"label":"Epnsproject","permalink":"/blog/tags/epnsproject"}],"readingTime":3.1766666666666667,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"epns-x-the-graph","title":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","description":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","authors":["push"],"image":"./cover-image.webp","text":"EPNS and H2O collaborate to bring decentralized push notifications to the platform.","tags":["Defi","Ethereum","Blockchain","Epnsproject"]},"unlisted":false,"prevItem":{"title":"EPNS and H2O Ally to Enable Seamless Communication for Users","permalink":"/blog/epns-and-h20-ally"},"nextItem":{"title":"EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14","permalink":"/blog/epns-x-the-graph-enabling-a-better-way-to-access-blockchain-data"}},"content":"import { ImageText } from \'@site/src/css/SharedStyling\';\\n\\n![Cover image of EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14](./cover-image.webp)\\n\\n\x3c!--truncate--\x3e\\n\\nAs the blockchain ecosystem has grown, so too has the challenge of accessing on-chain data across multiple blockchain networks. The Graph is an indexing protocol that indexes, organises and makes data accessible from networks like Ethereum and IPFS It is often referred to as \u201cGoogle\u201d for the blockchains. As more and more data finds its way on-chain, users and developers need to access organised data efficiently.\\n\\nToday, EPNS is excited to announce integration of The Graph to combine the power of subgraphs with notifications! The integration leverages a core EPNS feature that enables developers to establish customised notifications and \u201ccall to actions\u201d so they can more easily access data.\\n\\n### About EPNS X The Graph Integration\\nBefore we dive into the integration, let\u2019s give you an overview of what each one of us have been doing to give you a better understanding of how this integration works, who it is targeted to, and what benefits users will gain.\\n\\n#### About Ethereum Push Notification Service (EPNS)\\n\\nEPNS is a decentralised communication protocol for web3! It allows any dapp, smart contract, backend or protocol to send communication directly to user wallet addresses in an open, gasless, and platform-agnostic fashion.\\n\\n#### About The Graph\\n\\nThe Graph is the indexing and query layer of web3. Developers build and publish open APIs, called subgraphs, that applications can query using GraphQL. Tens of thousands of developers use The Graph for applications such as Uniswap, Synthetix, KnownOrigin, Art Blocks, Gnosis, Balancer, Livepeer, DAOstack, Audius, Decentraland, and many others.\\n\\nNow, back to the <b>EPNS x The Graph</b> integration and how it helps. Until this integration, channel creators or developers have to:\\n\\n1. Create a channel, which is mandatory.\\n2. Once a channel is created, you will need to send out notifs, for which you have to set/define logics at the back end.\\n\\nTo send notifs on your channel, there were two methods which you can use:\\n\\n1. Using the backend SDK ([Showrunners Framework](https://medium.com/ethereum-push-notification-service/epns-showrunners-framework-and-backend-sdk-beta-v1-0-are-live-7348c0725a12))\\n2. Using [smart contracts](https://docs.epns.io/developers/developer-zone/examples/smart-contracts-example)\\n\\nHowever to do so, both methods required a decent amount of development work to code the logic using the SDKs.\\n\\nWith The Graph integration, you\u2019ll now be able to send EPNS notifications directly from your subgraph. With this new integration using the subgraph and EPNS, we are simplifying the process and minimising the need for extra development.\\n\\n![First image of EPNS x The Graph: Enabling a better way to access blockchain data \ud83e\uddd1\u200d\ud83d\ude80 \ud83d\udd14](./image-1.webp)\\n<ImageText>High level integration diagram</ImageText>\\n\\nTo expand on this, let\u2019s take a look at how this feature and integration is enabling a better way to access indexed data from the blockchain to send notifications.\\n\\n#### What does The Graph help with?\\n- The biggest pain point you are able to address via The Graph is fetching data from the blockchain and customising it the way you want. Typically, if you were trying to do this directly from the blockchain, it would be very inefficient.\\n- There hasn\u2019t been a specific aggregator to check/run queries of all transactions in one place. And that\u2019s where The Graph comes in. Using a subgraph, you can define how you want to see your data, automatically indexing each block from the blockchain.\\n- Mainly querying data via a backend from the blockchain takes a lot of time and is a centralised approach, and that\u2019s something that subgraphs help with\\n- Subgraphs also have the ability to index different blockchains. Community members can directly query the data from the subgraph.\\n\\n#### Where does EPNS come in?\\n- Using EPNS, developers can get notifications via their channels on EPNS, and get better access to the indexed data created via their subgraphs with this new integration.\\n- If your channel doesn\u2019t have a subgraph, you can first define that in a subgraph and then further use this new feature to send notifs as per your logic.\\n- Illustrating via an example, if you\u2019ve deployed a Uniswap contract and a swap\u2019s happening, then the developer can define an action as to what should happen if a swap event has happened. And accordingly push notifications for them.\\n- The integration eases the process, reduces the time of sending custom notifs by simply integrating the subgraph without the need of a server or spending too much time coding your own logic at the back end.\\n\\n#### Benefits of the EPNS x The Graph integration\\n- With this integration, notifications can directly be triggered from a subgraph(see our [lightpaper](https://medium.com/ethereum-push-notification-service/ethereum-push-notification-service-litepaper-e7ca0a662862) for definitions of channels, services, and more)\\n- Developers can use all the power and flexibility of subgraphs and use that as the logic for their notifications.\\n\\nNote: Subgraph integration is available on staging right now.\\n\\n<blockquote><i>\\n\\nReal-time push notifications were for a long time a missing part in the web3 stack. EPNS solves this with a decentralised notification system. Thanks to the integration with The Graph it is much easier to send those notifications to users. A subgraph can now be used as the trigger for notifications. This is very convenient for dapps which already have a subgraph and I also expect that this will become the default setup in the future. \u2014 \\n<b>Simon Emanuel Schmid, Solutions Engineer at Edge & Node working on The Graph</b>\\n\\nWith growing adoption of decentralised infrastructure, simplifying data and making it accessible for users will be key. We see The Graph and EPNS as a great opportunity to bring the most seamless user experience to dapp developers. We are looking forward to working with The Graph team to make the decentralised network even stronger with this integration. \u2014 <b>Harsh Rajat, EPNS founder</b>\\n\\n</i></blockquote>"}}')}}]);
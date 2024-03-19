"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[87002],{695596:e=>{e.exports=JSON.parse('{"title":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","description":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","frontMatter":{"slug":"how-to-implement-gasless-vote","title":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","description":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","authors":["push"],"image":"./cover-image.webp","text":"Last month we released the gas-free vote delegation offer and planned to run it for the whole month of March with the option to extend. Today we\u2019re happy to share that this offer will be available to a wider set of users for a longer period of time. Details below.","tags":["Blockchain","Governance","Epnsproject","Delegation","Vote"]},"content":{"id":"how-to-implement-gasless-vote","metadata":{"permalink":"/blog/how-to-implement-gasless-vote","source":"@site/blog/2022-04-05-how-to-implement-gasless-vote/index.md","title":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","description":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","date":"2022-04-05T00:00:00.000Z","formattedDate":"April 5, 2022","tags":[{"label":"Blockchain","permalink":"/blog/tags/blockchain"},{"label":"Governance","permalink":"/blog/tags/governance"},{"label":"Epnsproject","permalink":"/blog/tags/epnsproject"},{"label":"Delegation","permalink":"/blog/tags/delegation"},{"label":"Vote","permalink":"/blog/tags/vote"}],"readingTime":2.5433333333333334,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"how-to-implement-gasless-vote","title":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","description":"How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance","authors":["push"],"image":"./cover-image.webp","text":"Last month we released the gas-free vote delegation offer and planned to run it for the whole month of March with the option to extend. Today we\u2019re happy to share that this offer will be available to a wider set of users for a longer period of time. Details below.","tags":["Blockchain","Governance","Epnsproject","Delegation","Vote"]},"unlisted":false,"prevItem":{"title":"EPNS Collaboration With New Order Will Bring Push Notifications to its Venture DAO Governance","permalink":"/blog/epns-collaborates-with-new-order"},"nextItem":{"title":"The All-New EPNS Dapp UI is finally here","permalink":"/blog/the-all-new-epns-dapp-ui"}},"content":"import { ImageText } from \'@site/src/css/SharedStyling\';\\n\\n![Cover image of How to Implement Gasless Vote Delegation \u2014 A novel feature for Governance](./cover-image.webp)\\n\\n\x3c!--truncate--\x3e\\n\\n\\n### Gasless Delegation Period Extended!\\n\\nLast month we released the gas-free vote delegation offer and planned to run it for the whole month of March with the option to extend. Today we\u2019re happy to share that this offer will be available to a wider set of users for a longer period of time. Details below.\\n\\n*   Reduced minimum token holding for eligibility from 250 $PUSH to 100.\\n*   The eligibility period has been extended for the whole month of April.\\n\\nAll other details will remain the same as of now.\\n\\nVote Delegation\\n---------------\\n\\nVote delegation is a novel feature that is enabled in the PUSH token contract, keeping in mind the idea to grow a strong community that acts in the best interest of the protocol. `PUSH` allows its token holders to **delegate** their voting rights to an address of their choice.\\n\\nVote delegation is creating a strong barrier for the majority of token holders as it requires ETH to cover gas-fee to execute the `delegate` on-chain transaction.\\n\\nAs the DAO landscape is going through immense experimentation and innovation to address the pressing problems, we came up with the **Gasless Vote Delegation** feature as a solution to voter apathy. We launched the feature a month ago and would like to share our insights and feedback received since its release.\\n\\nGasless Delegation\\n------------------\\n\\nThe goal of this initiative is to make voting an accessible activity to every PUSH token holder. Holders currently have a few ways to activate their voting power, and many of those ways are already incentivized with users receiving $PUSH token rewards!\\n\\nWith this feature token holders can delegate their voting power, free of gas cost. From our PUSH Governance dashboard, a token holder would just have to sign the delegate transaction.\\n\\nAs this feature rollout was an experiment, we took precautions from exploitations by enabling few barriers.\\n\\n*   This feature is accessible to everyone holding at least 250 PUSH.\\n*   A unique wallet address would be able to use the gasless delegation feature once in 7 days.\\n\\nHow to implement Gasless Vote Delegation\\n----------------------------------------\\n\\nAfter the implementation of the Gasless Vote Delegation, we see this to be a much better delegation architecture for holders than them delegating votes on-chain. Hence we are releasing this article & making the repositories public so that any DAOs out there could explore & implement the feature without much difficulty.\\n\\n**A high-level overview of the steps involved for a delegator**\\n\\n1.  Click on _Delegate_ from [Push Governance Dashboard](https://incentives.epns.io/)\\n2.  Sign the delegate parameters needed for _delegateBySig_ contract function\\n3.  The backend verifies the signature by leveraging EIP712 & does the backend checks.\\n4.  The backend wallet pays for the transaction.\\n\\nEIP-712 is a more advanced and safer signature method. It is a standard for hashing and signing typed structured data. Gasless delegation is implemented using EIP-712.\\n\\nHow the frontend works\\n----------------------\\n\\n[Frontend repository](https://github.com/ethereum-push-notification-service/epns-incentives-dapp)\\n\\n1.  Sign the delegate parameters needed for _delegateBySig_ contract function\\n\\n```\\nconst domain = {  \\n name: contractName,  \\n chainId: chainId,  \\n verifyingContract: contractAddress  \\n}const types = {  \\n Delegation: \\\\[  \\n  { name: \\"delegatee\\", type: \\"address\\" },  \\n  { name: \\"nonce\\", type: \\"uint256\\" },  \\n  { name: \\"expiry\\", type: \\"uint256\\" },  \\n \\\\]  \\n}const value = {  \\n \'delegatee\': newDelegatee.toString(),  \\n \'nonce\': nonce.toString(),  \\n \'expiry\': expiry.toString()  \\n}signature = await signerObject.\\\\_signTypedData(domain, types, value);\\n```\\n\\n2\\\\. Check whether the gasEstimate for the transaction is less than or equal to GAS\\\\_LIMIT.\\n\\n```\\nconst gasPrice = await EPNSCoreHelper.getGasPriceInDollars(library);  \\nconst totalCost = gasPrice \\\\* gasEstimate;  \\nif(totalCost > GAS\\\\_LIMIT){  \\n return \\"Gas Price is too high, Please try again in a while.\\"  \\n}\\n```\\n\\n3\\\\. Call the Delegate API\\n\\n```\\nawait postReq(\\"/gov/gasless\\\\_delegate\\", { delegator: account, signature: signature, delegatee: delegatee, nonce: nonce.toString(), expiry: expiry })\\n```\\n\\nHow the backend works\\n---------------------\\n\\n[Backend repository](https://github.com/ethereum-push-notification-service/epns-incentives-backend)\\n\\nOnce the incentives frontend triggers the Delegate API, the following conditions are checked before proceeding to pay for the delegation from the backend wallet.\\n\\n1.  ETH balance of the backend wallet must be greater than the WALLET\\\\_THRESHOLD\\n\\n```\\nbalance > WALLET\\\\_THRESHOLD\\n```\\n\\n2\\\\. PUSH Balance of the delegator must be greater than the PUSH\\\\_THRESHOLD\\n\\n```\\npushBalance > PUSH\\\\_THRESHOLD\\n```\\n\\n3\\\\. The delegator must not have attempted the Gasless Delegation feature in the past 7 days.\\n\\n```\\ndays > 7\\n```\\n\\nOnce these conditions are met, the delegation transaction is initiated from the backend wallet.\\n\\n1.  Split the signature and extract v, r & s\\n2.  Initiate the _delegateBySig_ contract call\\n\\n**Note:** We released this feature on an experimental basis. Please DYOR before implementing this feature."}}')}}]);
"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[4840],{480824:e=>{e.exports=JSON.parse('{"title":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","description":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","frontMatter":{"slug":"defi-forensics-harvest-finance","title":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","description":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","authors":["push"],"image":"./cover-image.webp","text":"Hello and Welcome to DeFi Forensics. DeFi forensics will put the magnifying glass on various DeFi Projects and explore, breakdown, and analyze some of the recent happenings, exploits, and \u201ctragedies\u201d that have shaken the DeFi space. We all know that DeFi never sleeps and that something or the other is always happening in this fast-paced space.","tags":["Defi","Case Study","Cryptocurrency","Hacking","Blog"]},"content":{"id":"defi-forensics-harvest-finance","metadata":{"permalink":"/blog/defi-forensics-harvest-finance","source":"@site/blog/2020-10-29-defi-forensics-harvest-finance/index.md","title":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","description":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","date":"2020-10-29T00:00:00.000Z","formattedDate":"October 29, 2020","tags":[{"label":"Defi","permalink":"/blog/tags/defi"},{"label":"Case Study","permalink":"/blog/tags/case-study"},{"label":"Cryptocurrency","permalink":"/blog/tags/cryptocurrency"},{"label":"Hacking","permalink":"/blog/tags/hacking"},{"label":"Blog","permalink":"/blog/tags/blog"}],"readingTime":4.003333333333333,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"defi-forensics-harvest-finance","title":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","description":"DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance","authors":["push"],"image":"./cover-image.webp","text":"Hello and Welcome to DeFi Forensics. DeFi forensics will put the magnifying glass on various DeFi Projects and explore, breakdown, and analyze some of the recent happenings, exploits, and \u201ctragedies\u201d that have shaken the DeFi space. We all know that DeFi never sleeps and that something or the other is always happening in this fast-paced space.","tags":["Defi","Case Study","Cryptocurrency","Hacking","Blog"]},"unlisted":false,"prevItem":{"title":"Ethereum Push Notification Service (EPNS) Litepaper","permalink":"/blog/epns-litepaper"},"nextItem":{"title":"13 DeFi Notifications Ethereum Needs Today","permalink":"/blog/13-defi-notifications-ethereum-needs-today"}},"content":"import { ImageText } from \'@site/src/css/SharedStyling\';\\n\\n![Cover Image of DeFi Forensics\ud83d\udd75\ufe0f\u200d\ufe0f- HARVEST Finance](./cover-image.webp)\\n\\n\x3c!--truncate--\x3e\\n\\nPutting the latest DeFi events under the magnifying glass \ud83d\udd0d\\n\\n**_Hello and Welcome to DeFi Forensics. DeFi forensics will put the magnifying glass on various DeFi Projects and explore, breakdown, and analyze some of the recent happenings, exploits, and \u201ctragedies\u201d that have shaken the DeFi space. We all know that DeFi never sleeps and that something or the other is always happening in this fast-paced space._**\\n\\n**_Previously we had gone over the YAM protocol and its downfall, although not in a DeFi Forensics way, it sure is worth the_** [**_read_**](https://medium.com/ethereum-push-notification-service/how-decentralised-notifications-can-revolutionize-on-chain-governance-part-i-ff09e7465279)**_._**\\n\\nIn this article, we will be putting our magnifying glass on [Harvest Finance](https://harvest.finance) and its recent hack worth about $24 million. So put on your detective hat, channel your inner Sherlock and head on over to 221B Baker Street as we take a deep dive into\u2026**HARVEST Finance.**\\n\\n### **HARVEST FINANCE**\\n\\nHarvest Finance, similar to [Yearn Finance](https://yearn.finance), is a DeFi yield aggregator. A yield aggregator is basically a platform that implements investment strategies on different DeFi Projects in order to maximize yields. Dubbed to be Yearn\u2019s competitor in the field, Harvest, within a fortnight of its launch grew among the ranks in DeFi to gain $1billion in total value locked (TVL). This is despite early warnings in their audit reports as well as concerns of centralization surrounding the project.\\n\\n**What happened?**\\n==================\\n\\nOn October 26, 02:53:31 AM +UTC, an anonymous attacker executed the theft of funds from the USDC and USDT vaults of Harvest Finance. The heist resulted in $24 million worth of funds being stolen out of which $2.5 million was sent back, these returned funds will be distributed among those who lost funds in this exploit.\\n\\nThe Harvest team has been trying to mitigate the effects of this exploit which occurred due to what they call their \u201cengineering error\u201d. As the story unfolds while this article is being written, Harvest is continuously tracking the funds that were stolen and have claimed to have identified the attacker and has been requesting the attacker to return the funds back to its rightful owners and is also offering a bounty of $400k (bounced up from $100k) to anyone who is able to persuade the attacker to return the funds.\\n\\nHarvest Finance acted and withdrew all the funds from the shared pools immediately after evaluating the attack and reconstructing its process. This includes DAI, USDC, USDT, TUSD as well as WBTC and renBTC. The funds are currently present in the vaults and cannot suffer from further market manipulation. The attack did not involve DAI, TUSD, WBTC, and renBTC, and the depositors in these vaults were not affected.\\n\\nThe addresses used for carrying out the heist has been requested to be blacklisted. With the Harvest team not ready to dox the attacker even after their claim that they have identified the attacker and that the attacker is \u201cwell known in the crypto community\u201d, there has been speculation that either the Harvest team has been bluffing all along about the identity of the attacker or they are carrying out an inside job.\\n\\n**How did it happen?**\\n======================\\n\\nWith the release of the O[fficial post mortem report](https://medium.com/harvest-finance/harvest-flashloan-economic-attack-post-mortem-3cf900d65217) of Harvest Finance released by the team itself, we get to see the exact steps in how the attacker managed to pull off such a heist. The entire attack took place with the help of Flash loans and a well-planned arbitrage attack.\\n\\nThe exploits were a series of arbitrage trades between Uniswap, Curve Finance, and Harvest Finance, and the funds were then cashed out via renBTC and Tornado.\\n\\n\\n<iframe src=\\"https://cdn.embedly.com/widgets/media.html?type=text%2Fhtml&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;schema=twitter&amp;url=https%3A//twitter.com/devops199fan/status/1320579856938119168&amp;image=\\" allowfullscreen=\\"\\" frameborder=\\"0\\" height=\\"795\\" width=\\"680\\" title=\\"\\" class=\\"eo n ff dy bg\\" scrolling=\\"no\\"></iframe>\\n\\nThe attacker began taking out flash loans of $50 million worth USDC on Uniswap and used it to swap between the USDC/USDT pool in Harvest to manipulate the market price wildly. The discounted stablecoins were then used to pay back the flash loan, and each successful swap was then converted into ETH and then to renBTC and eventually to BTC.\\n\\nThere is still a widespread debate on whether or not this attack was \u201cillegal\u201d since the attacker basically just used trade arbitrage \u2014 a common profit-making technique \u2014 on a much larger scale with huge amounts of funds which enormously fluctuated the market. One side considers this as the wits of a smart person who used the poor smart contract design to their advantage, whereas the other side of the community vouches that purposely fluctuating a market at such scales to gain massive amounts of profits while leaving the others in the dust is not acceptable and the attacker must be held accountable.\\n\\n<iframe src=\\"https://cdn.embedly.com/widgets/media.html?type=text%2Fhtml&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;schema=twitter&amp;url=https%3A//twitter.com/bneiluj/status/1320686478486347778&amp;image=\\" allowfullscreen=\\"\\" frameborder=\\"0\\" height=\\"787\\" width=\\"680\\" title=\\"\\" class=\\"eo n ff dy bg\\" scrolling=\\"no\\"></iframe>\\n\\n**Why did it happen**\\n=====================\\n\\nOne of the major reasons this attack happened was because of a single design flaw in Harvest Finance\u2019s smart contract design.\\n\\nAccording to @PancakeBunnyFin\u2019s analysis and also as confirmed by the Harvest Finance team, the loose smart contract design by Harvest is what cost them $24 million. The arbitrary check function in the contract had a tolerance value of 3% which was too much.\\n\\n\u201cThe price of a share before the attack was 0.980007 USDC, so the attacker decreased the value of the share by approximately 1%. The arbitrage check inside Harvest\u2019s strategy did not exceed the threshold of 3% and thus did not revert the transaction.\u201d\\n\\n<iframe src=\\"https://cdn.embedly.com/widgets/media.html?type=text%2Fhtml&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;schema=twitter&amp;url=https%3A//twitter.com/pancakebunnyfin/status/1320615025560547328&amp;image=\\" allowfullscreen=\\"\\" frameborder=\\"0\\" height=\\"950\\" width=\\"680\\" title=\\"\\" class=\\"eo n ff dy bg\\" scrolling=\\"no\\"></iframe>\\n\\n**This is where EPNS can help**\\n===============================\\n\\nAlthough hacks and exploits will continue to happen, EPNS is building infrastructure to help trigger actions in a more timely, automated, and accurate manner. In other words, EPNS can help mitigate the after-effects much quicker and effectively.\\n\\n<iframe src=\\"https://cdn.embedly.com/widgets/media.html?type=text%2Fhtml&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;schema=twitter&amp;url=https%3A//twitter.com/harvest_finance/status/1320614699684298754&amp;image=\\" allowfullscreen=\\"\\" frameborder=\\"0\\" height=\\"417\\" width=\\"680\\" title=\\"\\" class=\\"eo n ff dy bg\\" scrolling=\\"no\\"></iframe>\\n\\nAlong with the fact that sharing the attacker\u2019s BTC addresses on Twitter to blacklist them may not seem intuitive, this approach can be quite slow, giving the attacker ample time to move their funds elsewhere, and also doesn\u2019t ensure that all stakeholders in the project are aware that such an incident took place.\\n\\nWith the help of EPNS, one can make sure that risk is always mitigated when such exploits happen.\\n\\n**What next for HARVEST?**\\n==========================\\n\\nHarvest is still on the chase to recover funds and has resolved to even commend the skills of the attacker and requesting the attacker to return the funds.\\n\\nThe team is also considering further mitigation strategies to be used to prevent a similar case in the future, such as implementing a commit-and-reveal mechanism for deposits, a stricter configuration of the existing deposit arb checks in the strategies, among other steps.\\n\\nOne can only wait and see what happens as the situation unravels. DeFi never fails to keep you on the edge of your seat. We wish the Harvest team and community best of luck as they overcome the recent challenges.\\n\\nNever a dull day in DeFi.\\n\\nThis article will be updated in the coming days.\\n\\n**This was\u2026**\\n\\n**DeFi Forensics\u2026**\\n===================\\n\\nBecome part of our buzzing community! Join the conversation on one of our channels:  \\n[Website](https://epns.io/) | [Twitter](https://twitter.com/epnsproject) | [Telegram](https://t.me/epnsproject) | [Github](https://github.com/ethereum-push-notification-service)"}}')}}]);
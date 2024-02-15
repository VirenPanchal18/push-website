"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[48994],{573282:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ie});var s=n(667294),a=n(810833),l=n(400902),o=n(785893);const i=s.createContext(null);function d(e){let{children:t,content:n}=e;const a=function(e){return(0,s.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,o.jsx)(i.Provider,{value:a,children:t})}function r(){const e=(0,s.useContext)(i);if(null===e)throw new l.i6("DocProvider");return e}function c(){var e;const{metadata:t,frontMatter:n,assets:s}=r();return(0,o.jsx)(a.d,{title:t.title,description:t.description,keywords:n.keywords,image:null!==(e=s.image)&&void 0!==e?e:n.image})}var u=n(236905),m=n(987524),h=n(595999),v=n(54280);function x(e){const{previous:t,next:n}=e;return(0,o.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,o.jsx)(v.Z,{...t,subLabel:(0,o.jsx)(h.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,o.jsx)(v.Z,{...n,subLabel:(0,o.jsx)(h.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function p(){const{metadata:e}=r();return(0,o.jsx)(x,{previous:e.previous,next:e.next})}var f=n(652263),b=n(239960),g=n(680143),j=n(635281),L=n(260373),C=n(274477);const N={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function k(e){const t=N[e.versionMetadata.banner];return(0,o.jsx)(t,{...e})}function Z(e){let{versionLabel:t,to:n,onClick:s}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,o.jsx)("b",{children:(0,o.jsx)(b.Z,{to:n,onClick:s,children:(0,o.jsx)(h.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function _(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:s}}=(0,f.Z)(),{pluginId:a}=(0,g.gA)({failfast:!0}),{savePreferredVersionName:l}=(0,L.J)(a),{latestDocSuggestion:i,latestVersionSuggestion:d}=(0,g.Jo)(a),r=null!=i?i:(c=d).docs.find((e=>e.id===c.mainDocId));var c;return(0,o.jsxs)("div",{className:(0,u.Z)(t,j.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,o.jsx)("div",{children:(0,o.jsx)(k,{siteTitle:s,versionMetadata:n})}),(0,o.jsx)("div",{className:"margin-top--md",children:(0,o.jsx)(Z,{versionLabel:d.label,to:r.path,onClick:()=>l(d.name)})})]})}function T(e){let{className:t}=e;const n=(0,C.E)();return n.banner?(0,o.jsx)(_,{className:t,versionMetadata:n}):null}function U(e){let{className:t}=e;const n=(0,C.E)();return n.badge?(0,o.jsx)("span",{className:(0,u.Z)(t,j.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.jsx)(h.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}function H(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return(0,o.jsx)(h.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,o.jsx)("b",{children:(0,o.jsx)("time",{dateTime:new Date(1e3*t).toISOString(),children:n})})},children:" on {date}"})}function w(e){let{lastUpdatedBy:t}=e;return(0,o.jsx)(h.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,o.jsx)("b",{children:t})},children:" by {user}"})}function y(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:s}=e;return(0,o.jsxs)("span",{className:j.k.common.lastUpdated,children:[(0,o.jsx)(h.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?(0,o.jsx)(H,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:s?(0,o.jsx)(w,{lastUpdatedBy:s}):""},children:"Last updated{atDate}{byUser}"}),!1]})}var A=n(484881),M=n(390259);const B={lastUpdated:"lastUpdated_vwxv"};function E(e){return(0,o.jsx)("div",{className:(0,u.Z)(j.k.docs.docFooterTagsRow,"row margin-bottom--sm"),children:(0,o.jsx)("div",{className:"col",children:(0,o.jsx)(M.Z,{...e})})})}function I(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s,formattedLastUpdatedAt:a}=e;return(0,o.jsxs)("div",{className:(0,u.Z)(j.k.docs.docFooterEditMetaRow,"row"),children:[(0,o.jsx)("div",{className:"col",children:t&&(0,o.jsx)(A.Z,{editUrl:t})}),(0,o.jsx)("div",{className:(0,u.Z)("col",B.lastUpdated),children:(n||s)&&(0,o.jsx)(y,{lastUpdatedAt:n,formattedLastUpdatedAt:a,lastUpdatedBy:s})})]})}function O(){const{metadata:e}=r(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:s,lastUpdatedBy:a,tags:l}=e,i=l.length>0,d=!!(t||n||a);return i||d?(0,o.jsxs)("footer",{className:(0,u.Z)(j.k.docs.docFooter,"docusaurus-mt-lg"),children:[i&&(0,o.jsx)(E,{tags:l}),d&&(0,o.jsx)(I,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:a,formattedLastUpdatedAt:s})]}):null}var V=n(986043),S=n(793743);const D={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};function F(e){let{collapsed:t,...n}=e;return(0,o.jsx)("button",{type:"button",...n,className:(0,u.Z)("clean-btn",D.tocCollapsibleButton,!t&&D.tocCollapsibleButtonExpanded,n.className),children:(0,o.jsx)(h.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const R={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function P(e){let{toc:t,className:n,minHeadingLevel:s,maxHeadingLevel:a}=e;const{collapsed:l,toggleCollapsed:i}=(0,V.u)({initialState:!0});return(0,o.jsxs)("div",{className:(0,u.Z)(R.tocCollapsible,!l&&R.tocCollapsibleExpanded,n),children:[(0,o.jsx)(F,{collapsed:l,onClick:i}),(0,o.jsx)(V.z,{lazy:!0,className:R.tocCollapsibleContent,collapsed:l,children:(0,o.jsx)(S.Z,{toc:t,minHeadingLevel:s,maxHeadingLevel:a})})]})}const z={tocMobile:"tocMobile_ITEo"};function q(){const{toc:e,frontMatter:t}=r();return(0,o.jsx)(P,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,u.Z)(j.k.docs.docTocMobile,z.tocMobile)})}var G=n(839407);function J(){const{toc:e,frontMatter:t}=r();return(0,o.jsx)(G.Z,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:j.k.docs.docTocDesktop})}var K=n(992503),Q=n(831656);function W(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=r();return t.hide_title||void 0!==n?null:e.title}();return(0,o.jsxs)("div",{className:(0,u.Z)(j.k.docs.docMarkdown,"markdown"),children:[n&&(0,o.jsx)("header",{children:(0,o.jsx)(K.Z,{as:"h1",children:n})}),(0,o.jsx)(Q.Z,{children:t})]})}var X=n(122564),Y=n(135742);function $(){return(0,o.jsx)(h.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function ee(){return(0,o.jsx)(h.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function te(){return(0,o.jsx)(Y.Z,{children:(0,o.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var ne=n(759047);function se(e){let{className:t}=e;return(0,o.jsx)(ne.Z,{type:"caution",title:(0,o.jsx)($,{}),className:(0,u.Z)(t,j.k.common.unlistedBanner),children:(0,o.jsx)(ee,{})})}function ae(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(te,{}),(0,o.jsx)(se,{...e})]})}const le={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function oe(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=r(),n=(0,m.i)(),s=e.hide_table_of_contents,a=!s&&t.length>0;return{hidden:s,mobile:a?(0,o.jsx)(q,{}):void 0,desktop:!a||"desktop"!==n&&"ssr"!==n?void 0:(0,o.jsx)(J,{})}}(),{metadata:{unlisted:s}}=r();return(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:(0,u.Z)("col",!n.hidden&&le.docItemCol),children:[s&&(0,o.jsx)(ae,{}),(0,o.jsx)(T,{}),(0,o.jsxs)("div",{className:le.docItemContainer,children:[(0,o.jsxs)("article",{children:[(0,o.jsx)(X.Z,{}),(0,o.jsx)(U,{}),n.mobile,(0,o.jsx)(W,{children:t}),(0,o.jsx)(O,{})]}),(0,o.jsx)(p,{})]})]}),n.desktop&&(0,o.jsx)("div",{className:"col col--3",children:n.desktop})]})}function ie(e){const t="docs-doc-id-"+e.content.metadata.id,n=e.content;return(0,o.jsx)(d,{content:e.content,children:(0,o.jsxs)(a.FG,{className:t,children:[(0,o.jsx)(c,{}),(0,o.jsx)(oe,{children:(0,o.jsx)(n,{})})]})})}},499464:(e,t,n)=>{n.d(t,{Z:()=>a});n(667294);var s=n(785893);function a(e){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,s.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}},839407:(e,t,n)=>{n.d(t,{Z:()=>r});n(667294);var s=n(236905),a=n(793743);const l={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var o=n(785893);const i="table-of-contents__link toc-highlight",d="table-of-contents__link--active";function r(e){let{className:t,...n}=e;return(0,o.jsx)("div",{className:(0,s.Z)(l.tableOfContents,"thin-scrollbar",t),children:(0,o.jsx)(a.Z,{...n,linkClassName:i,linkActiveClassName:d})})}},793743:(e,t,n)=>{n.d(t,{Z:()=>x});var s=n(667294),a=n(486668);function l(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const s=n.slice(2,e.level);e.parentIndex=Math.max(...s),n[e.level]=t}));const s=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):s.push(a)})),s}function o(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return t.flatMap((e=>{const t=o({toc:e.children,minHeadingLevel:n,maxHeadingLevel:s});return function(e){return e.level>=n&&e.level<=s}(e)?[{...e,children:t}]:t}))}function i(e){const t=e.getBoundingClientRect();return t.top===t.bottom?i(e.parentNode):t}function d(e,t){var n;let{anchorTopOffset:s}=t;const a=e.find((e=>i(e).top>=s));if(a){var l;return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(i(a))?a:null!==(l=e[e.indexOf(a)-1])&&void 0!==l?l:null}return null!==(n=e[e.length-1])&&void 0!==n?n:null}function r(){const e=(0,s.useRef)(0),{navbar:{hideOnScroll:t}}=(0,a.L)();return(0,s.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function c(e){const t=(0,s.useRef)(void 0),n=r();(0,s.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:s,linkActiveClassName:a,minHeadingLevel:l,maxHeadingLevel:o}=e;function i(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(s),i=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const s=[];for(let a=t;a<=n;a+=1)s.push("h"+a+".anchor");return Array.from(document.querySelectorAll(s.join()))}({minHeadingLevel:l,maxHeadingLevel:o}),r=d(i,{anchorTopOffset:n.current}),c=e.find((e=>r&&r.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===c)}))}return document.addEventListener("scroll",i),document.addEventListener("resize",i),i(),()=>{document.removeEventListener("scroll",i),document.removeEventListener("resize",i)}}),[e,n])}var u=n(239960),m=n(785893);function h(e){let{toc:t,className:n,linkClassName:s,isChild:a}=e;return t.length?(0,m.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(u.Z,{to:"#"+e.id,className:null!=s?s:void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(h,{isChild:!0,toc:e.children,className:n,linkClassName:s})]},e.id)))}):null}const v=s.memo(h);function x(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:i="table-of-contents__link",linkActiveClassName:d,minHeadingLevel:r,maxHeadingLevel:u,...h}=e;const x=(0,a.L)(),p=null!=r?r:x.tableOfContents.minHeadingLevel,f=null!=u?u:x.tableOfContents.maxHeadingLevel,b=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,s.useMemo)((()=>o({toc:l(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:p,maxHeadingLevel:f});return c((0,s.useMemo)((()=>{if(i&&d)return{linkClassName:i,linkActiveClassName:d,minHeadingLevel:p,maxHeadingLevel:f}}),[i,d,p,f])),(0,m.jsx)(v,{toc:b,className:n,linkClassName:i,...h})}}}]);
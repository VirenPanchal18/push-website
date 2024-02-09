"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[82520],{996707:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>u,contentTitle:()=>d,default:()=>x,frontMatter:()=>a,metadata:()=>c,toc:()=>h});var t=i(785893),r=i(511151),s=i(374866),l=i(685162),o=i(934673);const a={id:"docs-video-develop-initialize-user",title:"Initialize User",hide_title:!0,slug:"./initialize-user",displayed_sidebar:"pushVideoSidebar",sidebar_position:2,image:"/assets/docs/previews/docs_video_develop--initialize_user.png"},d="Initialize user overview",c={id:"video/build/docs-video-develop-initialize-user",title:"Initialize User",description:"Before you can start a video call, you will need to initialize a user or re-authenticate the user. To do so you will use PushAPI.initialize call from @pushprotocol/restapi package.",source:"@site/docs/video/01-build/02-Develop-Initialize-User.mdx",sourceDirName:"video/01-build",slug:"/video/build/initialize-user",permalink:"/docs/video/build/initialize-user",draft:!1,unlisted:!1,editUrl:"https://github.com/ethereum-push-notification-service/push-website/blob/main/docs/video/01-build/02-Develop-Initialize-User.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"docs-video-develop-initialize-user",title:"Initialize User",hide_title:!0,slug:"./initialize-user",displayed_sidebar:"pushVideoSidebar",sidebar_position:2,image:"/assets/docs/previews/docs_video_develop--initialize_user.png"},sidebar:"pushVideoSidebar",previous:{title:"Get Started",permalink:"/docs/video/build/get-started"},next:{title:"Stream Video",permalink:"/docs/video/build/stream-video"}},u={},h=[{value:"Initialize user API",id:"initialize-user-api",level:2},{value:"Setting the right environment",id:"setting-the-right-environment",level:3},{value:"Initialize user parameters",id:"initialize-user-parameters",level:3},{value:"Initialize user interface",id:"initialize-user-interface",level:3}];function p(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"initialize-user-overview",children:"Initialize user overview"}),"\n",(0,t.jsxs)(n.p,{children:["Before you can start a video call, you will need to initialize a user or re-authenticate the user. To do so you will use ",(0,t.jsx)(n.code,{children:"PushAPI.initialize"})," call from ",(0,t.jsx)(n.code,{children:"@pushprotocol/restapi"})," package."]}),"\n",(0,t.jsx)(i,{children:(0,t.jsx)("title",{children:"Initialize User | Push Video | Push Documentation"})}),"\n","\n","\n",(0,t.jsx)(n.h2,{id:"initialize-user-api",children:"Initialize user API"}),"\n",(0,t.jsx)(s.Z,{className:"codetabs",groupId:"code-examples",children:(0,t.jsx)(l.Z,{value:"js",attributes:{className:"codetab js"},default:!0,children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"import { PushAPI, CONSTANTS } from \"@pushprotocol/restapi\";\n\n// Initialize wallet user\n// PushAPI.initialize(signer, {options?});\n// 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps\nconst userAlice = await PushAPI.initialize(signer, {\n  env: CONSTANTS.ENV.STAGING,\n});\n"})})})}),"\n",(0,t.jsxs)(n.p,{children:["The function automatically initializes and returns the ",(0,t.jsx)(n.strong,{children:"Push user profile"})," object if one doesn't exist for the user or alternatively creates a new profile if the user has not been onboarded to Push network. This profile is used to interact with all function calls moving forward."]}),"\n",(0,t.jsx)(n.h3,{id:"setting-the-right-environment",children:"Setting the right environment"}),"\n",(0,t.jsx)(n.p,{children:"Push Network operates on the following environments \u2014"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Production"})," - You will need to set ",(0,t.jsx)(n.code,{children:"env"})," in ",(0,t.jsx)(n.code,{children:"options"})," object to 'prod' to enable mainnet apps communication."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Staging"})," - Set by default, can omit ",(0,t.jsx)(n.code,{children:"options"})," if testing your app on testnet."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"initialize-user-parameters",children:"Initialize user parameters"}),"\n",(0,t.jsx)(n.p,{children:"When initializing your user, you can customize the process using several parameters. Here's a breakdown:"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Param"}),(0,t.jsx)(n.th,{children:"Type"}),(0,t.jsx)(n.th,{children:"Sub-Type"}),(0,t.jsx)(n.th,{children:"Default"}),(0,t.jsx)(n.th,{children:"Remarks"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.em,{children:(0,t.jsx)(n.code,{children:"signer"})})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"SignerType"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"EthersV5 or Viem Signer"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"PushAPIInitializeProps"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Optional configuration properties for initializing the PushAPI."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options.env"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"ENV"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"staging"})}),(0,t.jsx)(n.td,{children:"API env - 'prod' or 'staging'"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options.progressHook"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"(progress: ProgressHookType) => void"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"A callback function to receive progress updates during initialization."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options.account"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"string"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsxs)(n.td,{children:["The ",(0,t.jsx)(n.a,{href:"/docs/chat/build/initialize-user#use-lens-profile--any-nfts--chain-agnostic-wallet-address",children:"account"})," to associate with the PushAPI. If not provided, it is derived from signer."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options.version"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"string"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"ENC_TYPE_V3"})}),(0,t.jsxs)(n.td,{children:["The ",(0,t.jsx)(n.a,{href:"/docs/chat/concepts/encryption-version-in-push-chat",children:"encryption version"})," to use for the PushAPI"]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options.versionMeta"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"{ NFTPGP_V1 ?: password: string }"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Metadata related to the encryption version, including a password if needed."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options.autoUpgrade"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"boolean"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"true"})}),(0,t.jsxs)(n.td,{children:["If ",(0,t.jsx)(n.code,{children:"true"}),", upgrades encryption keys to latest encryption version"]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"options.origin"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"string"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Specify origin or source while creating a Push Profile"})]})]})]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["Note: Parameters ",(0,t.jsx)(n.em,{children:(0,t.jsx)(n.code,{children:"in this style"})})," are mandatory."]}),"\n"]}),"\n",(0,t.jsx)(o.Z,{summary:"Expected response",children:"200 OK"}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"initialize-user-interface",children:"Initialize user interface"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"/**\n * Initialization Parameters for PushAPI\n */\n\n/**\n * Specifies the type of signer.\n * Choose between EthersV5 or Viem Signer.\n */\ntype Signer = SignerType;\n\ninterface PushAPIInitializeProps {\n  /**\n   * Sets the API environment.\n   * Options: 'prod', 'staging', 'dev'\n   * Default: 'staging'\n   */\n  env?: ENV;\n\n  /**\n   * A callback function to receive updates during the initialization process.\n   */\n  progressHook?: (progress: ProgressHookType) => void;\n\n  /**\n   * The account you want to link with the PushAPI.\n   * If left empty, it'll use the account associated with your signer.\n   */\n  account?: string;\n\n  /**\n   * Specifies the encryption version for the PushAPI.\n   * Default: 'ENC_TYPE_V3'\n   */\n  version?: string;\n\n  /**\n   * Provides additional data related to your chosen encryption version,\n   * like a necessary password.\n   */\n  versionMeta?: {\n    NFTPGP_V1?: {\n      password: string;\n    };\n  };\n\n  /**\n   * When set to true, the system will automatically upgrade encryption keys\n   * to the latest available encryption version.\n   * Default: true\n   */\n  autoUpgrade?: boolean;\n\n  /**\n   * Defines the origin or source when setting up a Push Profile.\n   */\n  origin?: string;\n}\n\n/**\n * Initializes the PushAPI with given parameters.\n *\n * @param signer The type of signer (EthersV5 or Viem Signer).\n * @param options Optional configurations for initializing the PushAPI.\n */\nfunction initializePushAPI(signer: Signer, options?: PushAPIInitializeProps) {\n  // Initialization logic here\n}\n"})})]})}function x(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},934673:(e,n,i)=>{i.d(n,{Z:()=>j});var t=i(667294),r=i(236905),s=i(700788),l=i(972389),o=i(986043);const a={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var d=i(785893);function c(e){return!!e&&("SUMMARY"===e.tagName||c(e.parentElement))}function u(e,n){return!!e&&(e===n||u(e.parentElement,n))}function h(e){let{summary:n,children:i,...r}=e;const h=(0,l.Z)(),p=(0,t.useRef)(null),{collapsed:x,setCollapsed:j}=(0,o.u)({initialState:!r.open}),[v,f]=(0,t.useState)(r.open),m=t.isValidElement(n)?n:(0,d.jsx)("summary",{children:null!=n?n:"Details"});return(0,d.jsxs)("details",{...r,ref:p,open:v,"data-collapsed":x,className:(0,s.Z)(a.details,h&&a.isBrowser,r.className),onMouseDown:e=>{c(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;c(n)&&u(n,p.current)&&(e.preventDefault(),x?(j(!1),f(!0)):j(!0))},children:[m,(0,d.jsx)(o.z,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{j(e),f(!e)},children:(0,d.jsx)("div",{className:a.collapsibleContent,children:i})})]})}const p={details:"details_b_Ee"},x="alert alert--info";function j(e){let{...n}=e;return(0,d.jsx)(h,{...n,className:(0,r.Z)(x,p.details,n.className)})}},685162:(e,n,i)=>{i.d(n,{Z:()=>l});i(667294);var t=i(236905);const r={tabItem:"tabItem_Ymn6"};var s=i(785893);function l(e){let{children:n,hidden:i,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,t.Z)(r.tabItem,l),hidden:i,children:n})}},374866:(e,n,i)=>{i.d(n,{Z:()=>P});var t=i(667294),r=i(236905),s=i(212466),l=i(616550),o=i(120469),a=i(191980),d=i(867392),c=i(750012);function u(e){var n,i;return null!==(n=null===(i=t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))||void 0===i?void 0:i.filter(Boolean))&&void 0!==n?n:[]}function h(e){const{values:n,children:i}=e;return(0,t.useMemo)((()=>{const e=null!=n?n:function(e){return u(e).map((e=>{let{props:{value:n,label:i,attributes:t,default:r}}=e;return{value:n,label:i,attributes:t,default:r}}))}(i);return function(e){const n=(0,d.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error('Docusaurus error: Duplicate values "'+n.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[n,i])}function p(e){let{value:n,tabValues:i}=e;return i.some((e=>e.value===n))}function x(e){let{queryString:n=!1,groupId:i}=e;const r=(0,l.k6)(),s=function(e){let{queryString:n=!1,groupId:i}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!i)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=i?i:null}({queryString:n,groupId:i});return[(0,a._X)(s),(0,t.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(r.location.search);n.set(s,e),r.replace({...r.location,search:n.toString()})}),[s,r])]}function j(e){const{defaultValue:n,queryString:i=!1,groupId:r}=e,s=h(e),[l,a]=(0,t.useState)((()=>function(e){var n;let{defaultValue:i,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(i){if(!p({value:i,tabValues:t}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+i+'" but none of its children has the corresponding value. Available values are: '+t.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return i}const r=null!==(n=t.find((e=>e.default)))&&void 0!==n?n:t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:s}))),[d,u]=x({queryString:i,groupId:r}),[j,v]=function(e){let{groupId:n}=e;const i=function(e){return e?"docusaurus.tab."+e:null}(n),[r,s]=(0,c.Nk)(i);return[r,(0,t.useCallback)((e=>{i&&s.set(e)}),[i,s])]}({groupId:r}),f=(()=>{const e=null!=d?d:j;return p({value:e,tabValues:s})?e:null})();(0,o.Z)((()=>{f&&a(f)}),[f]);return{selectedValue:l,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:s}))throw new Error("Can't select invalid tab value="+e);a(e),u(e),v(e)}),[u,v,s]),tabValues:s}}var v=i(972389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var m=i(785893);function g(e){let{className:n,block:i,selectedValue:t,selectValue:l,tabValues:o}=e;const a=[],{blockElementScrollPositionUntilNextRender:d}=(0,s.o5)(),c=e=>{const n=e.currentTarget,i=a.indexOf(n),r=o[i].value;r!==t&&(d(n),l(r))},u=e=>{var n;let i=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{var t;const n=a.indexOf(e.currentTarget)+1;i=null!==(t=a[n])&&void 0!==t?t:a[0];break}case"ArrowLeft":{var r;const n=a.indexOf(e.currentTarget)-1;i=null!==(r=a[n])&&void 0!==r?r:a[a.length-1];break}}null===(n=i)||void 0===n||n.focus()};return(0,m.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":i},n),children:o.map((e=>{let{value:n,label:i,attributes:s}=e;return(0,m.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>a.push(e),onKeyDown:u,onClick:c,...s,className:(0,r.Z)("tabs__item",f.tabItem,null==s?void 0:s.className,{"tabs__item--active":t===n}),children:null!=i?i:n},n)}))})}function b(e){let{lazy:n,children:i,selectedValue:r}=e;const s=(Array.isArray(i)?i:[i]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===r));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,m.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function y(e){const n=j(e);return(0,m.jsxs)("div",{className:(0,r.Z)("tabs-container",f.tabList),children:[(0,m.jsx)(g,{...e,...n}),(0,m.jsx)(b,{...e,...n})]})}function P(e){const n=(0,v.Z)();return(0,m.jsx)(y,{...e,children:u(e.children)},String(n))}},511151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>l});var t=i(667294);const r={},s=t.createContext(r);function l(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);
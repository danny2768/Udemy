import{$ as m,K as l,Z as f,_ as u,ca as c,da as p,fa as v,n,p as d,q as i}from"./chunk-KMTAH7TL.js";var S=[{path:"portfolio",loadChildren:()=>import("./chunk-57DLO57R.js").then(e=>e.PortfolioModule)},{path:"under-development",component:p},{path:"**",redirectTo:"portfolio"}],h=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=i({type:t}),t.\u0275inj=n({imports:[c.forRoot(S,{scrollPositionRestoration:"enabled",anchorScrolling:"enabled",onSameUrlNavigation:"reload"}),c]});let e=t;return e})();var g=(()=>{let t=class t{constructor(){this.title="dc-portfolio"}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=d({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(r,D){r&1&&l(0,"router-outlet")},dependencies:[m]});let e=t;return e})();var b=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=i({type:t,bootstrap:[g]}),t.\u0275inj=n({imports:[u,h,v]});let e=t;return e})();var k="@vercel/analytics",C="1.2.2",P=()=>{window.va||(window.va=function(...t){(window.vaq=window.vaq||[]).push(t)})};function y(){return typeof window<"u"}function j(){try{let e="production";if(e==="development"||e==="test")return"development"}catch{}return"production"}function _(e="auto"){if(e==="auto"){window.vam=j();return}window.vam=e}function N(){return(y()?window.vam:j())||"production"}function s(){return N()==="development"}var E="https://va.vercel-scripts.com/v1/script.debug.js",R="/_vercel/insights/script.js";function M(e={debug:!0}){var t;if(!y())return;_(e.mode),P(),e.beforeSend&&((t=window.va)==null||t.call(window,"beforeSend",e.beforeSend));let a=e.scriptSrc||(s()?E:R);if(document.head.querySelector(`script[src*="${a}"]`))return;let o=document.createElement("script");o.src=a,o.defer=!0,o.dataset.sdkn=k+(e.framework?`/${e.framework}`:""),o.dataset.sdkv=C,e.disableAutoTrack&&(o.dataset.disableAutoTrack="1"),e.endpoint&&(o.dataset.endpoint=e.endpoint),e.dsn&&(o.dataset.dsn=e.dsn),o.onerror=()=>{let r=s()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${a}. ${r}`)},s()&&e.debug===!1&&(o.dataset.debug="false"),document.head.appendChild(o)}M();f().bootstrapModule(b).catch(e=>console.error(e));
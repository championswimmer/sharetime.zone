if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>r(e,o),d={module:{uri:o},exports:t,require:l};s[o]=Promise.all(i.map((e=>d[e]||l(e)))).then((e=>(n(...e),t)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"sharetime.zone"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.1fe7f3fd.css",revision:null},{url:"/index.html",revision:"0ce53082afdba55ddd347d7654665c2b"},{url:"/js/about.b2e0e2f0.js",revision:null},{url:"/js/app.64067fe8.js",revision:null},{url:"/js/chunk-vendors.02599d69.js",revision:null},{url:"/manifest.json",revision:"d789056a71d4403d43b3d93d1fdd0a65"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map

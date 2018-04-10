!function(t){var e={};function o(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=4)}([function(t,e,o){"use strict";o.r(e),o.d(e,"StackState",function(){return r}),o.d(e,"StackNavigator",function(){return n});class r{get options(){return this.options}set options(t){this.options=t}get viewController(){return this.viewController}set viewController(t){this.viewController=t}}function s(t){return console.log(!(t.options&&void 0!=t.options.navigationBar&&0==t.options.navigationBar)),!(t.options&&void 0!=t.options.navigationBar&&0==t.options.navigationBar)}class n{constructor(t,e){this.stack=[e],this.passiveController=null,this.transition=t,this.renderRootView(e)}push(t){const e=this.stack[this.stack.length-2];this.stack.push(t),e&&this.passiveController.render().remove(),this.showCurrentViewAndHidePrevious(t)}pop(){const t=this.stack[this.stack.length-3];this.stack.pop(),this.showPreviousViewAndDeleteCurrent(t)}renderRootView(t){this.activeController=new t.viewController(t.props),this.activeController.navigator=this;const e=s(t);e&&this.insertNavigationBarForPush();const o=this.activeController.render();"cover-vertical"==this.transition?o.style.transform="translateY(0)":"cover-horizontal"==this.transition&&(o.style.transform="translateX(0)"),o.style.opacity=1,o.style.transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",document.body.appendChild(o),setTimeout(t=>{if(e){const t=o.querySelector("scell-navigation-bar");t.leftSlotAssignedNode.hide(),t.shadowRoot.querySelector(".center-zone > span").style.transition="transform 0.2s  cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",o.style.paddingTop=getComputedStyle(t).height}},100)}insertNavigationBarForPush(){const t=this.stack[this.stack.length-2],e=this.stack[this.stack.length-1].options.title||`Title${this.stack.length}`;let o="";t&&(o=t.options.title||"Back");this.activeController.render().insertAdjacentHTML("afterbegin",`<scell-navigation-bar anim-back-title="true" title="${e}" back-title="${o}"><scell-back-button/></scell-navigation-bar>`);this.activeController.render().querySelector("scell-navigation-bar").navigator=this}insertNavigationBarForPop(){this.stack[this.stack.length-1];const t=this.stack[this.stack.length-2],e=this.stack[this.stack.length-3],o=t.options.title||`Title${this.stack.length}`;let r="";e&&(r=e.options.title||"Back");this.passiveController.render().insertAdjacentHTML("afterbegin",`<scell-navigation-bar title="${o}" back-title="${r}"><scell-back-button></scell-back-button></scell-navigation-bar>`);this.activeController.render().querySelector("scell-navigation-bar").navigator=this}showCurrentViewAndHidePrevious(t){const e=t.viewController;this.passiveController=this.activeController,this.activeController=new e(t.props),this.activeController.navigator=this;const o=s(t);o&&this.insertNavigationBarForPush();const r=this.passiveController.render(),n=this.activeController.render();let i,a,l,c,h;if(document.body.appendChild(n),o){const t=r.querySelector("scell-navigation-bar");n.style.paddingTop=getComputedStyle(t).height,i=n.querySelector("scell-navigation-bar"),a=i.shadowRoot.querySelector(".center-zone > span"),(l=i.shadowRoot.querySelector(".back-zone > span")).parentElement.onclick=(t=>{this.pop()}),c=t.shadowRoot.querySelector(".center-zone > span"),h=i.leftSlotAssignedNode}"cover-vertical"==this.transition?(n.style.transform="translateY(10%)",n.style.opacity=.5):(n.style.transform="translateX(100%)",o&&(a.style.opacity=0,l.style.opacity=.3,c.style.opacity=0,h.style.opacity=0)),setTimeout(t=>{n.style.transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",o&&(l.style.transition="transform 0.2s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",a.style.transition="transform 0.2s  cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",h.style.transition="opacity 0.4s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",h.style.opacity=1);const e=r.shadowRoot.querySelector(".shadow-pane");e.style.display="",setTimeout(t=>{"cover-vertical"==this.transition?(n.style.transform="translateY(0)",n.style.opacity=1,setTimeout(t=>{r.style.display="none"},500)):"cover-horizontal"==this.transition&&(r.style.transform="translateX(-30%)",e.style.opacity=.4,n.style.transform="translateX(0)",o&&(a.style.opacity=1,l.style.transform="translateX(0%)",l.style.opacity=1),setTimeout(t=>{r.style.display="none"},500))},100)},16)}showPreviousViewAndDeleteCurrent(t){const e=null!=t?t.viewController:null,o=this.passiveController.render(),r=this.activeController.render(),n=o.shadowRoot.querySelector(".shadow-pane");let i,a,l,c,h,p,u;o.style.display="";const d=t&&s(t);d&&(p=o.querySelector("scell-navigation-bar"),h=(u=r.querySelector("scell-navigation-bar")).shadowRoot.querySelector(".center-zone > span"),c=u.shadowRoot.querySelector(".back-zone > span"),l=p.shadowRoot.querySelector(".center-zone > span"),a=p.shadowRoot.querySelector(".back-zone > span"),i=p.leftSlotAssignedNode,"cover-vertical"==!this.transition&&(l.style.opacity=0,a.style.transform="translateX(-50%)",c.style.opacity=.3,i.style.opacity=0)),setTimeout(s=>{if("cover-vertical"==this.transition?(o.style.display="block",r.style.transform="translateY(10%)",r.style.opacity=0):(r.style.transform="translateX(100%)",o.style.transform="translateX(0%)",n.style.opacity=0,d&&(c.style.opacity=0,l.style.opacity=1,a.style.transform="translateX(0%)",i.style.opacity=1),setTimeout(t=>{n.style.display="none"},400)),d){this.passiveController.render().querySelector("scell-navigation-bar").leftSlotAssignedNode.hide()}setTimeout(o=>{r.remove(),this.activeController=this.passiveController,e&&(this.passiveController=new e(t.props),this.passiveController.router=this,d&&(this.insertNavigationBarForPop(),this.passiveController.render().style.paddingTop=getComputedStyle(p).height),document.body.insertBefore(this.passiveController.render(),this.activeController.render()),"cover-vertical"==this.transition?this.passiveController.render().style.transform="":(this.passiveController.render().style.transform="translateX(-30%)",this.passiveController.render().style.transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"))},500)},100)}}},function(t,e,o){"use strict";o.r(e),o.d(e,"ZoneNavigator",function(){return r});class r extends HTMLElement{constructor(t){super(),t&&(this.$container=document.querySelector(t))}connectedCallback(){if(this.getAttribute("container-selector")&&(this.$container=document.querySelector(this.getAttribute("container-selector"))),!this.$container)throw new Error("no container id defined for this navigator")}push(t){t.props=t.props||{};const e=new t.viewController(t.props);e.navigator=this,this.$container.innerHTML="",this.$container.appendChild(e.render())}handleUrlRouting(t){Object.getOwnPropertyNames(t).forEach(e=>{this.handleRouting&&this.handleRouting(e,t[e])},this)}}customElements.define("scell-zone-navigator",r)},function(t,e,o){"use strict";o.r(e),o.d(e,"default",function(){return r});class r{push(t){const e=t.props||{},o=new t.viewController(e);o.navigator=this;let r=o.render();document.body.appendChild(r),"#document-fragment"==r.nodeName&&(r=document.body.lastElementChild),setTimeout(t=>{r.render()},64)}}},function(t,e,o){"use strict";o.r(e),e.default={handleUrlRouting(t){this.routingData=t,this.onhashchange=(e=>{this.$container||removeEventListener("hashchange",this),Object.getOwnPropertyNames(t).forEach(e=>{this.handleRouting&&this.handleRouting(e,t[e])},this)}),addEventListener("hashchange",this.onhashchange)},handleRouting(t,e){if(t.constructor===RegExp){const e=t.exec(location.hash.slice(1)),[o,...r]=e;e&&this.push({props:{urlData:r}})}else{if(t.constructor!==String)throw Error("routePattern field must be of type RegRxp or String");{const r=/(:\w+)/g,s=t.match(r)||[];let n=[];s&&(n=s.map(t=>t.slice(1)));const i=new RegExp(t.replace(r,"(\\w+)")),a=location.hash.slice(1).match(i);if(a){const[t,...r]=a;let i={};for(var o=0;o<s.length;o++)i[n[o]]=r[o];this.push({viewController:e,props:{urlData:i}})}}}}}},function(t,e,o){o(3),o(2),o(1),t.exports=o(0)}]);
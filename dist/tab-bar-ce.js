!function(t){var e={};function n(r){if(e[r])return e[r].exports;var l=e[r]={i:r,l:!1,exports:{}};return t[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports="<slot>\n<style>\n    :host {\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: 50px;\n        display: flex;\n        background: #fff;\n    }\n\n    ::slotted(scell-tab) {\n        align-self: center;\n        flex-grow: 1;\n        text-align: center;\n        cursor: pointer;\n    }\n</style>"},function(t,e,n){"use strict";n.r(e),n.d(e,"Tab",function(){return s}),n.d(e,"TabBar",function(){return c});var r=n(0),l=n.n(r);const o=document.createElement("template");o.innerHTML=l.a,window.ShadyCSS&&ShadyCSS.prepareTemplate(o,"scell-tab-bar");class s extends HTMLElement{constructor(){super()}connectedCallback(){if(window.ShadyCSS&&ShadyCSS.styleElement(this),this.getAttribute("icon")){const t=new Image;t.onload=(e=>{this.appendChild(t)}),t.src=this.getAttribute("icon")}if(this.getAttribute("title")){const t=document.createElement("span");t.innerText=this.getAttribute("title"),this.appendChild(t)}}}customElements.define("scell-tab",s);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(o.content.cloneNode(!0))}resetActiveColorForTabs(){Array.prototype.forEach.call(this.querySelectorAll("scell-tab"),t=>{t.style.color=null})}setActive(t){this.querySelectorAll("scell-tab")[t].style.color=this.getAttribute("active-color")}setActiveByTabName(t){this.querySelector(`scell-tab[name="${t}"]`).style.color=this.getAttribute("active-color")}connectedCallback(){window.ShadyCSS&&ShadyCSS.styleElement(this),this.onclick=(t=>{let e;t.target.matches("scell-tab > span")?(e=t.target.parentElement.getAttribute("name"),this.resetActiveColorForTabs(),t.target.parentElement.style.color=this.getAttribute("active-color")):t.target.matches("scell-tab")&&(e=t.target.getAttribute("name"),this.resetActiveColorForTabs(),t.target.style.color=this.getAttribute("active-color")),this.dispatchEvent(new CustomEvent("scell-tab-selected",{detail:{name:e}}))})}}customElements.define("scell-tab-bar",c)}]);
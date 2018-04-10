export class StackState{get options(){return this.options}set options(t){this.options=t}get viewController(){return this.viewController}set viewController(t){this.viewController=t}};function handleNavigationBar(t){return console.log(!(t.options&&void 0!=t.options.navigationBar&&0==t.options.navigationBar)),!(t.options&&void 0!=t.options.navigationBar&&0==t.options.navigationBar)}export class StackNavigator{constructor(t,e){this.stack=[e],this.passiveController=null,this.transition=t,this.renderRootView(e)}push(t){const e=this.stack[this.stack.length-2];this.stack.push(t),e&&this.passiveController.render().remove(),this.showCurrentViewAndHidePrevious(t)}pop(){const t=this.stack[this.stack.length-3];this.stack.pop(),this.showPreviousViewAndDeleteCurrent(t)}renderRootView(t){this.activeController=new t.viewController(t.props),this.activeController.navigator=this;const e=handleNavigationBar(t);e&&this.insertNavigationBarForPush();const s=this.activeController.render();"cover-vertical"==this.transition?s.style.transform="translateY(0)":"cover-horizontal"==this.transition&&(s.style.transform="translateX(0)"),s.style.opacity=1,s.style.transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",document.body.appendChild(s),setTimeout(t=>{if(e){const t=s.querySelector("scell-navigation-bar");t.leftSlotAssignedNode.hide(),t.shadowRoot.querySelector(".center-zone > span").style.transition="transform 0.2s  cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",s.style.paddingTop=getComputedStyle(t).height}},100)}insertNavigationBarForPush(){const t=this.stack[this.stack.length-2],e=this.stack[this.stack.length-1].options.title||`Title${this.stack.length}`;let s="";t&&(s=t.options.title||"Back");this.activeController.render().insertAdjacentHTML("afterbegin",`<scell-navigation-bar anim-back-title="true" title="${e}" back-title="${s}"><scell-back-button/></scell-navigation-bar>`);this.activeController.render().querySelector("scell-navigation-bar").navigator=this}insertNavigationBarForPop(){this.stack[this.stack.length-1];const t=this.stack[this.stack.length-2],e=this.stack[this.stack.length-3],s=t.options.title||`Title${this.stack.length}`;let o="";e&&(o=e.options.title||"Back");this.passiveController.render().insertAdjacentHTML("afterbegin",`<scell-navigation-bar title="${s}" back-title="${o}"><scell-back-button></scell-back-button></scell-navigation-bar>`);this.activeController.render().querySelector("scell-navigation-bar").navigator=this}showCurrentViewAndHidePrevious(t){const e=t.viewController;this.passiveController=this.activeController,this.activeController=new e(t.props),this.activeController.navigator=this;const s=handleNavigationBar(t);s&&this.insertNavigationBarForPush();const o=this.passiveController.render(),i=this.activeController.render();let r,a,n,l,c;if(document.body.appendChild(i),s){const t=o.querySelector("scell-navigation-bar");i.style.paddingTop=getComputedStyle(t).height,r=i.querySelector("scell-navigation-bar"),a=r.shadowRoot.querySelector(".center-zone > span"),(n=r.shadowRoot.querySelector(".back-zone > span")).parentElement.onclick=(t=>{this.pop()}),l=t.shadowRoot.querySelector(".center-zone > span"),c=r.leftSlotAssignedNode}"cover-vertical"==this.transition?(i.style.transform="translateY(10%)",i.style.opacity=.5):(i.style.transform="translateX(100%)",s&&(a.style.opacity=0,n.style.opacity=.3,l.style.opacity=0,c.style.opacity=0)),setTimeout(t=>{i.style.transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",s&&(n.style.transition="transform 0.2s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",a.style.transition="transform 0.2s  cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",c.style.transition="opacity 0.4s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",c.style.opacity=1);const e=o.shadowRoot.querySelector(".shadow-pane");e.style.display="",setTimeout(t=>{"cover-vertical"==this.transition?(i.style.transform="translateY(0)",i.style.opacity=1,setTimeout(t=>{o.style.display="none"},500)):"cover-horizontal"==this.transition&&(o.style.transform="translateX(-30%)",e.style.opacity=.4,i.style.transform="translateX(0)",s&&(a.style.opacity=1,n.style.transform="translateX(0%)",n.style.opacity=1),setTimeout(t=>{o.style.display="none"},500))},100)},16)}showPreviousViewAndDeleteCurrent(t){const e=null!=t?t.viewController:null,s=this.passiveController.render(),o=this.activeController.render(),i=s.shadowRoot.querySelector(".shadow-pane");let r,a,n,l,c,h,y;s.style.display="";const p=t&&handleNavigationBar(t);p&&(h=s.querySelector("scell-navigation-bar"),c=(y=o.querySelector("scell-navigation-bar")).shadowRoot.querySelector(".center-zone > span"),l=y.shadowRoot.querySelector(".back-zone > span"),n=h.shadowRoot.querySelector(".center-zone > span"),a=h.shadowRoot.querySelector(".back-zone > span"),r=h.leftSlotAssignedNode,"cover-vertical"==!this.transition&&(n.style.opacity=0,a.style.transform="translateX(-50%)",l.style.opacity=.3,r.style.opacity=0)),setTimeout(c=>{if("cover-vertical"==this.transition?(s.style.display="block",o.style.transform="translateY(10%)",o.style.opacity=0):(o.style.transform="translateX(100%)",s.style.transform="translateX(0%)",i.style.opacity=0,p&&(l.style.opacity=0,n.style.opacity=1,a.style.transform="translateX(0%)",r.style.opacity=1),setTimeout(t=>{i.style.display="none"},400)),p){this.passiveController.render().querySelector("scell-navigation-bar").leftSlotAssignedNode.hide()}setTimeout(s=>{o.remove(),this.activeController=this.passiveController,e&&(this.passiveController=new e(t.props),this.passiveController.router=this,p&&(this.insertNavigationBarForPop(),this.passiveController.render().style.paddingTop=getComputedStyle(h).height),document.body.insertBefore(this.passiveController.render(),this.activeController.render()),"cover-vertical"==this.transition?this.passiveController.render().style.transform="":(this.passiveController.render().style.transform="translateX(-30%)",this.passiveController.render().style.transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"))},500)},100)}};
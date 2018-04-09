var tabBarTemplateString = "<slot></slot><style>:host {\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: 50px;\n        display: flex;\n        background: #fff;\n    }\n\n    ::slotted(scell-tab) {\n        align-self: center;\n        flex-grow: 1;\n        text-align: center;\n        cursor: pointer;\n        display: flex;\n        flex-direction: column;\n    }</style>";

var tabTemplateString = "<slot><!-- ICON SLOT --></slot><span><!-- title --></span><style>::slotted(moko-icon) {\n        flex-grow: 1;\n        height: 18px;\n        padding-bottom: 5px;\n    }\n    span {\n        flex-grow: 1;\n    }</style>";

const tabBarTemplate = document.createElement('template');
tabBarTemplate.innerHTML = tabBarTemplateString;

const tabTemplate = document.createElement('template');
tabTemplate.innerHTML = tabTemplateString;
    
if (window.ShadyCSS) {
    ShadyCSS.prepareTemplate(tabBarTemplate,'scell-tab-bar');
    ShadyCSS.prepareTemplate(tabTemplate,'scell-tab');
}
    
class Tab extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(tabTemplate.content.cloneNode(true));
    }

    connectedCallback() {

        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
            
        const $span = this.shadowRoot.querySelector('span');
        if (this.getAttribute('title')) {
            $span.innerHTML = this.getAttribute('title');
        }

        const mokoIcon = this.querySelector('moko-icon');
        if (mokoIcon) {
            $span.style.fontSize = '0.7em';
        }
    }
}
customElements.define('scell-tab', Tab );

class TabBar extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild (tabBarTemplate.content.cloneNode(true));
    }

    resetActiveColorForTabs() {
        Array.prototype.forEach.call(this.querySelectorAll('scell-tab'), elem => {
            elem.style.color = null;
        });
    }

    setActive(index) {
        this.querySelectorAll('scell-tab')[index].style.color = this.getAttribute('active-color');
    }

    setActiveByTabName (name) {
        this.querySelector(`scell-tab[name="${name}"]`).style.color = this.getAttribute('active-color');
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);

        this.onclick = event => {
            const $source = event.target.closest('scell-tab');
            if ($source) {
                const name = $source.getAttribute('name');
                this.resetActiveColorForTabs();
                $source.style.color = this.getAttribute('active-color');          
            } 
            this.dispatchEvent(new CustomEvent('scell-tab-selected', { detail:{ name } }));
        };
    }
}

customElements.define('scell-tab-bar', TabBar);

export { Tab, TabBar };

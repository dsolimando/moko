var drawerTemplateString = "<style>.background-cache {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        left: 0;\n        top: 0;\n        transition: opacity 0.2s 0.1s linear;\n        background: #000;\n        opacity: 0;\n        z-index: 1;\n    }  \n    aside {\n        position: absolute;\n        width: 50%;\n        border-left: 1px solid #333;\n        height: 100%;\n        transition: transform 0.3s  cubic-bezier(0.25, 0.46, 0.45, 0.94);\n        top: 0;\n        z-index: 2;\n        left: 0;\n    }\n\n    :host {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        left: 0;\n        top: 0;\n    }</style><aside><slot></slot></aside><div class=\"background-cache\"></div>";

const drawerTemplate = document.createElement('template');
drawerTemplate.innerHTML = drawerTemplateString;
    
if (window.ShadyCSS)
    ShadyCSS.prepareTemplate(drawerTemplate,'scell-drawer');

class Drawer extends HTMLElement {

    constructor() {
        super();
        const $shadowRoot = this.attachShadow({mode:'open'});
        $shadowRoot.appendChild(drawerTemplate.content.cloneNode(true));
        this.aside = $shadowRoot.querySelector('aside');
        this.backgroundCache = $shadowRoot.querySelector('.background-cache');
    }

    connectedCallback () {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
            
        this.aside.style.width = this.getAttribute('width');
        this.aside.style.transform = 'translateX(-100%)';
        this.backgroundCache.style.opacity = 0;
        this.style.display = ' none';
    }

    open() {
        this.style.display = '';
        setTimeout( _ => {
            this.aside.style.transform = 'translateX(-1px)';
            this.backgroundCache.style.opacity = 0.3;
        },32);
    }

    close () {
        setTimeout( _ => {
            this.aside.style.transform = 'translateX(-100%)';
            this.backgroundCache.style.opacity = 0;
            setTimeout(_ => {
                this.style.display = 'none';
            },500);
        },32);
    }
}

customElements.define('scell-drawer', Drawer);

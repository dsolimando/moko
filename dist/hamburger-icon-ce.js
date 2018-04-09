var hamburgerTemplateString = "<style>:host div {\n        width: 16px;\n        height: 3px;\n        margin-bottom: 2px;\n        background-color: #fff;\n    }</style><div></div><div></div><div></div>";

const hamburgerTemplate = document.createElement('template');
hamburgerTemplate.innerHTML = hamburgerTemplateString;
    
if (window.ShadyCSS)
    ShadyCSS.prepareTemplate(hamburgerTemplate,'scell-hamburger-button');

class ScellHamburgerButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(hamburgerTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
            
        if (this.getAttribute('color')) {
            this.shadowRoot.querySelectorAll('div').forEach( $div => {
                $div.style.backgroundColor = this.getAttribute('color');
            });
        }
    }
}

customElements.define('scell-hamburger-button', ScellHamburgerButton);

export { ScellHamburgerButton };

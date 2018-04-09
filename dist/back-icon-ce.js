var backButtonTemplateString = "<style>:host {\n        transform: rotate(45deg);\n        height: 12px;\n        width: 12px;\n        border: 2px solid;\n        border-width: 0 0 2px 2px;\n    }</style><div class=\"back-button\"></div>";

const backButtonTemplate = document.createElement('template');
backButtonTemplate.innerHTML = backButtonTemplateString;
    
if (window.ShadyCSS)
    ShadyCSS.prepareTemplate(backButtonTemplate,'scell-back-button');

class ScellBackButon extends HTMLElement {
    constructor() {
        super();
        this.appendChild(backButtonTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
    }

    hide () {
        this.querySelector('.back-button').style.display = 'none';
    }
}

customElements.define('scell-back-button', ScellBackButon);

export { ScellBackButon };

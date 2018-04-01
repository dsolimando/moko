import hamburgerTemplateString from './hamburger-icon.html'

const hamburgerTemplate = document.createElement('template')
hamburgerTemplate.innerHTML = hamburgerTemplateString
    
if (window.ShadyCSS)
    ShadyCSS.prepareTemplate(hamburgerTemplate,'scell-hamburger-button')

export class ScellHamburgerButton extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode:'open'})
        shadowRoot.appendChild(hamburgerTemplate.content.cloneNode(true))
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
            
        if (this.getAttribute('color')) {
            this.shadowRoot.querySelectorAll('div').forEach( $div => {
                $div.style.backgroundColor = this.getAttribute('color')
            })
        }
    }
}

customElements.define('scell-hamburger-button', ScellHamburgerButton)
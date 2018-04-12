import backButtonTemplateString from './back-icon.html'

const backButtonTemplate = document.createElement('template')
backButtonTemplate.innerHTML = backButtonTemplateString
    
if (window.ShadyCSS)
    ShadyCSS.prepareTemplate(backButtonTemplate,'moko-back-button')

export class MokoBackButon extends HTMLElement {
    constructor() {
        super()
        this.appendChild(backButtonTemplate.content.cloneNode(true))
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
    }

    hide () {
        this.querySelector('.back-button').style.display = 'none'
    }
}

customElements.define('moko-back-button', MokoBackButon)
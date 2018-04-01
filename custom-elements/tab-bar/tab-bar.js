import tabBarTemplateString from './tab-bar.html'

const tabBarTemplate = document.createElement('template')
tabBarTemplate.innerHTML = tabBarTemplateString
    
if (window.ShadyCSS)
    ShadyCSS.prepareTemplate(tabBarTemplate,'scell-tab-bar')

export class ScellTab extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {

        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
            
        if (this.getAttribute('icon')) {
            const image = new Image()
            image.onload = event => {
                this.appendChild(image)
            }
            image.src = this.getAttribute('icon')
        }

        if (this.getAttribute('title')) {
            const span = document.createElement('span')
            span.innerText = this.getAttribute('title')
            this.appendChild(span)
        }
    }
}
customElements.define('scell-tab', ScellTab )

export class ScellTabBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode:'open'})
        shadowRoot.appendChild (tabBarTemplate.content.cloneNode(true))
    }

    resetActiveColorForTabs() {
        Array.prototype.forEach.call(this.querySelectorAll('scell-tab'), elem => {
            elem.style.color = null
        })
    }

    setActive(index) {
        this.querySelectorAll('scell-tab')[index].style.color = this.getAttribute('active-color')
    }

    setActiveByTabName (name) {
        this.querySelector(`scell-tab[name="${name}"]`).style.color = this.getAttribute('active-color')
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
        this.onclick = event => {
            let name
            if (event.target.matches('scell-tab > span')) {
                name = event.target.parentElement.getAttribute('name')
                this.resetActiveColorForTabs()
                event.target.parentElement.style.color = this.getAttribute('active-color')          
            } else if (event.target.matches('scell-tab')) {
                name = event.target.getAttribute('name')
                this.resetActiveColorForTabs()
                event.target.style.color = this.getAttribute('active-color')
            }
            this.dispatchEvent(new CustomEvent('scell-tab-selected', { detail:{ name } }))
        }
    }
}

customElements.define('scell-tab-bar', ScellTabBar) 
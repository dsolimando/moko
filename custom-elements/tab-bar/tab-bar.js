import tabBarTemplateString from './tab-bar.html'
import tabTemplateString from './tab.html'

const tabBarTemplate = document.createElement('template')
tabBarTemplate.innerHTML = tabBarTemplateString

const tabTemplate = document.createElement('template')
tabTemplate.innerHTML = tabTemplateString
    
if (window.ShadyCSS) {
    ShadyCSS.prepareTemplate(tabBarTemplate,'moko-tab-bar')
    ShadyCSS.prepareTemplate(tabTemplate,'moko-tab')
}
    
export class Tab extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode:'open'})
        shadowRoot.appendChild(tabTemplate.content.cloneNode(true))
    }

    connectedCallback() {

        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);
            
        const $span = this.shadowRoot.querySelector('span')
        if (this.getAttribute('title')) {
            $span.innerHTML = this.getAttribute('title')
        }

        const mokoIcon = this.querySelector('moko-icon')
        if (mokoIcon) {
            $span.style.fontSize = '0.7em';
        }
    }
}
customElements.define('moko-tab', Tab )

export class TabBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode:'open'})
        shadowRoot.appendChild (tabBarTemplate.content.cloneNode(true))
    }

    resetActiveColorForTabs() {
        Array.prototype.forEach.call(this.querySelectorAll('moko-tab'), elem => {
            elem.style.color = null
        })
    }

    setActive(index) {
        this.querySelectorAll('moko-tab')[index].style.color = this.getAttribute('active-color')
    }

    setActiveByTabName (name) {
        this.selected = name
    }

    set selected (name) {
        this.querySelector(`moko-tab[name="${name}"]`).style.color = this.getAttribute('active-color')
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);

        this.onclick = event => {
            const $source = event.target.closest('moko-tab')
            if ($source) {
                const name = $source.getAttribute('name')
                this.resetActiveColorForTabs()
                $source.style.color = this.getAttribute('active-color')  
                this.dispatchEvent(new CustomEvent('moko-tab-selected', { detail:{ name } }))        
            } 
        }
    }
}

customElements.define('moko-tab-bar', TabBar) 
import tabBarTemplateString from './tab-bar.html'
import tabTemplateString from './tab.html'

const tabBarTemplate = document.createElement('template')
tabBarTemplate.innerHTML = tabBarTemplateString

const tabTemplate = document.createElement('template')
tabTemplate.innerHTML = tabTemplateString
    
if (window.ShadyCSS) {
    ShadyCSS.prepareTemplate(tabBarTemplate,'scell-tab-bar')
    ShadyCSS.prepareTemplate(tabTemplate,'scell-tab')
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
customElements.define('scell-tab', Tab )

export class TabBar extends HTMLElement {
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
        this.selected = name
    }

    set selected (name) {
        this.querySelector(`scell-tab[name="${name}"]`).style.color = this.getAttribute('active-color')
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);

        this.onclick = event => {
            const $source = event.target.closest('scell-tab')
            if ($source) {
                const name = $source.getAttribute('name')
                this.resetActiveColorForTabs()
                $source.style.color = this.getAttribute('active-color')  
                this.dispatchEvent(new CustomEvent('scell-tab-selected', { detail:{ name } }))        
            } 
        }
    }
}

customElements.define('scell-tab-bar', TabBar) 
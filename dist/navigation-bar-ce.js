var navTemplateString = "<style>.back-zone {\n        flex-grow: 1;\n        width: 20%;\n        display: flex;\n        align-items: center;\n        padding-left: 10px;\n    }\n\n    .back-zone img {\n        width: 15px;\n    }\n\n    .back-zone span {\n        flex-grow: 1;\n    }\n\n    .center-zone {\n        flex-grow: 2;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .right-zone {\n        flex-grow: 1;\n        width: 20%;\n    }\n\n    :host {\n        display: flex;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 40px;\n        background: #fff;\n        color: #555;\n        box-sizing: border-box;\n    }</style><div class=\"back-zone\"><slot></slot><span></span></div><div class=\"center-zone\"><span></span></div><div class=\"right-zone\"><slot></slot></div>";

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navTemplateString;

if (window.ShadyCSS)
        ShadyCSS.prepareTemplate(navTemplate,'scell-navigation-bar');

class NavigationBar extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(navTemplate.content.cloneNode(true));
    }

    get leftSlotAssignedNode () {
        return this.shadowRoot.querySelectorAll('slot')[0].assignedNodes()[0]
    }

    get rightSlotAssignedNode () {
        const slots = this.shadowRoot.querySelectorAll('slot')[1].assignedNodes()[0];
    }

    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);

        this.$title = this.shadowRoot.querySelector('.center-zone > span');
        this.$title.innerText = this.getAttribute('title') || 'Title';

        this.$backTitle = this.shadowRoot.querySelector('.back-zone > span');
        this.$backTitle.innerText = this.getAttribute('back-title') || '';

        this.backZone = this.shadowRoot.querySelector('.back-zone');
        
        if (this.backZone && this.navigator && this.navigator.pop) {
            this.backZone.onclick = event => {
                this.navigator.pop();
            };
        }
        
        if (this.getAttribute('anim-back-title')) {
            this.$backTitle.style.transform = 'translateX(50px)';
        }

        this.backZone.onclick = event => {
            this.dispatchEvent(new CustomEvent('back-click'));
        };
    } 

    render () {
        setTimeout( _ => {
            this.$title.style.opacity = 1;
            this.$backTitle.style.opacity = 1;

            if (this.getAttribute('anim-back-title')) {
                this.$backTitle.style.transform = 'translateX(0)';
            }
        });
    }
}

customElements.define('scell-navigation-bar',NavigationBar);

export { NavigationBar };

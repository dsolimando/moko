var templateString = "<style>:host {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    box-sizing: border-box;\n    overflow: hidden;\n    -webkit-tap-highlight-color: transparent;\n}\n\n.shadow-pane {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    background: #000;\n    opacity: 0;\n    transition: opacity 0.2s;\n}</style><div class=\"shadow-pane\" style=\"display:none\"></div><slot></slot><slot></slot><slot></slot>";

const template = document.createElement('template');
template.innerHTML = templateString;

if (window.ShadyCSS)
    ShadyCSS.prepareTemplate(template,'scell-view');
    
class View extends HTMLElement {

    constructor() {
        super();
        const $shadowRoot = this.attachShadow({mode:'open'});
        $shadowRoot.appendChild(template.content.cloneNode(true));
        
    }

    render() {
        
        if (this.getAttribute('transition'))
            this.style.visibility = null;

        if (this.getAttribute("transition") == 'cover-vertical') {
            setTimeout( _ => {
                this.style.transform = 'translateY(0)';
            });
        } else if (this.getAttribute("transition") == 'cover-horizontal') {
            setTimeout( _ => {
                this.style.transform = 'translateX(0)';
            });
        } else if (this.getAttribute("transition") == 'fade-in') {
            setTimeout( _ => {
                this.style.opacity = 1;
            });
        }
    }

    hide () {
        if (this.getAttribute('transition') == 'cover-vertical') {
            setTimeout( _ => {
                //this.style.transform = 'perspective(100px) translate3D(0,0,-10px)'
                this.style.transform = 'translateY(100%)';
                //this.style.opacity = 0.
            });
        } else if (this.getAttribute('transition') == 'cover-horizontal') {
            setTimeout( _ => {
                this.style.transform = 'translateX(100%)';
            });
        } else if (this.getAttribute("transition") == 'fade-in') {
            setTimeout( _ => {
                this.style.opacity = 0;
            });
        }
    }
    
    connectedCallback() {
        if (window.ShadyCSS)
            ShadyCSS.styleElement(this);

        this.toopacity = getComputedStyle(this).opacity;
        
        if (this.getAttribute("transition") == 'cover-vertical') {
            this.style.transform = 'translateY(100%)';
        } else if (this.getAttribute("transition") == 'cover-horizontal') {
            this.style.transform = 'translateX(100%)';
        } else if (this.getAttribute("transition") == 'fade-in') {
            this.style.opacity = 0;
        }
        if (this.getAttribute("transition")) {
            this.style.visibility = 'hidden';
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    }
}
customElements.define('scell-view',View);

export { View };

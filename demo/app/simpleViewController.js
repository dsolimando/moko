const $template  = document.querySelector('#view1')
const $template4  = document.querySelector('#view4')
const $template3 = document.querySelector('#view3')

export class BlackSimpleViewController  {

    constructor() {
        this.$el = $template.content.cloneNode(true).firstElementChild
        this.$el.style.background = 'yellow'

        this.$el.querySelector('button').onclick = event => {
            this.$el.hide()
            setTimeout (_ => {this.$el.remove()},500)
        }

        this.$el.querySelector('#b2').onclick = event => {
            navigator.push({
                viewController:RedSimpleViewController,
                title:"Red"
            })
        }
    }

    render () {
        return this.$el
    }
}

export class RedSimpleViewController  {

    constructor() {
        this.$el = $template.content.cloneNode(true).firstElementChild
        this.$el.style.background = 'red'

        this.$el.querySelector('button').onclick = event => {
            this.$el.hide()
            setTimeout (_ => {this.$el.remove()},500)
        }
    }

    render () {
        return this.$el
    }
}

export class GreenSimpleViewController  {

    constructor() {
        this.$el = $template.content.cloneNode(true).firstElementChild
        this.$el.style.background = 'green'

        this.$el.querySelector('button').onclick = event => {
            this.$el.hide()
            setTimeout (_ => {this.$el.remove()},500)
        }
    }

    render () {
        return this.$el
    }
}

export class View4Controller {

    constructor() {
        this.$el = $template4.content.cloneNode(true)
        this.$el.querySelector('scell-view').style.background = '#fff'
        this.navigationBar = this.$el.querySelector('scell-navigation-bar')
        this.ham = this.navigationBar.querySelector('scell-hamburger-button')
        
        this.drawer = this.$el.querySelector('scell-drawer')
        this.ham.addEventListener('click', event => {
            this.drawer.open()
                })
        
        this.drawer.onclick = event => {
             this.drawer.close()
        }
    }

    render () {
        return this.$el
    }
}

export class View3ControllerBlack {
    
    constructor() {
        this.$el = $template3.content.cloneNode(true).firstElementChild
        this.$el.style.background = '#000'
        this.$el.querySelector('#b2').onclick = event => {
            this.navigator.push({
                viewController:View3ControllerRed
            })
        }
        this.$el.querySelector('button').style.display = 'none'
    }

    render () {
        return this.$el
    }
} 

export class View3ControllerRed {
    constructor() {
        this.$el = $template3.content.cloneNode(true).firstElementChild
        this.$el.style.background = 'red'
        this.$el.querySelector('button').onclick = event => {
            this.navigator.push({
                viewController:View3ControllerBlack
            })
        }
        this.$el.querySelector('#b2').style.display = 'none'
    }

    render () {
        return this.$el
    }
}
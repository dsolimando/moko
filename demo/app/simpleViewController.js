const $template  = document.querySelector('template')

export class SimpleViewController  {

    constructor(props) {
        this.$el = $template.content.cloneNode(true).firstElementChild
        this.$el.style.background = props.color

        this.$el.querySelector('button').onclick = event => {
            this.navigator.pop()
        }
    }

    render () {
        return this.$el
    }
}

export class EmptyViewController {

    constructor(props) {
        this.$el = $template.content.cloneNode(true)
        this.$el.querySelector('scell-view').style.background = props.color || '#E2CFEA'
    
    }

    render () {
        return this.$el
    }
}
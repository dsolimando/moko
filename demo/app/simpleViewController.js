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
        this.$el.queryselector('moko-view').style.background = props.color || '#E2CFEA'
        const $span = this.$el.querySelector('span')
        $span && props.text && ($span.innerText = props.text)
    }

    render () {
        return this.$el
    }
}
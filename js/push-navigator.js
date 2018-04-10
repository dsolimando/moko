export default class PushNavigator  {

    push (state) {
        const props = state.props || {}
        const controller = new state.viewController(props)
        controller.navigator = this
        let view = controller.render()
        document.body.appendChild(view)

        if (view.nodeName == '#document-fragment')
            view = document.body.lastElementChild

        setTimeout( _ => {
            view.render()
        },64)
    }
}

mobileComponents = window.mobileComponents || {}
moco = mobileComponents

;( _ => {
    class StackState {
    
        get options () { return this.options }
        set options (options) { this.options = options }

        get viewController  () { return this.viewController }
        set viewController (viewController) { this.viewController = viewController}
    }

    class StackNavigator {

        constructor(transition, rootState) {
            this.stack = [rootState]
            this.passiveController = null
            this.transition = transition
            
            this.renderRootView(rootState)
        }

        push (state) {
            
            const lastState2 = this.stack[this.stack.length-2]
            this.stack.push(state)

            if (lastState2) {
                this.passiveController.render().remove()
            }
            
            this.showCurrentViewAndHidePrevious(state.viewController)
        }

        pop() {
            const lastState3 = this.stack[this.stack.length-3]
            this.stack.pop()
            this.showPreviousViewAndDeleteCurrent(lastState3)
        }

        renderRootView (rootState) {
            
            this.activeController = new rootState.viewController(rootState.props)
            this.activeController.navigator = this

            this.insertNavigationBarForPush()
            const rootView = this.activeController.render()
            
            if (this.transition == 'cover-vertical') {
                rootView.style.transform = 'translateY(0)'
            } else if (this.transition == 'cover-horizontal') {
                rootView.style.transform = 'translateX(0)'
            } 
            
            rootView.style.opacity = 1
            rootView.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            document.body.appendChild(rootView)

            rootView.addEventListener('dom-complete', event => {
                alert('toto')
            })
            setTimeout (_ => {
                const navigationBar = rootView.querySelector('scell-navigation-bar')
                navigationBar.leftSlotAssignedNode.hide()
                navigationBar.shadowRoot.querySelector('.center-zone > span').style.transition = 'transform 0.2s  cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                rootView.style.paddingTop = getComputedStyle(navigationBar).height
            },100)
        }

        insertNavigationBarForPush() {

            const lastState = this.stack[this.stack.length-2]
            const newState =  this.stack[this.stack.length-1]

            const title = newState.options.title || `Title${this.stack.length}`
            let backTitle = ''
            if (lastState) {
                backTitle = lastState.options.title || 'Back'
            }
            
            const $navBar = this.activeController.render().insertAdjacentHTML(
                'afterbegin',
                `<scell-navigation-bar anim-back-title="true" title="${title}" back-title="${backTitle}"><scell-back-button/></scell-navigation-bar>`
            )
            this.activeController.render().querySelector('scell-navigation-bar').navigator = this
        }

        insertNavigationBarForPop() {

            const currentState = this.stack[this.stack.length-1]
            const lastState =  this.stack[this.stack.length-2]
            const lastlastState =  this.stack[this.stack.length-3]

            const title = lastState.options.title || `Title${this.stack.length}`
            let backTitle = ''
            if (lastlastState) {
                backTitle = lastlastState.options.title || 'Back'
            }
            
            const $navBar = this.passiveController.render().insertAdjacentHTML(
                'afterbegin',
                `<scell-navigation-bar title="${title}" back-title="${backTitle}"><scell-back-button></scell-back-button></scell-navigation-bar>`
            )
            this.activeController.render().querySelector('scell-navigation-bar').navigator = this
        }

        showCurrentViewAndHidePrevious (currentControllerClass) {
            this.passiveController = this.activeController
            this.activeController = new currentControllerClass(this.activeController.props)
            this.activeController.navigator = this

            this.insertNavigationBarForPush()

            const passiveView = this.passiveController.render()
            const activeView = this.activeController.render()

            document.body.appendChild(activeView)

            const navBarPassiveView = passiveView.querySelector('scell-navigation-bar')
            activeView.style.paddingTop = getComputedStyle(navBarPassiveView).height
            const navBarActiveView = activeView.querySelector('scell-navigation-bar')
            const activeTitleSpan = navBarActiveView.shadowRoot.querySelector('.center-zone > span')
            const activeBackSpan = navBarActiveView.shadowRoot.querySelector('.back-zone > span')
            
            activeBackSpan.parentElement.onclick = event => {
                this.pop()
            }

            const passiveTitleSpan = navBarPassiveView.shadowRoot.querySelector('.center-zone > span')
            const backButton = navBarActiveView.leftSlotAssignedNode
            
            if (this.transition == 'cover-vertical') {
                activeView.style.transform = 'translateY(10%)'
                activeView.style.opacity = 0.5
            } else {
                activeView.style.transform = 'translateX(100%)'
                activeTitleSpan.style.opacity = 0
                activeBackSpan.style.opacity = 0.3
                passiveTitleSpan.style.opacity = 0
                backButton.style.opacity = 0
            }

            setTimeout( _ => {
                activeView.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                activeBackSpan.style.transition = 'transform 0.2s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                activeTitleSpan.style.transition = 'transform 0.2s  cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                backButton.style.transition = 'opacity 0.4s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

                const $shadowPane = passiveView.shadowRoot.querySelector('.shadow-pane')
                $shadowPane.style.display = ''

                backButton.style.opacity = 1
                
                setTimeout ( _ => {
                    if (this.transition == 'cover-vertical') {
                        activeView.style.transform = 'translateY(0)'
                        activeView.style.opacity = 1

                        setTimeout ( _ => { passiveView.style.display = 'none' },500)
                    } else if (this.transition == 'cover-horizontal') {
                        passiveView.style.transform = 'translateX(-30%)'
                        $shadowPane.style.opacity = 0.4
                        activeView.style.transform = 'translateX(0)'
                        activeTitleSpan.style.opacity = 1
                        activeBackSpan.style.transform = 'translateX(0%)'
                        activeBackSpan.style.opacity = 1
                        setTimeout( _ => {
                            passiveView.style.display = 'none'
                        },500)
                    }
                },100)
            },16)
        }

        showPreviousViewAndDeleteCurrent (previousState) {
            
            const previousControllerClass = previousState != null ? previousState.viewController: null
            const passiveView = this.passiveController.render()
            const activeView = this.activeController.render()
            const $shadowPane = passiveView.shadowRoot.querySelector('.shadow-pane')
            passiveView.style.display = ''

            const navBarPassiveView = passiveView.querySelector('scell-navigation-bar')
            const navBarActiveView = activeView.querySelector('scell-navigation-bar')
            const activeTitleSpan = navBarActiveView.shadowRoot.querySelector('.center-zone > span')
            const activeBackSpan = navBarActiveView.shadowRoot.querySelector('.back-zone > span')
            const passiveTitleSpan = navBarPassiveView.shadowRoot.querySelector('.center-zone > span')
            const passiveBackSpan = navBarPassiveView.shadowRoot.querySelector('.back-zone > span')
            const backButton = navBarPassiveView.leftSlotAssignedNode

            if (!this.transition == 'cover-vertical') {
                passiveTitleSpan.style.opacity = 0
                passiveBackSpan.style.transform = 'translateX(-50%)'
                activeBackSpan.style.opacity = 0.3
                backButton.style.opacity = 0
            }

            setTimeout( _ => {
                if (this.transition == 'cover-vertical') {
                    passiveView.style.display = 'block'
                    activeView.style.transform = 'translateY(10%)'
                    activeView.style.opacity = 0
                
                } else {
                    activeBackSpan.style.opacity = 0
                    passiveTitleSpan.style.opacity = 1
                    activeView.style.transform = 'translateX(100%)'
                    passiveView.style.transform = 'translateX(0%)'
                    passiveBackSpan.style.transform = 'translateX(0%)'
                    $shadowPane.style.opacity = 0
                    backButton.style.opacity = 1
                    setTimeout( _ =>  {
                        $shadowPane.style.display = 'none'
                    },400)
                }

                if (!previousControllerClass) {
                    const navbar = this.passiveController.render().querySelector('scell-navigation-bar')
                    navbar.leftSlotAssignedNode.hide()
                }
                setTimeout( _ => {
                    activeView.remove()
                        
                    this.activeController = this.passiveController
                    if (previousControllerClass) {
                        this.passiveController = new previousControllerClass(previousState.props)
                        this.passiveController.router = this
                        this.insertNavigationBarForPop()
                        this.passiveController.render().style.paddingTop = getComputedStyle(navBarPassiveView).height
                        document.body.insertBefore(this.passiveController.render(),this.activeController.render())
                        
                        if (this.transition == 'cover-vertical') {
                            this.passiveController.render().style.transform = ''
                        } else {
                            this.passiveController.render().style.transform = 'translateX(-30%)'
                            this.passiveController.render().style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }
                    }
                },500)
            },100)
        }
    }

    moco.StackState = StackState
    moco.StackNavigator = StackNavigator
})()
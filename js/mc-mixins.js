
mobileComponents = window.mobileComponents || {};
moko = mobileComponents
mobileComponents.controllerMixins = mobileComponents.controllerMixins || {
    
     /**
     * Return the root DOM $el fielf handled by this controller 
     */
    render() {
        return this.$el
    },

    /**
     * Destroy the controller, removing $el from his parent and 
     * unregistering routing events
     */
    destroy () {
        this.render().remove()
        if (this.navigator && this.navigator.onhashchange) {
            removeEventListener('hashchange', this.navigator.onhashchange)
        }
    }
}
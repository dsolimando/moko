/**
 * @param {string} currentRelativeLocation
 * @param {string} routePattern
 * @return {{match: (RegExpMatchArray | null), urlData}}
 */
function isLocationPathMatchingRoute(currentRelativeLocation, routePattern) {
  const pattern = /(:\w+)/g
  const foundVars = routePattern.match(pattern) || []
  let extractedVars = []
  if (foundVars.length > 0) {
    extractedVars = foundVars.map(word => {
      // Remove slash
      return word.slice(1)
    })
  }

  const routeRegExp = new RegExp(routePattern.replace(pattern, '(\\w+)'))

  const match = currentRelativeLocation.match(routeRegExp)
  let urlData = {}
  if (match) {
    const [a, ...matchData] = match

    for (var index = 0; index < foundVars.length; index++) {
      urlData[extractedVars[index]] = matchData[index]
    }
  }
  return {
    match,
    urlData
  }
}

const once = f => {
  let i = 0
  return () => i++ < 1 && f()
}

/**
 * @typedef matchedResult
 * @property {MokoRoute} matchedRouteLocation
 * @property {RegExpMatchArray} matchedResult
 * @property {MokoRoute} ancestorMatchedRoute
 * @property {boolean} routeChanged
 */

export class NavigatorElement extends HTMLElement {
  constructor() {
    super()
  }

  extractChildRoutes() {
    this.routes = Array.from(this.children).filter(
      e => e.tagName === 'MOKO-ROUTE'
    )
  }

  /*updateToAbsoluteRoutes() {
    this.routes.map( route => this.navigators.reduce( (p, n) => p. ))
  }*/

  searchAncestor(foundAncestors) {
    const ancestor = foundAncestors[0].parentElement.closest(
      'moko-switch-navigator, moko-stack-navigator, moko-tab-navigator'
    )
    if (ancestor) {
      return this.searchAncestor([ancestor, ...foundAncestors])
    } else {
      return foundAncestors
    }
  }

  getContentElement() {
    return this.routes[this.routes.length - 1].nextElementSibling
  }

  connectedCallback() {
    this.extractChildRoutes()
    if (!this.navigators) {
      this.navigators = this.searchAncestor([this])
    }
    addEventListener('hashchange', this)
  }

  disconnectedCallback() {
    removeEventListener('hashchange', this)
  }

  navigate(path) {
    location.hash = `${this.getAncestorMatchedRoute()}/${path}`
  }

  getAncestorMatchedRoute() {
    return this.navigators.length > 1
      ? this.navigators[this.navigators.length - 2].matchedRouteLocation
      : ''
  }

  syncHref(element = this) {
    const $nestedNavigators = [
      ...element.querySelectorAll(
        'moko-route[selected="true"], moko-tab-route[selected="true"]'
      )
    ]
    const tabPath =
      location.href.split('#')[0] +
      '#' +
      this.getAncestorMatchedRoute() +
      (this.getAncestorMatchedRoute() ? '/' : '') +
      this.matchedRouteLocation

    $nestedNavigators.reduce((path, route) => {
      const nextPath = `${path}/${route.path}`

      if (nextPath !== location.href) {
        history.pushState({}, nextPath, nextPath)
      } else {
        history.replaceState({}, nextPath, nextPath)
      }
      return nextPath
    }, tabPath)
  }

  /**
   * @return {matchedResult}
   */
  searchMatchingRoute() {
    let ancestorMatchedRoute = this.getAncestorMatchedRoute()

    let currentRelativeLocation = location.hash
      .substring(1) // removing leading #
      .replace(ancestorMatchedRoute, '')

    currentRelativeLocation =
      currentRelativeLocation[0] === '/'
        ? currentRelativeLocation.replace('/', '')
        : currentRelativeLocation

    let matchedRoute
    let matchedResult
    let routeChanged
    let matchedRouteLocation

    // when we navigate back to initial empty location.href page
    if (currentRelativeLocation === '') {
      this.matchedRouteLocation = ''
    } else {
      // Search for a matching route
      for (const route of this.routes) {
        route.selected = false
        const result = isLocationPathMatchingRoute(
          currentRelativeLocation,
          route.path
        )
        if (result.match) {
          matchedResult = result
          matchedRoute = route
          matchedRoute.selected = true

          matchedRouteLocation = `${ancestorMatchedRoute}${
            ancestorMatchedRoute ? '/' : ''
          }${matchedResult.match[0]}`
          routeChanged = matchedRouteLocation !== this.matchedRouteLocation
          break
        }
      }

      if (routeChanged) this.matchedRouteLocation = matchedRouteLocation
    }

    return {
      matchedRoute,
      matchedResult,
      ancestorMatchedRoute,
      routeChanged
    }
  }
}

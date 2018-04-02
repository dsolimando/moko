# Moko
A lightweight WebComponents based mobile JS lib inspired by native mobile SDK's.

Moko provides the basic stuffs you need in order to develop a mobile web app. Things like:

* a view controller with built-in render animations 
* a tab-bar
* a navigation bar
* a drawer
* an hamburger icon

Each of these web components are available as ES6 modules (see the [dist](https://github.com/dsolimando/moko/tree/master/dist) folder).

### moko - native SDK's comparison table

| Moko          | Ios              | Android                  |
| ------------- |----------------  | ---                      |
| [View](https://github.com/dsolimando/moko/blob/master/custom-elements/view-controller/view-controller.js)          | UIViewController | Activity                 |
| [TabBar](https://github.com/dsolimando/moko/blob/master/custom-elements/tab-bar/tab-bar.js)        | UITabBar         | BottomNavigationView     |
| [NavigationBar](https://github.com/dsolimando/moko/blob/master/custom-elements/navigation-bar/navigation-bar.js) | UINavigationBar | Toolbar |
| [Drawer](https://github.com/dsolimando/moko/blob/master/custom-elements/drawer/drawer.js) | -- |  DrawerLayout |

## Navigators

It also provides [React Navigation](https://reactnavigation.org) inspired navigators:

* a push navigator
* a zone navigator
* a stack navigator

A navigator handles routing aspects of an app and transitions between views. Typical scenario are:

* Pushing a view on screen with an from bottom or from right animation (push navigator)
* Replacing the content of a view with another content ( zone navigator)
* Managing navigation through a hierarchy of views (navigation controller)

A navigator expose the **push** method in order no navigate to an other view. That method takes an object as parameter that must contain at least a **viewController** attribute that reference a controller class.

```Javascript
navigator.push({
    viewController:MyViewController
})
```

The viewController class must implement the folling interface:

```Javascript
interface Controller {
  View render()
}
```

## Examples

Please explore the demo folder to find various examples.

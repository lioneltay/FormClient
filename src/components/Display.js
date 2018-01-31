import * as React from "react"
const { cloneElement, Children } = React

/**
 * When the component is not visible, it adds display: 'none' to the style prop of all its children,
 * The children have to be native dom elements for this to work.
 *
 * Purpose, conditionally rendering components, but only visually. Does not remove the component from the component tree so that it can keep its state.
 * Probably could add this as a feature to redux-ui-tekk as a 'destroyOnUnmount' prop.
 * Would need to consider when the state would be destroyed instead to prevent memory leaks.
 */
const Display = ({ visible, children }) =>
  Children.map(children, child => {
    const childStyle = child.props.style || {}
    const style = { ...childStyle }
    if (!visible) {
      style.display = "none"
    }
    return cloneElement(child, { ...child.props, style })
  })

export default Display

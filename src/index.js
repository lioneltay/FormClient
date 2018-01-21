import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "App"
import "styles/styles.scss"

import createStore from "store/createStore"

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
)

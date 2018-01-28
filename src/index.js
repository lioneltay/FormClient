import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "./globals"

import App from "App"
import "styles/styles.css"

import createStore from "store/createStore"

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
)

import * as React from "react"
import { connect } from "react-redux"

import { Header } from "containers"
import Root from "pages"

import { BrowserRouter, Route } from "react-router-dom"

@connect(state => ({ state }))
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Root />
        </div>
      </BrowserRouter>
    )
  }
}

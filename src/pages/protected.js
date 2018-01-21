import * as React from "react"
import { connect } from "react-redux"

import { Redirect } from "react-router-dom"

import { loggedIn } from "store/modules/auth/selectors"

const Protected = connect(state => ({ showContent: loggedIn(state) }))(
  ({ showContent }) => {
    if (!showContent) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h1>Protected</h1>
      </div>
    )
  }
)

export default Protected

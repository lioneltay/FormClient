import * as React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { connect } from "react-redux"

import Home from "./home"
import Signup from "./signup"
import Login from "./login"
import Logout from "./logout"
import Protected from "./protected"
import Posts from "./posts"
import Users from "./users"
import Threads from "./threads"

const Root = connect(state => ({
  state,
}))(({ state }) => {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/protected" component={Protected} />
        <Route path="/posts" component={Posts} />
        <Route path="/users" component={Users} />
        <Route path="/threads" component={Threads} />
        <Route render={() => <Redirect to="/home" />} />
      </Switch>

      <hr />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
})

export default Root

import * as React from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import Home from "./home"
import Signup from "./signup"
import Login from "./login"
import Logout from "./logout"

const Root = () => {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route render={() => <Redirect to="/home" />} />
      </Switch>
    </div>
  )
}

export default Root

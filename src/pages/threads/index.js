import * as React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { Route, Switch } from "react-router-dom"

import CreateThread from "./create"
import ThreadView from "./var/var"
import ThreadsPage from "./page"

export default class Threads extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/threads/create" exact component={CreateThread} />
          <Route path="/threads/:id/:title" component={ThreadView} />
          <Route path="/threads" exact component={ThreadsPage} />
        </Switch>
      </div>
    )
  }
}

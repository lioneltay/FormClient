import * as React from "react"
import { Route, Switch } from "react-router-dom"

import ThreadInstancePage from "./page"
import ThreadEdit from "./edit"

export default class ThreadInstanceController extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/threads/:id/:title"
            exact
            component={ThreadInstancePage}
          />
          <Route path="/threads/:id/:title/edit" exact component={ThreadEdit} />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </div>
    )
  }
}

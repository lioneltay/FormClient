import * as React from "react"
import { connect } from "react-redux"

import { Header } from "containers"
import Root from "pages"

import { BrowserRouter, Route } from "react-router-dom"

import { ApolloProvider } from "react-apollo"
import graphqlClient from "services/graphql-client"

import { getCurrentUser } from "store/modules/auth/actions"
import { Snackbar } from "components/global"

const Fragment = React.Fragment

@connect(null, { getCurrentUser })
export default class App extends React.Component {
  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={graphqlClient}>
          <Fragment>
            <Snackbar />

            <Header />
            <div className="container">
              <Route component={Root} />
            </div>
          </Fragment>
        </ApolloProvider>
      </BrowserRouter>
    )
  }
}

import * as React from "react"
import { connect } from "react-redux"

const { Fragment } = React

@connect(state => ({ state }))
export default class App extends React.Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Fragment>
          <div
            style={{ border: "1px solid black", padding: "25px", width: "50%" }}
          >
            <h3>App Component</h3>
          </div>
          <div
            style={{ border: "1px solid black", padding: "25px", width: "50%" }}
          >
            <h3>Store State</h3>
            <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
          </div>
        </Fragment>
      </div>
    )
  }
}

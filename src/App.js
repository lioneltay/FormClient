import * as React from "react"
import { connect } from "react-redux"

@connect(state => ({ state }))
export default class Root extends React.Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
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
      </div>
    )
  }
}

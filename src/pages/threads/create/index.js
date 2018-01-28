import * as React from "react"

import CreateThreadForm from "./CreateThreadForm"

export default class CreateThread extends React.Component {
  render() {
    return (
      <div>
        <h1>Create Thread</h1>
        <CreateThreadForm />
      </div>
    )
  }
}

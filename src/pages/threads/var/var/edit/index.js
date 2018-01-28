import * as React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { SubmitButton } from "components/form"

import ThreadEditForm from "./ThreadEditForm"

const threadQuery = gql`
  query ThreadQuery($id: ID!) {
    thread(id: $id) {
      id
      title
      content
    }
  }
`

const updateThreadMutation = gql`
  mutation EditThread($id: ID!, $title: String, $content: String) {
    updateThread(id: $id, content: $content, title: $title) {
      id
      title
      content
    }
  }
`

@graphql(threadQuery, {
  options: ({ match: { params: { id } } }) => {
    return {
      variables: { id },
    }
  },
})
@graphql(updateThreadMutation, {
  props: ({ mutate, ownProps }) => {
    const { history, match: { params: { id } } } = ownProps

    return {
      onSubmit: ({ title, content }) => {
        return mutate({ variables: { id, title, content } }).then(
          ({ data: { updateThread: thread } }) => {
            const { id, title } = thread
            history.push(`/threads/${id}/${title}`)
          }
        )
      },
    }
  },
})
export default class ThreadEditPage extends React.Component {
  render() {
    if (this.props.data.loading) {
      return null
    }

    const { id, title, content } = this.props.data.thread

    return (
      <div>
        <h5>Edit Thread: {title}</h5>

        <ThreadEditForm
          onSubmit={this.props.onSubmit}
          initialValues={{ title, content }}
        />

        <SubmitButton form="ThreadEditForm">Submit</SubmitButton>
        <button
          onClick={() => this.props.history.push(`/threads/${id}/${title}`)}
        >
          Back
        </button>
      </div>
    )
  }
}

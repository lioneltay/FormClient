import * as React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import { Thread } from "components/forum"

const threadQuery = gql`
  query ThreadQuery($id: ID) {
    thread(id: $id) {
      id
      created_at
      title
      content
      author {
        id
        full_name
      }
      rootComments {
        id
      }
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
export default class ThreadInstancePage extends React.Component {
  render() {
    const { data, history } = this.props

    if (data.loading) {
      return null
    }

    const { title, id, content, author = {}, rootComments = [] } = data.thread

    return (
      <div>
        <Thread {...data.thread} />

        <div className="mt-2">
          <button onClick={() => history.push(`/threads/${id}/${title}/edit`)}>
            Edit
          </button>

          <button onClick={() => history.push(`/threads`)}>Back</button>
        </div>
      </div>
    )
  }
}

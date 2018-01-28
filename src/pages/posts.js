import * as React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import * as R from "ramda"

const commentsQuery = gql`
  query {
    comments {
      id
      content
    }
  }
`

@graphql(commentsQuery)
export default class Users extends React.Component {
  render() {
    console.log("PROPS", this.props)

    return (
      <div>
        <h1>Comments</h1>
        {R.pathOr([], ["data", "comments"], this.props).map(comment => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    )
  }
}

const Comment = ({ id, content }) => {
  return (
    <div className="mt-1">
      <div>{id}</div>
      <div>{content}</div>
    </div>
  )
}

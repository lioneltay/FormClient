import * as React from "react"
import PropTypes from "prop-types"
import { Comment } from "components/forum"

import gql from "graphql-tag"
import { graphql } from "react-apollo"

const commentQuery = gql`
  query CommentQuery($id: ID!) {
    comment(id: $id) {
      id
      createdAt
      content
      author {
        id
        email
        full_name
      }
      subComments {
        id
      }
    }
  }
`

class Intermediary extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = { collapsed: false }

  toggleCollapse = () =>
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }))

  render() {
    const { data } = this.props
    if (data.loading) {
      return null
    }

    const { comment } = data

    return (
      <Comment
        {...comment}
        subComments={comment.subComments.map(({ id }) => (
          <CommentC key={id} id={id} />
        ))}
        collapsed={this.state.collapsed}
        onToggleCollapse={this.toggleCollapse}
      />
    )
  }
}

const CommentC = graphql(commentQuery, {
  options: ({ id }) => ({ variables: { id } }),
})(Intermediary)

export default CommentC

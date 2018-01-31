import * as React from "react"
import PropTypes from "prop-types"
import { Comment } from "components/forum"

import gql from "graphql-tag"
import { graphql } from "react-apollo"

const commentQuery = gql`
  query CommentQuery($id: ID!) {
    comment(id: $id) {
      id
      created_at
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

@graphql(commentQuery, {
  options: ({ id }) => ({ variables: { id } }),
})
export default class CommentC extends React.Component {
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

    return (
      <Comment
        {...data.comment}
        collapsed={this.state.collapsed}
        onToggleCollapse={this.toggleCollapse}
      />
    )
  }
}

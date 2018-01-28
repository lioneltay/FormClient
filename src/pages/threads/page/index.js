import * as React from "react"
import * as R from "ramda"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import slug from "limax"

import { Thread } from "components/forum"

const threadsQuery = gql`
  query {
    threads {
      id
      title
      content
      author {
        id
        full_name
      }
    }
  }
`

@graphql(threadsQuery)
export default class ThreadsPage extends React.Component {
  render() {
    return (
      <div>
        {R.pathOr([], ["data", "threads"], this.props).map(thread => (
          <div
            className="cursor-pointer"
            key={thread.id}
            onClick={() =>
              this.props.history.push(
                `/threads/${thread.id}/${slug(thread.title)}`
              )
            }
          >
            <Thread {...thread} />
          </div>
        ))}
        <Link to="/threads/create">New Thread</Link>
      </div>
    )
  }
}

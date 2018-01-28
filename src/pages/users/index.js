import * as React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import * as R from "ramda"

const usersQuery = gql`
  query {
    users {
      id
      email
      full_name
    }
  }
`

@graphql(usersQuery)
export default class Users extends React.Component {
  render() {
    console.log("PROPS", this.props)

    return (
      <div>
        <h1>Users</h1>
        {R.pathOr([], ["data", "users"], this.props).map(user => (
          <User key={user.id} {...user} />
        ))}
      </div>
    )
  }
}

const User = ({ id, email, full_name }) => {
  return (
    <div className="mt-1">
      <div>{id}</div>
      <div>{email}</div>
      <div>{full_name}</div>
    </div>
  )
}

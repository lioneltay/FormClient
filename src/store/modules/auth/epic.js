import { LOGIN, LOGOUT, GET_CURRENT_USER } from "store/modules/auth/actions"
import { combineEpics } from "redux-observable"
import { Observable } from "rxjs"
import gql from "graphql-tag"
import client from "services/graphql-client"

const login = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`

const loginEpic = action$ =>
  action$
    .ofType(LOGIN.PENDING)
    .switchMap(({ payload: { email, password } }) =>
      Observable.fromPromise(
        client.mutate({
          mutation: login,
          variables: { email, password },
        })
      )
    )
    .map(({ data: { login: user } }) => {
      console.log(user)
      return user
        ? {
            type: LOGIN.SUCCESS,
            payload: { user },
          }
        : {
            type: LOGIN.FAILURE,
          }
    })

const logout = gql`
  mutation {
    logout {
      id
    }
  }
`

const logoutEpic = action$ =>
  action$
    .ofType(LOGOUT.PENDING)
    .switchMap(() =>
      Observable.fromPromise(client.mutate({ mutation: logout }))
    )
    .mapTo({ type: LOGOUT.SUCCESS })
    .catch(() => ({ type: LOGOUT.FAILURE }))

const currentUser = gql`
  query {
    currentUser {
      id
      name
      email
    }
  }
`
const getCurrentUserEpic = action$ =>
  action$
    .ofType(GET_CURRENT_USER.PENDING)
    .switchMap(() =>
      Observable.fromPromise(client.query({ query: currentUser }))
    )
    .map(({ data: { currentUser: user } }) => ({
      type: GET_CURRENT_USER.SUCCESS,
      payload: { user },
    }))
    .catch(() => ({
      type: GET_CURRENT_USER.FAILURE,
    }))

export default combineEpics(loginEpic, logoutEpic, getCurrentUserEpic)

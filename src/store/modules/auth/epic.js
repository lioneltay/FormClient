import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GET_CURRENT_USER,
} from "store/modules/auth/actions"
import { combineEpics } from "redux-observable"
import { Observable } from "rxjs"
import gql from "graphql-tag"
import client from "services/graphql-client"

const login = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
      first_name
      last_name
      full_name
    }
  }
`

const loginEpic = action$ =>
  action$.ofType(LOGIN.REQUEST).switchMap(({ payload: { email, password } }) =>
    Observable.fromPromise(
      client
        .mutate({
          mutation: login,
          variables: { email, password },
        })
        .then(({ data: { login: user } }) => {
          return { type: LOGIN.SUCCESS, payload: { user } }
        })
        .catch(error => {
          return { type: LOGIN.FAILURE, error: true, payload: error }
        })
    )
  )

const signup = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
  ) {
    signup(
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
    ) {
      id
      email
      first_name
      last_name
      full_name
    }
  }
`

const signupEpic = action$ =>
  action$
    .ofType(SIGNUP.REQUEST)
    .switchMap(({ payload: { email, password, first_name, last_name } }) =>
      Observable.fromPromise(
        client
          .mutate({
            mutation: signup,
            variables: { first_name, last_name, email, password },
          })
          .then(({ data: { signup: user } }) => {
            return { type: SIGNUP.SUCCESS, payload: { user } }
          })
          .catch(error => {
            return { type: SIGNUP.FAILURE, error: true, payload: error }
          })
      )
    )

const logout = gql`
  mutation {
    logout {
      id
    }
  }
`

const logoutEpic = action$ =>
  action$
    .ofType(LOGOUT.REQUEST)
    .switchMap(() =>
      Observable.fromPromise(client.mutate({ mutation: logout }))
    )
    .mapTo({ type: LOGOUT.SUCCESS })
    .catch(() => ({ type: LOGOUT.FAILURE }))

const currentUser = gql`
  query {
    currentUser {
      id
      email
      first_name
      last_name
      full_name
    }
  }
`
const getCurrentUserEpic = action$ =>
  action$
    .ofType(GET_CURRENT_USER.REQUEST)
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

export default combineEpics(
  getCurrentUserEpic,
  loginEpic,
  logoutEpic,
  signupEpic
)

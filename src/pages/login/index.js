import * as React from "react"
import { connect } from "react-redux"
import { login } from "store/modules/auth/actions"
import { handleAjaxAction } from "utils/form"

import { SubmitButton } from "components/form"
import { SubmissionError } from "lib/redux-form"

import LoginForm from "./LoginForm"

@connect(null, { login })
export default class Login extends React.Component {
  submitLoginForm = ({ email, password }) => {
    const { login } = this.props

    return handleAjaxAction(login({ email, password })).catch(failureAction => {
      throw new SubmissionError(failureAction.payload.graphQLErrors[0].args)
    })
  }

  render() {
    return (
      <div className="fj-c">
        <div style={{ minWidth: 300, marginTop: 50 }}>
          <h5>Login</h5>
          <LoginForm onSubmit={this.submitLoginForm} />

          <SubmitButton className="mt-2 w-100" form="LoginForm">
            Login
          </SubmitButton>
        </div>
      </div>
    )
  }
}

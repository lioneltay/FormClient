import * as React from "react"
import { connect } from "react-redux"
import { signup } from "store/modules/auth/actions"
import { handleAjaxAction } from "utils/form"
import { SubmissionError } from "lib/redux-form"

import { SubmitButton } from "components/form"

import SignupForm from "./SignupForm"

const Signup = connect(null, { signup })(({ signup }) => {
  return (
    <div className="fj-c">
      <div style={{ minWidth: 300, marginTop: 50 }}>
        <h5>Signup</h5>
        <SignupForm
          onSubmit={({ email, password, first_name, last_name }) =>
            handleAjaxAction(
              signup({ email, password, first_name, last_name })
            ).catch(failureAction => {
              console.log(failureAction)
              throw new SubmissionError(
                failureAction.payload.graphQLErrors[0].args
              )
            })
          }
        />

        <SubmitButton className="mt-2 w-100" form="SignupForm">
          Signup
        </SubmitButton>
      </div>
    </div>
  )
})

export default Signup

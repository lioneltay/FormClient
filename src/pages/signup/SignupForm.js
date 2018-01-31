import * as React from "react"
import { TextField } from "components/form"
import { reduxForm } from "lib/redux-form"
import { required, email } from "lib/redux-form-validation"

const SignupForm = reduxForm({ form: "SignupForm" })(
  ({ handleSubmit, className, style }) => {
    return (
      <form className={className} style={style} onSubmit={handleSubmit}>
        <TextField name="firstName" label="First Name" validate={[required]} />

        <TextField name="lastName" label="Last Name" validate={[required]} />

        <TextField name="email" label="Email" validate={[required, email]} />

        <TextField
          name="password"
          label="Password"
          type="password"
          validate={[required]}
        />
      </form>
    )
  }
)

export default SignupForm

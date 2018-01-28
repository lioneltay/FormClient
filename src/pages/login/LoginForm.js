import * as React from "react"
import { TextField } from "components/form"
import { reduxForm } from "lib/redux-form"
import { required, email } from "lib/redux-form-validation"

const LoginForm = reduxForm({ form: "LoginForm" })(
  ({ handleSubmit, className, style }) => {
    return (
      <form className={className} style={style} onSubmit={handleSubmit}>
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

export default LoginForm

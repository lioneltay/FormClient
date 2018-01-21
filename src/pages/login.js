import * as React from "react"
import { connect } from "react-redux"
import { login } from "store/modules/auth/actions"

const Login = connect(null, { login })(({ login }) => {
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          login({ email: "newdude@gmail.com", password: "password" })
        }}
      >
        Login
      </button>
    </div>
  )
})

export default Login

import * as React from "react"
import "./styles.css"

import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="header fj-sb fa-c p-2">
      <div>
        <Link className="header-logo" to="/home">
          <h1>Logo</h1>
        </Link>
      </div>

      <div>
        <Link className="header-link" to="/signup">
          Signup
        </Link>
        <Link className="header-link" to="/login">
          Login
        </Link>
        <Link className="header-link" to="/logout">
          Logout
        </Link>
        <Link
          className="header-link"
          to="/boadflkjaskdlfjaksldjfklajkkkkksdlfkjal;ksdjfk"
        >
          Bogus
        </Link>
      </div>
    </div>
  )
}

export default Header

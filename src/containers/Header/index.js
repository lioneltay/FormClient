import * as React from "react"
import "./styles.css"
import { connect } from "react-redux"
import { logout } from "store/modules/auth/actions"
import { loggedIn } from "store/modules/auth/selectors"

import { Link } from "react-router-dom"

const { Fragment } = React

const Header = connect(
  state => ({
    loggedIn: loggedIn(state),
  }),
  { logout }
)(({ loggedIn, logout }) => {
  return (
    <div className="header fj-sb fa-c p-2">
      <div>
        <Link className="header-logo" to="/home">
          <h1>Logo</h1>
        </Link>
      </div>

      <div>
        {loggedIn ? (
          <Link className="header-link" to="/logout" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Fragment>
            <Link className="header-link" to="/signup">
              Signup
            </Link>
            <Link className="header-link" to="/login">
              Login
            </Link>
          </Fragment>
        )}

        <Link className="header-link" to="/posts">
          Posts
        </Link>
        <Link className="header-link" to="/protected">
          Protected
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
})

export default Header

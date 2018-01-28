import * as React from "react"
import "./styles.css"
import { connect } from "react-redux"
import { logout } from "store/modules/auth/actions"
import { loggedIn, loading, authedUser } from "store/modules/auth/selectors"

import { Link } from "react-router-dom"

const { Fragment } = React

const Header = connect(
  state => ({
    loggedIn: loggedIn(state),
    loading: loading(state),
    authedUser: authedUser(state),
  }),
  { logout }
)(({ loggedIn, logout, loading, authedUser }) => {
  return (
    <div className="header fj-sb fa-c p-2">
      <div>
        <Link className="header-logo" to="/home">
          <h1>Logo</h1>
        </Link>
      </div>

      <div>
        <Link className="header-link" to="/users">
          Users
        </Link>
        <Link className="header-link" to="/threads">
          Threads
        </Link>
        <Link className="header-link" to="/protected">
          Protected
        </Link>
        {/* <Link className="header-link" to="/invaliad-lkdd">
          Bogus
        </Link> */}

        {loading ? null : loggedIn ? (
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

        {authedUser && (
          <span className="header-link" style={{ border: "1px solid white" }}>
            Welcome, {authedUser.full_name}
          </span>
        )}
      </div>
    </div>
  )
})

export default Header

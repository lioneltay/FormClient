import * as R from "ramda"

const slice = R.prop("auth")

export const authedUser = R.pipe(slice, R.prop("user"))

export const loggedIn = R.pipe(authedUser, Boolean)

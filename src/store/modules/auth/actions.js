import { asyncTypes } from "store/utils"

export const LOGIN = asyncTypes("LOGIN")
export const LOGOUT = asyncTypes("LOGOUT")
export const SIGNUP = asyncTypes("SIGNUP")
export const GET_CURRENT_USER = asyncTypes("GET_CURRENT_USER")

export const getCurrentUser = () => {
  return {
    type: GET_CURRENT_USER.REQUEST,
  }
}

export const signup = ({ first_name, last_name, email, password }) => ({
  type: SIGNUP.REQUEST,
  payload: { first_name, last_name, email, password },
  meta: { actionStream: true },
})

export const login = ({ email, password }) => ({
  type: LOGIN.REQUEST,
  payload: { email, password },
  meta: { actionStream: true },
})

export const logout = () => ({
  type: LOGOUT.REQUEST,
})

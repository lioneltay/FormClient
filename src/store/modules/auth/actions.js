import { asyncTypes } from "store/utils"

export const LOGIN = asyncTypes("LOGIN")
export const LOGOUT = asyncTypes("LOGOUT")
export const GET_CURRENT_USER = asyncTypes("GET_CURRENT_USER")

export const login = ({ email, password }) => ({
  type: LOGIN.PENDING,
  payload: { email, password },
})

export const logout = () => ({ type: LOGOUT.PENDING })

export const getCurrentUser = () => ({ type: GET_CURRENT_USER.PENDING })

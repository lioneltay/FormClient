import { combineReducers } from "redux"
import authReducer from "store/modules/auth/reducer"

export default combineReducers({
  placeholder: (state = {}) => state,
  auth: authReducer,
})

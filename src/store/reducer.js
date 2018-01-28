import { combineReducers } from "redux"
import { reducer as formReducer } from "lib/redux-form"
import authReducer from "store/modules/auth/reducer"
import snackbarReducer from "store/modules/snackbar/reducer"

export default combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  form: formReducer,
})

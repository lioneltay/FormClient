import { combineEpics } from "redux-observable"
import { startSubmit, stopSubmit } from "redux-form"

const reduxFormEpic = action$ =>
  action$.filter(action => action.meta.form).map()

export default combineEpics(reduxFormEpic)

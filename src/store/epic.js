import "rxjs"
import { combineEpics } from "redux-observable"

import authEpic from "store/modules/auth/epic"
import snackbarEpic from "store/modules/snackbar/epic"

export default combineEpics(authEpic, snackbarEpic)

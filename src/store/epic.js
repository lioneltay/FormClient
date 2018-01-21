import "rxjs"
import { combineEpics } from "redux-observable"

import authEpic from "store/modules/auth/epic"

export default combineEpics(authEpic)

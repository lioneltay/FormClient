import { Subject } from "rxjs"
import * as R from "ramda"

export const middleware = () => store => next => {
  const actionSubject = new Subject()

  return action => {
    actionSubject.next(action)

    if (R.path(["meta", "actionStream"], action)) {
      next(action)

      return {
        action,
        action$: actionSubject,
      }
    }

    return next(action)
  }
}

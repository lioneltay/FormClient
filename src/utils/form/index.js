import * as R from "ramda"
import { Observable } from "rxjs"

export const handleAjaxAction = ({ action, action$ }) => {
  const [actionName, status] = action.type.split("/")

  return action$
    .filter(action => {
      const [n, s] = action.type.split("/")
      return actionName === n && R.contains(s, ["SUCCESS", "FAILURE"])
    })
    .switchMap(action => {
      const [n, s] = action.type.split("/")
      if (s === "SUCCESS") {
        return Observable.of(action)
      } else {
        return Observable.throw(action)
      }
    })
    .first()
    .toPromise()
}

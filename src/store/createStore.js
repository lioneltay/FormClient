import { createStore, applyMiddleware, compose } from "redux"
import { createEpicMiddleware } from "redux-observable"
import rootEpic from "./epic"
import reducer from "store/reducer"

export default () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = [createEpicMiddleware(rootEpic)]

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  )

  return store
}

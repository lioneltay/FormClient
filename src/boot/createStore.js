import { createStore, applyMiddleware, compose } from "redux"
import reducer from "store/reducer"

export default () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = []

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  )

  return store
}

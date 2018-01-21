import * as R from "ramda"
import { LOGIN, LOGOUT, GET_CURRENT_USER } from "store/modules/auth/actions"

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.PENDING: {
      return R.assoc("loading", true, state)
    }
    case LOGIN.FAILURE: {
      return R.assoc("loading", false, state)
    }
    case LOGIN.SUCCESS: {
      return R.merge(state, { loading: false, user: action.payload.user })
    }

    case LOGOUT.PENDING: {
      return R.assoc("loading", true, state)
    }
    case LOGOUT.FAILURE: {
      return R.assoc("loading", false, state)
    }
    case LOGOUT.SUCCESS: {
      return R.merge(state, { loading: false, user: null })
    }

    case GET_CURRENT_USER.PENDING: {
      return R.assoc("loading", true, state)
    }
    case GET_CURRENT_USER.FAILURE: {
      return R.assoc("loading", false, state)
    }
    case GET_CURRENT_USER.SUCCESS: {
      return R.merge(state, { loading: false, user: action.payload.user })
    }

    default: {
      return state
    }
  }
}

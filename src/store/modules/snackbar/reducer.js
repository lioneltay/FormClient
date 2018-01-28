import * as R from "ramda"
import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "./actions"

const initialState = {
  open: false,
  message: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR: {
      return R.merge(state, { open: true, message: action.payload.message })
    }
    case CLOSE_SNACKBAR: {
      return R.merge(state, { open: false })
    }
    default: {
      return state
    }
  }
}

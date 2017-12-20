import * as R from "ramda"
import { UPDATE_STATE, MOUNT_STATE, UNMOUNT_STATE } from "./actions"

const initialState = {}

const reducer = (state = initialState, action) => {
  // console.log(JSON.stringify(action, null, 2))

  switch (action.type) {
    case UPDATE_STATE: {
      const { statePath, value } = action.payload
      const currentState = R.path(statePath.concat("state"), state)
      const newState = R.merge(currentState, value)
      return R.assocPath(statePath.concat("state"), newState, state)
    }
    case MOUNT_STATE: {
      const { statePath, value } = action.payload
      return R.assocPath(statePath.concat("state"), value, state)
    }
    case UNMOUNT_STATE: {
      const { statePath } = action.payload
      return R.dissocPath(statePath.concat("state"), state)
    }
    default: {
      return state
    }
  }
}

export default reducer

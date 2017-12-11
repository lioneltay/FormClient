const PREFIX = "@@redux-ui__"

const actionName = name => `${PREFIX}${name}`

export const UPDATE_STATE = actionName("UPDATE_STATE")
export const MOUNT_STATE = actionName("MOUNT_STATE")
export const UNMOUNT_STATE = actionName("UNMOUNT_STATE")

export const updateState = (statePath, value) => ({
  type: UPDATE_STATE,
  payload: { statePath, value },
})

export const mountState = (statePath, value) => ({
  type: MOUNT_STATE,
  payload: { statePath, value },
})

export const unmountState = statePath => ({
  type: UNMOUNT_STATE,
  payload: { statePath },
})

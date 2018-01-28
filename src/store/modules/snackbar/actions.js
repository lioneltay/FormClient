export const OPEN_SNACKBAR = "OPEN_SNACKBAR"
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR"

export const openSnackbar = ({ message }) => ({
  type: OPEN_SNACKBAR,
  payload: { message },
})

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
})

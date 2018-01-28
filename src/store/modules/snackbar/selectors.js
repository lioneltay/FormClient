import * as R from "ramda"

const slice = R.prop("snackbar")

export const message = R.pipe(slice, R.prop("message"))
export const open = R.pipe(slice, R.prop("open"))

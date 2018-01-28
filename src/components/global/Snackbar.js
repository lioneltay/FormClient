import * as React from "react"
import { connect } from "react-redux"
import { open, message } from "store/modules/snackbar/selectors"
import styles from "./css.module.css"

const Snackbar = connect(state => ({
  open: open(state),
  message: message(state),
}))(({ open, message }) => {
  return (
    <div className={`${styles.snackbar} ${open ? styles.show : styles.hide}`}>
      {message}
    </div>
  )
})

export default Snackbar

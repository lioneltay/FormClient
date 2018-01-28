import React from "react"
import { Field } from "lib/redux-form"

import styles from "../style.module.css"

// Horizontal layout is not ready, need a way to horizontally align stacked inputs
const renderInput = ({
  style,
  className,
  input,
  meta: { touched, error, warning },
  placeholder,
  label,
  type = "text",
  layout = "vertical",
}) => (
  <div
    className={`${className}
      ${
        layout === "horizontal"
          ? styles["container-horizontal"]
          : styles.container
      }`}
    style={style}
  >
    <div className={`mr-2 ${styles.label}`}>
      <strong>{label}</strong>
    </div>

    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        {...input}
        placeholder={placeholder || label}
        type={type}
      />
    </div>

    <div className={`${styles.error}`}>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const TextField = props => <Field {...props} component={renderInput} />

export default TextField

import React from "react"
import { Field } from "lib/redux-form"

import styles from "../styles.scss"

// Horizontal layout is not ready, need a way to horizontally align stacked inputs
const renderInput = ({
  style,
  className,
  input,
  meta: { touched, error, warning },
  placeholder,
  label,
  type = "number",
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
      {label}
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

const NumberField = props => <Field {...props} component={renderInput} normalize={Number} />

export default NumberField

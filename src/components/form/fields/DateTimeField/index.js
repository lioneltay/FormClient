import React from "react"
import { Field } from "lib/redux-form"
import { DateTimePicker } from "lib/react-widgets"

import styles from "../styles.scss"

// Horizontal layout is not ready, need a way to horizontally align stacked inputs
const renderInput = ({
  style,
  className,
  input,
  meta: { touched, error, warning },
  label,
  layout = "vertical",

  ...rest
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
    <div className={`mr-2 ${styles.label}`}>{label}</div>

    <div className={styles.inputContainer}>
      <DateTimePicker
        onChange={input.onChange}
        time={false}
        format="DD/MM/YYYY"
        defaultValue={!input.value ? null : new Date(input.value)}
        value={!input.value ? null : new Date(input.value)}
        {...rest}
      />
    </div>

    <div className={`${styles.error}`}>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const DropDownField = props => <Field {...props} component={renderInput} />

export default DropDownField

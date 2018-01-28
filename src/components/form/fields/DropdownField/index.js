import React from "react"
import { Field } from "lib/redux-form"
import { DropdownList } from "lib/react-widgets"

import styles from "../styles.scss"

// Horizontal layout is not ready, need a way to horizontally align stacked inputs
const renderInput = ({
  input,
  meta: { touched, error, warning },

  style,
  className,

  label,
  layout = "vertical",

  onChange = () => {},
  selectValue = x => x,
  data,
  ...rest
}) => {
  const selectedItem = data.find(x => selectValue(x) === input.value)

  return (
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
        <DropdownList
          {...input}
          {...rest}
          data={data}
          value={selectedItem}
          onChange={value => {
            input.onChange(selectValue(value))
            onChange(value)
          }}
        />
      </div>

      <div className={`${styles.error}`}>
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

const DropDownField = props => (
  <Field {...props} component={renderInput} format={null} />
)

export default DropDownField

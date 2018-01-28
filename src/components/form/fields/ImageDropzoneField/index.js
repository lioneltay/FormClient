import React from "react"
import { Field } from "lib/redux-form"
import ReactDropzone from 'react-dropzone'

import styles from "../styles.scss"

const renderInput = ({
  input,
  meta: { touched, error, warning },

  style,
  className,

  label,

  onChange = () => {},
  selectValue = x => x,
  data,
  ...rest
}) => {
  return (
    <div className={`${className} ${styles.container}`} style={style}>
      <div className={`mr-2 ${styles.label}`}>{label}</div>

      <div className={styles.inputContainer}>
        {/* <DropdownList
          {...input}
          {...rest}
          data={data}
          value={selectedValue}
          onChange={value => {
            input.onChange(selectValue(value))
            onChange(value)
          }}
        /> */}
        <div>FileDropzoneField</div>
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

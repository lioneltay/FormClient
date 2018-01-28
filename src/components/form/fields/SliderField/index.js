import React from "react"
import { Field } from "lib/redux-form"
import Slider, { Handle } from "rc-slider"
import "rc-slider/assets/index.css"

import styles from "../styles.scss"

// const RangeWithToolTip = createSliderWithTooltip(Range)

const CustomHandle = props => {
  const { value, max, min } = props

  return (
    <div>
      <Handle {...props} />
      <div
        style={{
          position: "absolute",
          left: `calc(${100 * (value - min) / (max - min)}% - 7px)`,
          top: 17,
          fontSize: "0.8rem",
          fontWeight: 400,
        }}
      >
        {props.value}
      </div>
    </div>
  )
}

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
    <div className={`mr-2 ${styles.label}`}>
      {label}
    </div>

    <div className={styles.inputContainer}>
      <div className="px-1">
        <Slider {...rest} {...input} handle={CustomHandle} />
      </div>
    </div>

    <div className={`${styles.error}`}>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const RangeField = props => <Field {...props} component={renderInput} />

export default RangeField

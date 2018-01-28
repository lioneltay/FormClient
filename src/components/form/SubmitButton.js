import * as React from "react"
import * as R from "ramda"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { reduxForm, submit } from "lib/redux-form"

/**
 * Knows how to submit an arbitrary redux form.
 * Automatically handles disabled state to prevent concurrent submits
 */
@connect(null, { submit })
@reduxForm()
export default class SubmitButton extends React.Component {
  static propTypes = {
    // passed props
    form: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,

    // hoc props
    submit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    onClick: () => {},
  }

  onClick = (...args) => {
    this.props.onClick(...args)
    this.props.submit(this.props.form)
  }

  render() {
    const {
      submitting,
      invalid,
      submitFailed,
      className,
      style,
      children,
    } = this.props

    return (
      <button
        className={className}
        style={style}
        disabled={submitting || (submitFailed && invalid)}
        onClick={this.onClick}
      >
        {children}
      </button>
    )
  }
}

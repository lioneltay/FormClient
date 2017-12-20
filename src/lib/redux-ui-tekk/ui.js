import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as R from "ramda"
import invariant from "invariant"

import { mountState, unmountState, updateState } from "./actions"

const noop = () => {}

// TODO: get proper unique ids
let id = 1
const getId = () => id++
const generateKey = (Comp) => {
  return `${Comp.displayName || Comp.name}_Key_${getId()}`
}

const callIfFunc = R.curry(
  (val, candidate) =>
    typeof candidate === "function" ? candidate(val) : candidate
)

const ui = ({ key, initialState = {}, reducer } = {}) => Comp => {
  const generatedKey = key || generateKey(Comp)

  @connect(
    state => ({
      state: state.ui || {},
    }),
    {
      mountState,
      unmountState,
      updateState,
    }
  )
  class UI extends Component {
    static propTypes = {
      state: PropTypes.object.isRequired,
      mountState: PropTypes.func.isRequired,
      unmountState: PropTypes.func.isRequired,
      updateState: PropTypes.func.isRequired,
    }

    static contextTypes = {
      // Where the ui state for the parent component is mounted
      statePath: PropTypes.array,
      // The variables the parent component has access to and their initial values
      stateVars: PropTypes.object,
      // Get variables accesible by parent component
      getState: PropTypes.func,
      // Update parent state
      updateState: PropTypes.func,
      store: PropTypes.object.isRequired,
    }

    static childContextTypes = {
      statePath: PropTypes.array,
      stateVars: PropTypes.object,
      getState: PropTypes.func,
      updateState: PropTypes.func,
    }

    getChildContext() {
      return {
        statePath: this.statePath,
        stateVars: this.stateVars,
        getState: this.getState,
        updateState: this.updateState,
      }
    }

    constructor(props, context) {
      super(props, context)

      this.key = generatedKey
      this.statePath = this.getStatePath()
      this.stateVars = this.getStateVars()

      if (reducer && typeof reducer === "function") {
        if (!this.context.store.addUIReducer) {
          throw new Error(
            "[redux-ui-tekk]: Local reducers are not supported without using the dynamicUIReducers store enhancer"
          )
        }
        context.store.addUIReducer({
          path: ["ui"].concat(this.statePath).concat("state"),
          reducer,
        })
      }
    }

    getStatePath() {
      const { statePath = [] } = this.context
      if (!this.statePath) {
        this.statePath = statePath.concat(this.key)
      }

      return this.statePath
    }

    getStateVars() {
      const { stateVars = {} } = this.context
      if (!this.stateVars) {
        this.stateVars = R.merge(
          stateVars,
          R.map(callIfFunc(this.props), initialState)
        )
      }

      return this.stateVars
    }

    componentWillMount() {
      this.props.mountState(
        this.statePath,
        R.map(callIfFunc(this.props), initialState)
      )
    }

    componentWillUnmount() {
      this.props.unmountState(this.statePath)
      if (reducer && typeof reducer === "function") {
        if (!this.context.store.removeUIReducer) {
          throw new Error(
            "[redux-ui-tekk]: Local reducers are not supported without using the dynamicUIReducers store enhancer"
          )
        }
        this.context.store.removeUIReducer(reducer)
      }
    }

    updateState = value => {
      // validation
      const childVarKeys = R.keys(this.stateVars)
      R.keys(value).forEach(key =>
        invariant(
          R.contains(key, childVarKeys),
          `Key "${key}" does not exist in the scope of "${this.key}"`
        )
      )
      // end validation

      const parentVars = R.keys(this.context.stateVars)
      const parentKey = (v, k) => R.contains(k, parentVars)
      const childKey = R.complement(parentKey)

      const childValues = R.pickBy(childKey, value)
      const parentValues = R.pickBy(parentKey, value)

      this.props.updateState(this.statePath, childValues)
      if (this.context.updateState) {
        this.context.updateState(parentValues)
      }
    }

    getState = () => {
      const storeState = this.props.state
      const { stateVars, getState = noop } = this.context

      const ret =
        R.path(this.statePath.concat("state"), storeState) ||
        R.merge(stateVars, R.map(callIfFunc(this.props), initialState))

      return R.merge(getState(), ret)
    }

    render() {
      return (
        <Comp
          {...this.props}
          updateState={this.updateState}
          ui={this.getState()}
        />
      )
    }
  }

  return UI
}

export default ui

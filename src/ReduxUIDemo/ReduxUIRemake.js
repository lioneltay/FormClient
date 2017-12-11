import React, { Component } from "react"
import { withHandlers, compose, withProps, onlyUpdateForKeys } from "recompose"
import * as R from "ramda"
import { connect } from "react-redux"

import { ui } from "lib/redux-ui"

const callIfFunc = (candidate, ...args) =>
  typeof candidate === "function" ? candidate(...args) : candidate

const logOnRender = label => Comp =>
  class LogOnRender extends Component {
    render() {
      console.log(`${label}: Rendered`)
      return <Comp {...this.props} />
    }
  }

const InformedComponent = compose(
  ui(),
  withProps(({ ui: { items, selectedItemId, itemClicks, previewClicks } }) => ({
    itemClicks: itemClicks,
    previewClicks: previewClicks,
    selectedItem: items.find(R.propEq("id", selectedItemId)),
  })),
  logOnRender("InformedComponent")
)(({ selectedItem, itemClicks, previewClicks, uiKey, uiPath }) => (
  <div>
    <div>{uiKey}</div>
    <div>{uiPath}</div>
    <div>
      <strong>Selected Item</strong>
    </div>
    <div>{selectedItem ? <Item {...selectedItem} /> : "-"}</div>

    <div>
      <strong>Item Clicks</strong>
    </div>
    <div>{itemClicks}</div>

    <div>
      <strong>Preview Clicks</strong>
    </div>
    <div>{previewClicks}</div>
  </div>
))

const lastId = R.pipe(R.last, R.unless(R.isNil, R.prop("id")))

const firstId = R.pipe(R.head, R.unless(R.isNil, R.prop("id")))

const ActionButtons = compose(
  ui(),
  withHandlers({
    selectFirst: ({ updateState, ui }) => () =>
      updateState({ selectedItemId: firstId(ui.items) }),
    selectLast: ({ updateState, ui }) => () =>
      updateState({ selectedItemId: lastId(ui.items) }),
  }),
  logOnRender("ActionButtons"),
  connect()
)(
  ({
    updateState,
    dispatch,
    selectFirst,
    selectLast,
    onGenderChange = () => {},
  }) => (
    <div>
      <button onClick={selectFirst}>Select First</button>
      <button onClick={selectLast}>Select Last</button>
      <button onClick={() => updateState({ notAValidKey: "OPs" })}>
        Update Invalid Key
      </button>
      <button onClick={() => dispatch({ type: "OPEN_MODAL" })}>
        Open Modal
      </button>
      <button onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
        Close Modal
      </button>
      <label>
        Gender:
        <select
          defaultValue="all"
          onChange={e => onGenderChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
      </label>
    </div>
  )
)

const Item = compose(
  withHandlers({
    onClick: ({ id, onClick = () => {} }) => () => onClick(id),
  }),
  logOnRender("item")
)(({ name, email, onClick }) => (
  <div className="item" onClick={onClick}>
    <strong>{name}:</strong> {email}
  </div>
))

const ItemListView = ({ items, onItemClick }) => (
  <div>
    <div className="items">People</div>
    {items.map(item => <Item key={item.id} {...item} onClick={onItemClick} />)}
  </div>
)

const ItemList = compose(
  ui(),
  withHandlers({
    onItemClick: ({ updateState, ui }) => id =>
      updateState({ selectedItemId: id, itemClicks: ui.itemClicks + 1 }),
  }),
  logOnRender("ItemList")
)(ItemListView)

const LogClicks = ({ onClick }) => Comp => props => (
  <div onClick={callIfFunc(onClick, props)}>
    <Comp {...props} />
  </div>
)

const Preview = compose(
  ui(),
  LogClicks({
    onClick: ({ updateState, ui }) => () =>
      updateState({ previewClicks: ui.previewClicks + 1 }),
  }),
  onlyUpdateForKeys(["item"]),
  logOnRender("Preview")
)(({ item: { name, email } }) => (
  <div>
    <div>
      <strong>Name: </strong> {name}
    </div>
    <div>
      <strong>Email: </strong> {email}
    </div>
  </div>
))

const findById = (id, items) => items.find(R.propEq("id", id))

const Modal = compose(
  ui({
    initialState: {
      open: false,
    },
    // reducer: (state, action) => {
    //   console.log("custom!!!!!!", state, action)
    //   switch (action.type) {
    //     case "OPEN_MODAL": {
    //       return R.assoc("open", true, state)
    //     }
    //     case "CLOSE_MODAL": {
    //       return R.assoc("open", false, state)
    //     }
    //     default: {
    //       return state
    //     }
    //   }
    // },
  })
)(({ ui: { open } }) => (
  <div>
    <div>Modal {open ? "open" : "closed"}</div>
  </div>
))

const OrgDashboardFeature = compose(
  connect(state => ({ items: state.items })),
  ui({
    initialState: {
      showMessage: false,
      items: ({ items }) => items,
      itemClicks: 0,
      previewClicks: 0,
      selectedItemId: ({ items }) => (items.length !== 0 ? items[0].id : null),
      filters: {
        gender: "all",
        otherField: "value!!!",
      },
    },
  }),
  withProps(
    ({ updateState, ui: { items, selectedItemId, filters: { gender } } }) => ({
      items: items.filter(item => item.gender === gender || gender === "all"),
      selectedItem: findById(selectedItemId, items),
    })
  ),
  logOnRender("OrgDashboardFeature")
)(({ ui, items, selectedItem, updateState }) => {
  return (
    <div>
      <Modal />

      <div className="card">
        <InformedComponent />
      </div>

      <div className="card">
        <ActionButtons
          onGenderChange={gender =>
            updateState(R.assocPath(["filters", "gender"], gender, ui))
          }
        />
      </div>

      <div className="fj-c">
        <div className="card fg-1">
          <ItemList items={items} />
        </div>

        <div className="card fg-1">
          <Preview item={selectedItem} />
        </div>
      </div>
    </div>
  )
})

const ReduxStateDemo3 = () => <OrgDashboardFeature />

export default ReduxStateDemo3

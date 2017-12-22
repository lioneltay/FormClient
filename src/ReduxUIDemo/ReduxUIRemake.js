import React, { Component } from "react"
import { withHandlers, compose, withProps, onlyUpdateForKeys } from "recompose"
import * as R from "ramda"
import { connect } from "react-redux"

import { ui } from "lib/redux-ui-tekk"

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
  ui({
    selector: state => ({
      items: state.items,
      selectedItemId: state.selectedItemId,
      itemClicks: state.itemClicks,
      previewClicks: state.previewClicks,
    }),
  }),
  withProps(({ items, selectedItemId, itemClicks, previewClicks }) => {
    return {
      itemClicks: itemClicks,
      previewClicks: previewClicks,
      selectedItem: items.find(R.propEq("id", selectedItemId)),
    }
  }),
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
  ui({
    selector: state => ({
      items: state.items,
    }),
  }),
  withHandlers({
    selectFirst: ({ updateState, items }) => () =>
      updateState({ selectedItemId: firstId(items) }),
    selectLast: ({ updateState, items }) => () =>
      updateState({ selectedItemId: lastId(items) }),
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
  ui({
    selector: state => ({
      itemClicks: state.itemClicks,
    }),
  }),
  withHandlers({
    onItemClick: ({ updateState, itemClicks }) => id =>
      updateState({ selectedItemId: id, itemClicks: itemClicks + 1 }),
  }),
  logOnRender("ItemList")
)(ItemListView)

const LogClicks = ({ onClick }) => Comp => props => (
  <div onClick={callIfFunc(onClick, props)}>
    <Comp {...props} />
  </div>
)

const Preview = compose(
  ui({
    selector: state => ({
      previewClicks: state.previewClicks,
    }),
  }),
  LogClicks({
    onClick: ({ updateState, previewClicks }) => () =>
      updateState({ previewClicks: previewClicks + 1 }),
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
    selector: state => ({
      open: state.open,
    }),
  })
)(({ open }) => (
  <div>
    <div>Modal {open ? "open" : "closed"}</div>
  </div>
))

const OrgDashboardFeature = compose(
  connect(state => ({ items: console.log("farts") || state.items })),
  ui({
    initialState: ({ items }) => ({
      showMessage: false,
      items,
      itemClicks: 0,
      previewClicks: 0,
      selectedItemId: items.length !== 0 ? items[0].id : null,
      filters: {
        gender: "all",
        otherField: "value!!!",
      },
    }),
    selector: R.pick(["items", "selectedItemId", "filters"]),
  }),
  withProps(({ items, selectedItemId, filters: { gender } }) => ({
    items: items.filter(item => item.gender === gender || gender === "all"),
    selectedItem: findById(selectedItemId, items),
  })),
  logOnRender("OrgDashboardFeature")
)(({ items, selectedItem, filters, updateState }) => {
  return (
    <div>
      <Modal />

      <div className="card">
        <InformedComponent />
      </div>

      <div className="card">
        <ActionButtons
          onGenderChange={gender =>
            updateState({ filters: R.assoc("gender", gender, filters) })
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

const ReduxStateDemo3 = () => (
  <div>
    <h1>LALALA</h1>
    <OrgDashboardFeature />
  </div>
)

export default ReduxStateDemo3

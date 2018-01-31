import * as React from "react"

// Uses id to get data for component and renders component on the key data eventually
const dataHoc = Comp => {
  const data = [
    {
      title: "Cool beans",
      content: "they are really bad",
      subComponentIds: [1, 2, 3],
    },
    {
      title: "Cool beans",
      content: "they are really bad",
      subComponentIds: [3, 4, 5],
    },
  ]

  return class DataProvider extends React.Component {
    render() {
      return <Comp {...this.props} data={data} />
    }
  }
}

// Assuming we have the subcomponents and data, how do we render such a component
const RecursiveComponent = ({ title, content, subComponents }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>

      <div>{subComponents}</div>
    </div>
  )
}

// Connect stuff together
const generateRecursive = ({ dataHoc, RecursiveComponent }) => {
  class Intermediary extends React.Component {
    render() {
      if (!this.props.data) {
        return null
      }

      console.log(this.props.data)

      return (
        <RecursiveComponent
          {...this.props}
          {...this.props.data}
          subComponents={this.props.subComponentIds.map(id => (
            <Intermediary key={id} id={id} />
          ))}
        />
      )
    }
  }

  return dataHoc(Intermediary)
}

export default generateRecursive

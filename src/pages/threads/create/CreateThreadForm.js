import * as React from "react"
import * as R from "ramda"
import { reduxForm } from "lib/redux-form"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import { TextField } from "components/form"

const createThread = gql`
  mutation CreateThread($title: String, $content: String) {
    createThread(title: $title, content: $content) {
      id
      title
      content
    }
  }
`

const CreateThreadForm = R.compose(
  reduxForm({
    form: "CreateThreadForm",
  }),
  graphql(createThread, {
    props: ({ mutate }) => ({
      submit: ({ title, content }) => mutate({ variables: { title, content } }),
    }),
  })
)(({ handleSubmit, submit }) => {
  return (
    <form
      onSubmit={handleSubmit(({ title, content }) =>
        submit({ title, content })
          .then(console.log)
          .catch(console.dir)
      )}
    >
      <h1>Create Thread Form</h1>

      <TextField name="title" label="Title" />
      <TextField name="content" label="Content" />

      <button className="mt-2" type="submit">
        Submit
      </button>
    </form>
  )
})

export default CreateThreadForm

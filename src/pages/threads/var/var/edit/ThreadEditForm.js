import * as React from "react"
import { reduxForm } from "lib/redux-form"
import { TextField } from "components/form"

const ThreadEditForm = reduxForm({
  form: "ThreadEditForm",
  initialValues: {
    title: "test title",
    content: "test content",
  },
})(({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField name="title" label="Title" />
      <TextField name="content" label="Content" />
    </form>
  )
})

export default ThreadEditForm

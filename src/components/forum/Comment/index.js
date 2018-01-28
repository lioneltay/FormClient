import * as React from "react"
import css from "./css.module.css"

const Comment = ({ content, author: { full_name } = {} }) => {
  return (
    <div className={`card mt-2 ${css.comment}`}>
      <div>{full_name || "anonymous"}</div>
      <div>{content}</div>
    </div>
  )
}

export default Comment

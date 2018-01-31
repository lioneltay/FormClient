import * as React from "react"
import css from "./css.module.css"
import moment from "moment"

import { CommentC } from "components/forum"

const Thread = ({
  createdAt,
  title,
  content,
  author = {},
  rootComments = [],
}) => {
  return (
    <div>
      <div className={`mt-2 card ${css["thread-item"]}`}>
        <div className={css.title}>
          <strong>{title}</strong>
        </div>
        <div className={css.author}>
          <span className="mr-2">
            {(author && author.fullName) || "anonymous"}
          </span>
          <span className={css.createdAt}>{moment(createdAt).fromNow()}</span>
        </div>
        <div className={css.content}>{content}</div>
      </div>

      {rootComments.map(comment => (
        <CommentC key={comment.id} id={comment.id} />
      ))}
    </div>
  )
}

export default Thread

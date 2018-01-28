import * as React from "react"
import css from "./css.module.css"

import { Comment } from "components/forum"

const Thread = ({ id, title, content, author = {}, rootComments = [] }) => {
  return (
    <div>
      <div className={`mt-2 card ${css["thread-item"]}`}>
        <div className={css.title}>
          <strong>{title}</strong>
        </div>
        <div className={css.author}>
          {author ? author.full_name : "anonymous"}
        </div>
        <div className={css.content}>{content}</div>
      </div>

      {rootComments.map(({ id, content, author }) => (
        <Comment key={id} content={content} author={author} />
      ))}
    </div>
  )
}

export default Thread

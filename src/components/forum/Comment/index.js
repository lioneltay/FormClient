import * as React from "react"
import css from "./css.module.css"
import moment from "moment"

import noop from "utils/noop"

import { Display } from "components"

const Comment = ({
  created_at,
  content,
  subComments = [],
  author: { full_name } = {},
  collapsed = false,
  onToggleCollapse = noop,
}) => {
  return (
    <div className={`card mt-2 ${css.comment}`}>
      <div className={css.author}>
        <span className="cursor-pointer mr-1" onClick={onToggleCollapse}>
          [{collapsed ? "+" : "-"}]
        </span>
        <span className="mr-2">{full_name || "anonymous"}</span>
        <span className={css.created_at}>{moment(created_at).fromNow()}</span>
      </div>

      <Display visible={!collapsed}>
        <div className={css.content}>{content}</div>
        <div>{subComments}</div>
      </Display>
    </div>
  )
}

export default Comment

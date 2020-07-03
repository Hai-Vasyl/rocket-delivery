import React, { useContext, useState, useEffect } from "react"
import { Context } from "../context/Context"
import style from "../styles/FoodPage.module.css"
import { useHTTP } from "../hooks/useHTTP"
import Comment from "../components/Comment"
import LoaderData from "../components/LoaderData"
import CommentForm from "./CommentForm"
import { useRate } from "../hooks/useRate"

function Comments({ foodid }) {
  const { token } = useContext(Context)
  const { fetchData, load } = useHTTP()
  const [comments, setComments] = useState([])
  const { handleRate } = useRate()
  const { containerComments, commentWarning, commentsCounter } = style

  useEffect(() => {
    fetchData(
      "get",
      `/api/comments/list/${token.token ? "auth/" : ""}${foodid}`,
      null,
      setComments
    )
  }, [foodid, token.token, fetchData])

  const reduceRate = (status, state, nameState) => {
    handleRate(status, state, setComments, nameState)
  }

  const commentsJSX = comments.map((comment) => {
    return (
      <Comment
        key={comment._id}
        comment={comment}
        setComments={setComments}
        reduceRate={reduceRate}
      />
    )
  })

  if (!load) {
    return <LoaderData />
  }

  return (
    <div className={containerComments}>
      {token.token ? (
        <CommentForm
          setComments={setComments}
          foodid={foodid}
          commentCouter={comments.length}
        />
      ) : (
        <div className={commentWarning}>
          <span>Please register, to leave a comment =)</span>
          <span className={commentsCounter}>{comments.length} comments</span>
        </div>
      )}
      {commentsJSX}
    </div>
  )
}

export default Comments

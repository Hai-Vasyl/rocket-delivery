import React, { useState, useContext } from "react"
import style from "../styles/FoodPage.module.css"
import { BsArrowRightShort } from "react-icons/bs"
import { IoIosAlert } from "react-icons/io"
import { Context } from "../context/Context"
import { useCreateComment } from "../hooks/useCreateComment"

function CommentForm({ setComments, foodid, commentCouter }) {
  const [formComment, setFormComment] = useState("")
  const { handleCreateComment } = useCreateComment()
  const { token } = useContext(Context)
  const [message, setMessage] = useState("")

  const {
    commentBlock,
    avaBlock,
    postBtn,
    username,
    form,
    imgBox,
    alertBox,
    alertPopup,
    commentsCounter,
  } = style

  const handleChangeComment = (e) => {
    setFormComment(e.target.value)
    setMessage("")
  }

  const onCreateComment = () => {
    if (!formComment) {
      setMessage("Fill Field!")
      return
    }
    handleCreateComment(formComment, setComments, foodid, "comments")
    setFormComment("")
  }

  return (
    <div className={commentBlock}>
      <div className={avaBlock}>
        <div className={imgBox}>
          <img src={token.ava} alt='avaImage' />
        </div>
      </div>

      <div className={form}>
        <h3 className={username}>{token.username}</h3>
        <textarea
          onChange={handleChangeComment}
          value={formComment}
          placeholder='Comment'
        ></textarea>
        <button className={postBtn} onClick={onCreateComment}>
          <span>Post</span> <BsArrowRightShort />
        </button>
        <span
          className={`${alertBox} ${!!message && alertPopup}`}
          onClick={() => setMessage("")}
        >
          <IoIosAlert /> <span>{message}</span>
        </span>
      </div>
      <span className={commentsCounter}>{commentCouter} comments</span>
    </div>
  )
}

export default CommentForm

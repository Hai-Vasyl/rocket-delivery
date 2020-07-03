import React, { useContext, useState } from "react"
import style from "../styles/Comment.module.css"
import { AiOutlineLike, AiOutlineDislike, AiOutlineClose } from "react-icons/ai"
import { RiQuestionAnswerLine } from "react-icons/ri"
import { Context } from "../context/Context"
import { useCreateComment } from "../hooks/useCreateComment"
import { IoIosAlert } from "react-icons/io"

function Comment({ comment, setComments, reduceRate }) {
  const [reply, setReply] = useState(false)
  const { handleCreateComment } = useCreateComment()
  const {
    wrapper,
    avaContainer,
    infoContainer,
    contentBlock,
    rateBlock,
    img,
    typeUser,
    titleBlock,
    name,
    date,
    btnRate,
    rate,
    answerBtn,
    formAnswer,
    inputAnswer,
    submitAnswerBtn,
    wrapperAnswers,
    btnActive,
    hideForm,
    cancel,
    alertBox,
    alertPopup,
    unActive,
    invertColorBtn,
    invertColorWrapper,
    invertColorText,
    invertColorContent,
    unActiveBtn,
    warningPopup,
    threeangle,
  } = style

  const { token } = useContext(Context)
  const [formComment, setFormComment] = useState("")
  const [message, setMessage] = useState("")

  const handleChangeAnswer = (e) => {
    setFormComment(e.target.value)
    setMessage("")
  }

  const handleReply = () => {
    if (reply) {
      setFormComment("")
      setMessage("")
    }
    setReply(!reply)
  }

  const onCreateComment = (e) => {
    e.preventDefault()

    if (!formComment) {
      setMessage("Fill Field!")
      return
    }

    handleCreateComment(formComment, setComments, comment._id, "answers")
    setFormComment("")
    setReply(false)
  }

  function commentJSX(content, nameState, isComment) {
    return (
      <div className={`${wrapper} ${!isComment && invertColorWrapper}`}>
        <div className={avaContainer}>
          <div className={img}>
            <img src={content.owner.ava} alt='avaImg' />
          </div>
          <div className={`${typeUser} ${!isComment && invertColorText}`}>
            {content.owner.typeUser}
          </div>
        </div>

        <div className={infoContainer}>
          <div className={titleBlock}>
            <h3 className={`${name} ${!isComment && invertColorText}`}>
              {content.owner.username}
            </h3>
            <span className={date}>{content.date.slice(0, 10)}</span>
          </div>

          <div
            className={`${contentBlock} ${!isComment && invertColorContent}`}
          >
            <span>{content.content}</span>
          </div>

          <div className={rateBlock}>
            <button
              className={`${btnRate} ${!isComment && invertColorBtn} ${
                token.token
                  ? content.rateStatus === true && btnActive
                  : unActiveBtn
              }`}
              onClick={() => reduceRate(true, content, nameState)}
            >
              <AiOutlineLike />
              <span className={warningPopup}>
                Register, to like comment!
                <span className={threeangle}></span>
              </span>
            </button>
            <span className={`${rate} ${!isComment && invertColorText}`}>
              {content.rate}
            </span>
            <button
              className={`${btnRate} ${!isComment && invertColorBtn} ${
                !isComment && invertColorBtn
              } ${
                token.token
                  ? content.rateStatus === false && btnActive
                  : unActiveBtn
              }`}
              onClick={() => reduceRate(false, content, nameState)}
            >
              <AiOutlineDislike />
              <span className={warningPopup}>
                Register, to dislike comment!
                <span className={threeangle}></span>
              </span>
            </button>
            {isComment && (
              <button
                className={`${answerBtn} ${
                  !token.token ? unActive : reply && cancel
                }`}
                onClick={handleReply}
              >
                {reply ? (
                  <>
                    <AiOutlineClose /> <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <RiQuestionAnswerLine /> <span>Reply</span>
                  </>
                )}
              </button>
            )}
          </div>
          {isComment && (
            <span
              className={`${alertBox} ${!!message && alertPopup}`}
              onClick={() => setMessage("")}
            >
              <IoIosAlert /> <span>{message}</span>
            </span>
          )}
        </div>

        {isComment && (
          <>
            <form
              className={`${formAnswer} ${reply && hideForm}`}
              onSubmit={onCreateComment}
            >
              <input
                type='text'
                className={inputAnswer}
                value={formComment}
                onChange={handleChangeAnswer}
                autoComplete='off'
                placeholder='Type Answer here'
              />
              <button className={submitAnswerBtn}>Submit</button>
            </form>
          </>
        )}
      </div>
    )
  }

  const answerJSX = comment.answerList.map((answer) => {
    return (
      <div className={wrapperAnswers} key={answer._id}>
        {commentJSX(answer, "Answers", false)}
      </div>
    )
  })

  return (
    <>
      {commentJSX(comment, "Comments", true)}
      {answerJSX}
    </>
  )
}

export default Comment

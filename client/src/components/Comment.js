import React, { useContext, useState } from "react"
import style from "../styles/Comment.module.css"
import { AiOutlineLike, AiOutlineDislike, AiOutlineClose } from "react-icons/ai"
import { RiQuestionAnswerLine } from "react-icons/ri"
import Answer from "../components/Answer"
import { Context } from "../context/Context"
import axios from "axios"
import { IoIosAlert } from "react-icons/io"

function Comment({
  comment,
  handleLikeComment,
  handleDisLikeComment,
  handleLikeAnswer,
  handleDisLikeAnswer,
  handleSetStateComments,
}) {
  const [reply, setReply] = useState(false)
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
    mainWrapper,
    btnActive,
    hideForm,
    cancel,
    alertBox,
    alertPopup,
    unActive,
  } = style
  const { token } = useContext(Context)
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("")

  const answerJSX = comment.answerList.map((answer) => {
    return (
      <Answer
        key={answer._id}
        answer={answer}
        handleLikeAnswer={handleLikeAnswer}
        handleDisLikeAnswer={handleDisLikeAnswer}
      />
    )
  })

  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value)
    setMessage("")
  }

  const handleReply = () => {
    if (reply) {
      setAnswer("")
      setMessage("")
    }
    setReply(!reply)
  }

  const handleSubmitAnswer = (e) => {
    e.preventDefault()

    if (!!token.token) {
      if (!answer) {
        setMessage("Type Something!")
        return
      }

      const fetch = async () => {
        try {
          const res = await axios.post(
            `/api/answers/create/${comment._id}`,
            { content: answer },
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )

          handleSetStateComments(res.data, comment._id)
          setAnswer("")
          setReply(false)
        } catch (error) {}
      }

      fetch()
    } else {
    }
  }

  return (
    <div className={mainWrapper}>
      <div className={wrapper}>
        <div className={avaContainer}>
          <div className={img}>
            <img src={comment.owner.ava} alt='avaImg' />
          </div>
          <div className={typeUser}>{comment.owner.typeUser}</div>
        </div>

        <div className={infoContainer}>
          <div className={titleBlock}>
            <h3 className={name}>{comment.owner.username}</h3>
            <span className={date}>{comment.date.slice(0, 10)}</span>
          </div>

          <div className={contentBlock}>
            <span>{comment.content}</span>
          </div>

          <div className={rateBlock}>
            <button
              className={`${btnRate} ${
                comment.rateStatus === true && btnActive
              }`}
              onClick={() => handleLikeComment(comment)}
            >
              <AiOutlineLike />
            </button>
            <span className={rate}>{comment.rate}</span>
            <button
              className={`${btnRate} ${
                comment.rateStatus === false && btnActive
              }`}
              onClick={() => handleDisLikeComment(comment)}
            >
              <AiOutlineDislike />
            </button>
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
          </div>
          <span
            className={`${alertBox} ${!!message && alertPopup}`}
            onClick={() => setMessage("")}
          >
            <IoIosAlert /> <span>{message}</span>
          </span>
        </div>

        <form
          className={`${formAnswer} ${reply && hideForm}`}
          onSubmit={handleSubmitAnswer}
        >
          <input
            type='text'
            className={inputAnswer}
            value={answer}
            onChange={handleChangeAnswer}
            autoComplete='off'
            placeholder='Type Answer here'
          />
          <button className={submitAnswerBtn}>Submit</button>
        </form>
      </div>

      <div className={wrapperAnswers}>{answerJSX}</div>
    </div>
  )
}

export default Comment

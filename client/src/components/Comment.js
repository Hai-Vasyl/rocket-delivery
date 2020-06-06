import React from "react"
import style from "../styles/Comment.module.css"
// import { FaCommentSlash } from "react-icons/fa"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { RiQuestionAnswerLine } from "react-icons/ri"
import Answer from "../components/Answer"

function Comment({
  comment,
  handleLikeComment,
  handleDisLikeComment,
  handleLikeAnswer,
  handleDisLikeAnswer,
}) {
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

    wrapperAnswers,
    mainWrapper,
    btnActive,
  } = style

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
            <button className={answerBtn}>
              <RiQuestionAnswerLine /> <span>Reply</span>
            </button>
          </div>
        </div>
      </div>

      <div className={wrapperAnswers}>{answerJSX}</div>
    </div>
  )
}

export default Comment

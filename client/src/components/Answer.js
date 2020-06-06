import React from "react"
import style from "../styles/Comment.module.css"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
// import { RiQuestionAnswerLine } from "react-icons/ri"

function Comment({ answer, handleLikeAnswer, handleDisLikeAnswer }) {
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

    invertColorBtn,
    invertColorWrapper,
    invertColorText,
    invertColorContent,
    btnActive,
  } = style
  return (
    <div className={`${wrapper} ${invertColorWrapper}`}>
      <div className={avaContainer}>
        <div className={img}>
          <img src={answer.owner.ava} alt='avaImg' />
        </div>
        <div className={`${typeUser} ${invertColorText}`}>
          {answer.owner.typeUser}
        </div>
      </div>

      <div className={infoContainer}>
        <div className={titleBlock}>
          <h3 className={`${name} ${invertColorText}`}>
            {answer.owner.username}
          </h3>
          <span className={date}>{answer.date.slice(0, 10)}</span>
        </div>

        <div className={`${contentBlock} ${invertColorContent}`}>
          <span>{answer.content}</span>
        </div>

        <div className={rateBlock}>
          <button
            className={`${btnRate} ${invertColorBtn} ${
              answer.rateStatus === true && btnActive
            }`}
            onClick={() => handleLikeAnswer(answer)}
          >
            <AiOutlineLike />
          </button>
          <span className={`${rate} ${invertColorText}`}>{answer.rate}</span>
          <button
            className={`${btnRate} ${invertColorBtn} ${
              answer.rateStatus === false && btnActive
            }`}
            onClick={() => handleDisLikeAnswer(answer)}
          >
            <AiOutlineDislike />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment

import React from "react"
import style from "../styles/User.module.css"
import { Link } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"

function User({ user, handleDeleteUser }) {
  const {
    wrapper,
    containerImg,
    containerInf,
    userName,
    emailBlock,
    btnDelete,
    dateBlock,
    img,
    userNameLink,
    userImgLink,
    infoBlock,
    typeUser,
    btnBlock,
  } = style

  return (
    <div className={wrapper}>
      <div className={containerImg}>
        <div className={img}>
          <Link to='/all/users' className={userImgLink}>
            <img src={user.ava} alt='userImg' />
          </Link>
          <span className={typeUser}>{user.typeUser}</span>
        </div>
      </div>

      <div className={containerInf}>
        <div className={infoBlock}>
          <Link to='/all/users' className={userNameLink}>
            <h3 className={userName}>{user.username}</h3>
          </Link>
          <div className={emailBlock}>
            <span>Email: </span> {user.email}
          </div>
          <div className={dateBlock}>
            <span>Date: </span> {user.date.slice(0, 10)}
          </div>
        </div>
        <div className={btnBlock}>
          <button
            className={btnDelete}
            onClick={() => handleDeleteUser(user._id)}
          >
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </div>
  )
}

export default User

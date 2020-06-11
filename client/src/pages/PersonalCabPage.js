import React, { useEffect, useState, useContext } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import Cart from "../components/Cart"
import style from "../styles/PersonalCabPage.module.css"
import axios from "axios"
import { Context } from "../context/Context"
import { IoIosAlert } from "react-icons/io"
import { FaRegEdit } from "react-icons/fa"
import { RiShoppingCartLine } from "react-icons/ri"
import LoaderData from "../components/LoaderData"

function PersonalCab() {
  const { wrapper } = mainStyle
  const [message, setMessage] = useState("")
  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    typeUser: "",
    postalCode: "",
    address: "",
    phone: "",
    ava: "",
    date: "",
  })
  const [imgUser, setImgUser] = useState("")
  const [imgUserUpdate, setImgUserUpdate] = useState(false)
  const {
    container,
    imageContainer,
    img,
    typeUser,
    btnUpdate,
    update,
    infoContainer,
    block,
    usernameBlock,
    username,
    firstnameBlock,
    firstname,
    lastnameBlock,
    lastname,
    emailBlock,
    email,
    alertBox,
    addressBlock,
    address,
    formImageChange,
    postalcodeBlock,
    postalcode,
    dataNode,
    phoneBlock,
    phone,
    dateBlock,
    changeBtn,
    date,
    avaImage,
    activeBox,
    active,
    important,
    updateActive,
    containerCart,
    title,
    cartBox,
  } = style
  const { token } = useContext(Context)
  const [load, setLoad] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/auth/user/personalcab", {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        })
        setData(res.data)
      } catch (error) {}
    }

    fetch()
    setTimeout(() => setLoad(true), 1000)
  }, [token.token])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setMessage("")
  }

  const handleChangeForm = () => {
    let status = null
    const fetch = async () => {
      try {
        if (!data.username || !data.email) {
          setMessage("Fill All Important Fields!")
          status = true
          return
        }

        await axios.patch("/api/auth/user/change_userinfo", data, {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        })
      } catch (error) {}
    }

    statusUpdate && fetch()
    setStatusUpdate(status || !statusUpdate)
  }

  const handleChangeImage = (e) => {
    setImgUser(e.target.value)
    setMessage("")
  }

  const handleUpdateImage = async () => {
    try {
      if (!imgUser) {
        setMessage("Fill field!")
        return
      }

      await axios.patch(
        "/api/auth/user/change_userinfo",
        { ava: imgUser },
        {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        }
      )

      setData({ ...data, ava: imgUser })
      setImgUserUpdate(false)
      setImgUser("")
    } catch (error) {}
  }

  const handleChangeImageDrop = () => {
    setImgUserUpdate(!imgUserUpdate)
    setImgUser("")
  }
  if (!load) {
    return (
      <div className={wrapper}>
        <LoaderData />
      </div>
    )
  }
  return (
    <div className={wrapper}>
      <div className={container}>
        <div className={imageContainer}>
          <div className={img}>
            <div
              className={`${alertBox} ${!!message && activeBox}`}
              onClick={() => setMessage("")}
            >
              <IoIosAlert /> <span>{message}</span>
            </div>

            <img src={imgUser || data.ava} alt='userImage' />
            <button onClick={handleChangeImageDrop} className={changeBtn}>
              Change Image
            </button>
          </div>
          <div className={typeUser}>{data.typeUser}</div>

          <div className={`${avaImage} ${imgUserUpdate && active}`}>
            <label>User Image</label>
            <div className={formImageChange}>
              <input
                type='text'
                value={imgUser}
                onChange={handleChangeImage}
                placeholder='Source'
                autoComplete='off'
              />
              <button onClick={handleUpdateImage}>Change</button>
            </div>
          </div>

          <div className={btnUpdate}>
            <button
              className={`${update} ${!statusUpdate && updateActive}`}
              onClick={handleChangeForm}
            >
              <FaRegEdit />{" "}
              {!statusUpdate ? (
                <span>Edit Info</span>
              ) : (
                <span>Update Info</span>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleChangeForm} className={infoContainer}>
          <div className={`${block} ${usernameBlock}`}>
            {statusUpdate ? (
              <>
                <label>Username: </label>
                <input
                  type='text'
                  name='username'
                  value={data.username}
                  onChange={handleChange}
                  className={important}
                  autoComplete='off'
                />
              </>
            ) : (
              <h3 className={username}>{data.username}</h3>
            )}
          </div>

          <div className={`${block} ${firstnameBlock}`}>
            <label>First Name: </label>
            {statusUpdate ? (
              <input
                type='text'
                name='firstname'
                value={data.firstname}
                onChange={handleChange}
                autoComplete='off'
              />
            ) : (
              <span className={`${firstname} ${dataNode}`}>
                {data.firstname || "undefined"}
              </span>
            )}
          </div>

          <div className={`${block} ${lastnameBlock}`}>
            <label>Last Name: </label>
            {statusUpdate ? (
              <input
                type='text'
                name='lastname'
                value={data.lastname}
                onChange={handleChange}
                autoComplete='off'
              />
            ) : (
              <span className={`${lastname} ${dataNode}`}>
                {data.lastname || "undefined"}
              </span>
            )}
          </div>

          <div className={`${block} ${emailBlock}`}>
            <label>Email: </label>
            {statusUpdate ? (
              <input
                type='text'
                name='email'
                autoComplete='off'
                value={data.email}
                onChange={handleChange}
                className={important}
              />
            ) : (
              <span className={`${email} ${dataNode}`}>
                {data.email || "undefined"}
              </span>
            )}
          </div>

          <div className={`${block} ${addressBlock}`}>
            <label>Address: </label>
            {statusUpdate ? (
              <textarea
                type='text'
                name='address'
                autoComplete='off'
                value={data.address}
                onChange={handleChange}
              />
            ) : (
              <span className={`${address} ${dataNode}`}>
                {data.address || "undefined"}
              </span>
            )}
          </div>

          <div className={`${block} ${postalcodeBlock}`}>
            <label>Postal Code: </label>
            {statusUpdate ? (
              <input
                type='text'
                name='postalCode'
                value={data.postalCode}
                autoComplete='off'
                onChange={handleChange}
              />
            ) : (
              <span className={`${postalcode} ${dataNode}`}>
                {data.postalCode || "undefined"}
              </span>
            )}
          </div>

          <div className={`${block} ${phoneBlock}`}>
            <label>Phone: </label>
            {statusUpdate ? (
              <input
                type='text'
                name='phone'
                autoComplete='off'
                value={data.phone}
                onChange={handleChange}
              />
            ) : (
              <span className={`${phone} ${dataNode}`}>
                {data.phone || "undefined"}
              </span>
            )}
          </div>

          <div className={`${block} ${dateBlock}`}>
            <label>Date Creating: </label>
            <span className={`${date} ${dataNode}`}>
              {data.date.slice(0, 10)}
            </span>
          </div>
        </form>
      </div>

      <div className={containerCart}>
        <div className={title}>
          <RiShoppingCartLine /> <span>My Cart</span>{" "}
        </div>
        <div className={cartBox}>
          <Cart isCabinet={true} />
        </div>
      </div>
    </div>
  )
}

export default PersonalCab

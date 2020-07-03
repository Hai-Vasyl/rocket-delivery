import React, { useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import style from "../styles/Create-EditFoodPage.module.css"
import iconNoImage from "../imgs/icon-no-image.svg"
import { AiOutlinePlusCircle, AiOutlineAppstore } from "react-icons/ai"
import { RiUserSettingsLine } from "react-icons/ri"
import { BsPlus } from "react-icons/bs"
import { IoIosAlert } from "react-icons/io"
import { useModifyFood } from "../hooks/useModifyFood"

function CreateFoodPage() {
  const { wrapper } = mainStyle
  const { handleModify } = useModifyFood()

  const {
    containerForm,
    containerPreview,
    container,
    input,
    selectContainer,
    img,
    title,
    labelText,
    select,
    option,
    btnContainer,
    btnCreate,
    popupActiveStatusFalse,
    popupActiveStatusTrue,
    messagePopup,
    blockInput,
  } = style

  const [form, setForm] = useState({
    category: "pizza",
    name: "",
    price: "",
    img: "",
    institution: "Regina",
    weight: "",
    description: "",
  })
  const [message, setMessage] = useState("")

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage("")
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleModify(form, setMessage, true)
  }

  return (
    <div className={wrapper}>
      <div className={container}>
        <form className={containerForm} onSubmit={handleSubmitForm}>
          <div className={title}>
            <AiOutlinePlusCircle /> <span>Create New Food</span>
          </div>
          <div className={blockInput}>
            <label>Name: </label>
            <input
              className={input}
              type='text'
              name='name'
              value={form.name}
              onChange={handleChangeForm}
              autoComplete='off'
            />
          </div>
          <div className={blockInput}>
            <label>Price: </label>
            <input
              className={input}
              type='text'
              name='price'
              value={form.price}
              onChange={handleChangeForm}
              autoComplete='off'
            />
          </div>
          <div className={blockInput}>
            <label>Description: </label>
            <input
              className={input}
              type='text'
              name='description'
              value={form.description}
              onChange={handleChangeForm}
              autoComplete='off'
            />
          </div>

          <div className={selectContainer}>
            <label className={labelText}>
              <AiOutlineAppstore /> <span>Category:</span>{" "}
            </label>
            <select
              name='category'
              value={form.category}
              className={select}
              onChange={handleChangeForm}
            >
              <option value='pizza' className={option}>
                Pizza
              </option>
              <option value='salads' className={option}>
                Salads
              </option>
              <option value='main_dishes' className={option}>
                Main
              </option>
              <option value='sushi' className={option}>
                Sushi
              </option>
              <option value='burgers' className={option}>
                Burgers
              </option>
              <option value='soups' className={option}>
                Soups
              </option>
            </select>
          </div>

          <div className={blockInput}>
            <label>Image: </label>
            <input
              className={input}
              type='text'
              name='img'
              value={form.img}
              onChange={handleChangeForm}
              autoComplete='off'
            />
          </div>
          <div className={blockInput}>
            <label>Weight: </label>
            <input
              className={input}
              type='text'
              name='weight'
              value={form.weight}
              onChange={handleChangeForm}
              autoComplete='off'
            />
          </div>

          <div className={selectContainer}>
            <label className={labelText}>
              <RiUserSettingsLine /> <span>Institution:</span>{" "}
            </label>
            <select
              name='institution'
              className={select}
              value={form.institution}
              onChange={handleChangeForm}
            >
              <option value='Brown' className={option}>
                Brown
              </option>
              <option value='Regina' className={option}>
                Regina
              </option>
              <option value='Pulse' className={option}>
                Pulse
              </option>
              <option value='Embroidered_Shirt' className={option}>
                Embroidered_Shirt
              </option>
              <option value='Dari_Mora' className={option}>
                Dari_Mora
              </option>
            </select>
          </div>

          <div className={btnContainer}>
            <button className={btnCreate}>
              <BsPlus /> <span>Create</span>{" "}
            </button>
          </div>
        </form>

        <div className={containerPreview}>
          <div className={img}>
            <img src={form.img || iconNoImage} alt='prewievImg' />
            <span
              className={`${messagePopup} ${
                !!message &&
                (message.status === true
                  ? popupActiveStatusTrue
                  : popupActiveStatusFalse)
              }`}
              onClick={() => setMessage("")}
            >
              {!!message && message.status === false && <IoIosAlert />}{" "}
              <span>{message.message}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateFoodPage

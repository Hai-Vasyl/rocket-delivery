import React, { useState, useContext, useEffect } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import style from "../styles/Create-EditFoodPage.module.css"
import iconNoImage from "../imgs/icon-no-image.svg"
import {
  AiOutlineAppstore,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai"
import axios from "axios"
import { RiUserSettingsLine } from "react-icons/ri"
import { Context } from "../context/Context"
import { IoIosAlert } from "react-icons/io"
import { FaRegEdit } from "react-icons/fa"

function CreateFoodPage(props) {
  const { wrapper } = mainStyle
  const { token } = useContext(Context)
  const { foodid } = props.match.params
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
    invertContainer,
    invertColorContainerPreview,
    btnRemove,
    btnEdit,
  } = style
  const [form, setForm] = useState({
    category: "",
    name: "",
    price: "",
    img: "",
    institution: "",
    weight: "",
    description: "",
  })
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/foods/food/${foodid}`)

        setForm(res.data)
      } catch (error) {}
    }

    fetch()
  }, [foodid])

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage("")
  }

  const handleEditFood = async () => {
    try {
      if (
        !form.category ||
        !form.name ||
        !form.price ||
        !form.img ||
        !form.description ||
        !form.institution ||
        !form.weight
      ) {
        setMessage({ status: false, message: "Fill all fields!" })
        return
      }
      await axios.patch(`/api/foods/update/${foodid}`, form, {
        headers: {
          Authorization: `Basic ${token.token}`,
        },
      })

      setMessage({ status: true, message: "Food updated!" })
    } catch (error) {}
  }

  const handleDeleteFood = async () => {
    try {
      await axios.delete(`/api/foods/delete/${foodid}`, {
        headers: {
          Authorization: `Basic ${token.token}`,
        },
      })
      props.history.push(!!form.category ? `/categories/${form.category}` : "/")
    } catch (error) {}
  }

  return (
    <div className={wrapper}>
      <div className={`${container} ${invertContainer}`}>
        <div className={containerForm}>
          <div className={title}>
            <FaRegEdit /> <span>Edit Food</span>
          </div>
          <input
            className={input}
            type='text'
            name='name'
            value={form.name}
            onChange={handleChangeForm}
            autoComplete='off'
            placeholder='Name'
          />
          <input
            className={input}
            type='text'
            name='price'
            value={form.price}
            onChange={handleChangeForm}
            autoComplete='off'
            placeholder='Price'
          />
          <input
            className={input}
            type='text'
            name='description'
            value={form.description}
            onChange={handleChangeForm}
            autoComplete='off'
            placeholder='Description'
          />

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

          <input
            className={input}
            type='text'
            name='img'
            value={form.img}
            onChange={handleChangeForm}
            autoComplete='off'
            placeholder='Image'
          />
          <input
            className={input}
            type='text'
            name='weight'
            value={form.weight}
            onChange={handleChangeForm}
            autoComplete='off'
            placeholder='Weight'
          />

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
            <button
              className={`${btnCreate} ${btnEdit}`}
              onClick={handleEditFood}
            >
              <AiOutlineEdit /> <span>Edit</span>{" "}
            </button>
            <button
              className={`${btnCreate} ${btnRemove}`}
              onClick={handleDeleteFood}
            >
              <AiOutlineDelete /> <span>Remove</span>{" "}
            </button>
          </div>
        </div>

        <div className={`${containerPreview} ${invertColorContainerPreview}`}>
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

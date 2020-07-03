import React, { useState, useEffect } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import style from "../styles/Create-EditFoodPage.module.css"
import iconNoImage from "../imgs/icon-no-image.svg"
import { IoIosAlert } from "react-icons/io"
import { RiUserSettingsLine } from "react-icons/ri"
import {
  AiOutlineAppstore,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai"
import { FaRegEdit } from "react-icons/fa"
import LoaderData from "../components/LoaderData"
import { useHTTP } from "../hooks/useHTTP"
import { useModifyFood } from "../hooks/useModifyFood"
import { Link } from "react-router-dom"

function CreateFoodPage(props) {
  const { wrapper } = mainStyle
  const { foodid } = props.match.params
  const { load, fetchData } = useHTTP()
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
    invertContainer,
    invertColorContainerPreview,
    btnRemove,
    btnEdit,
    blockInput,
    goBtn,
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
    fetchData("get", `/api/foods/food/${foodid}`, null, setForm)
  }, [foodid, fetchData])

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage("")
  }

  const handleDeleteFood = async () => {
    try {
      await fetchData("delete", `/api/foods/delete/${foodid}`)
      props.history.push(!!form.category ? `/categories/${form.category}` : "/")
    } catch (error) {}
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
      <div className={`${container} ${invertContainer}`}>
        <div className={containerForm}>
          <div className={title}>
            <FaRegEdit /> <span>Edit Food</span>
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
            <button
              className={`${btnCreate} ${btnEdit}`}
              onClick={() => handleModify(form, setMessage, false, foodid)}
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
            <Link to={`/details/${form._id}`}>
              <span className={goBtn}>Go There</span>
              <img src={form.img || iconNoImage} alt='prewievImg' />
            </Link>
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

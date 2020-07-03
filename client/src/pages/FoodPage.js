import React, { useState, useEffect, useContext } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import style from "../styles/FoodPage.module.css"
import { Link } from "react-router-dom"
import { RiShoppingCartLine } from "react-icons/ri"
import { AiOutlineLike, AiOutlineDislike, AiOutlineCheck } from "react-icons/ai"
import { Context } from "../context/Context"
import { FiArrowRight } from "react-icons/fi"
import LoaderData from "../components/LoaderData"
import Comments from "../components/Comments"
import { v4 as uuidv4 } from "uuid"
import { useHTTP } from "../hooks/useHTTP"
import { useOrderAmountReducer } from "../hooks/useOrderAmountReducer"
import { useRate } from "../hooks/useRate"

function FoodPage(props) {
  const { wrapper } = mainStyle
  const [data, setData] = useState({})
  const [added, setAdded] = useState(false)
  const [orderFoodAmount, setOrderFoodAmount] = useState("")
  const { token, orders, setOrders } = useContext(Context)
  const { fetchData, load } = useHTTP()
  const { reduceOrderAmount } = useOrderAmountReducer()
  const { handleRate } = useRate()

  const {
    containerCard,
    imgContainer,
    img,
    rateBlock,
    btnRate,
    rate,
    propContainer,
    title,
    mainBlock,
    descriptionBlock,
    descriptionText,
    weightBlock,
    weightText,
    linkBlock,
    categoryText,
    institutionText,
    imgFlowSide,
    text,
    price,
    description,
    weight,
    institution,
    category,
    grivnaSign,
    buttonsBlock,
    btnAddAmount,
    btnAmount,
    cart,
    amount,
    dateBlock,
    dateText,
    date,
    link,
    btnActive,
    linkEdit,
    activeCart,
    backgroundFood,
    invertColorBtnAmount,
    unActiveBtn,
    warningPopup,
    threeangle,
  } = style
  const { foodid } = props.match.params

  useEffect(() => {
    fetchData(
      "get",
      `/api/foods/food/${token.token ? "auth/" : ""}${foodid}`,
      null,
      setData
    )
  }, [foodid, token.token, fetchData])

  useEffect(() => {
    let amount = ""
    let added = false
    orders.forEach((order) => {
      if (order.foodProps._id === foodid) {
        added = true
        amount = order.amount
        return
      }
    })

    setOrderFoodAmount(amount)
    setAdded(added)
  }, [orders, foodid])

  const handleAddRemoveFoodCart = async () => {
    try {
      if (added) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.foodProps._id !== foodid)
        )

        if (token.token) {
          fetchData("delete", `/api/orders/delete/${foodid}`)
        }
      } else {
        let resId = uuidv4()
        if (token.token) {
          resId = await fetchData("post", `/api/orders/create/${foodid}`)
        }

        setOrders((prevOrders) => [
          ...prevOrders,
          {
            foodProps: data,
            generalPrice: data.price,
            amount: 1,
            status: true,
            _id: resId,
          },
        ])
      }
    } catch (error) {}
  }

  const handleReduceAmount = (typeReducer) => {
    reduceOrderAmount(false, typeReducer, foodid)

    if (token.token) {
      fetchData(
        "patch",
        `/api/orders/amount/${typeReducer ? "add" : "remove"}/${foodid}`
      )
    }
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
      <div className={containerCard}>
        <div className={imgContainer}>
          <div className={imgFlowSide}>
            <div className={img}>
              <img src={data.img} alt='imgCard' />
              {!!token && token.typeUser === "Admin" && (
                <div>
                  <Link className={linkEdit} to={`/edit/${foodid}`}>
                    <span>Edit Food</span> <FiArrowRight />
                  </Link>
                  <div className={backgroundFood}></div>
                </div>
              )}
            </div>
            <div className={rateBlock}>
              <button
                className={`${btnRate} ${
                  token.token
                    ? data.rateStatus === true && btnActive
                    : unActiveBtn
                }`}
                onClick={() => handleRate(true, data, setData, "Foods")}
              >
                <AiOutlineLike />
                <span className={warningPopup}>
                  Register, to like food!
                  <span className={threeangle}></span>
                </span>
              </button>
              <span className={rate}>{data.rate}</span>
              <button
                className={`${btnRate} ${
                  token.token
                    ? data.rateStatus === false && btnActive
                    : unActiveBtn
                }`}
                onClick={() => handleRate(false, data, setData, "Foods")}
              >
                <AiOutlineDislike />
                <span className={warningPopup}>
                  Register, to dislike food!
                  <span className={threeangle}></span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className={propContainer}>
          <div className={mainBlock}>
            <h2 className={title}>{data.name}</h2>
            <span className={price}>
              {data.price} <span className={grivnaSign}>&#8372;</span>
            </span>
          </div>

          <div className={descriptionBlock}>
            <span className={`${text} ${descriptionText}`}>description: </span>
            <span className={description}>{data.description}</span>
          </div>
          <div className={weightBlock}>
            <span className={`${text} ${weightText}`}>weight: </span>
            <span className={weight}>{data.weight}</span>
          </div>

          <div className={linkBlock}>
            <span className={`${text} ${categoryText}`}>category: </span>
            <Link
              to={`/categories/${data.category}`}
              className={`${link}  ${category}`}
            >
              {data.category}
            </Link>
            <br />
            <span className={`${text} ${institutionText}`}>institution: </span>
            <Link
              to={`/partners/${data.institution}`}
              className={`${link} ${institution}`}
            >
              {data.institution}
            </Link>
          </div>

          <div className={dateBlock}>
            <span className={`${text} ${dateText}`}>date creating: </span>
            <span className={date}>{data.date && data.date.slice(0, 10)}</span>
          </div>

          <div className={buttonsBlock}>
            <div className={btnAddAmount}>
              <div className={amount}>
                <span>{orderFoodAmount}</span>
              </div>
              <div>
                <button
                  className={`${btnAmount} ${added && invertColorBtnAmount}`}
                  onClick={() => handleReduceAmount(true)}
                >
                  +
                </button>
                <button
                  className={`${btnAmount} ${added && invertColorBtnAmount}`}
                  onClick={() => handleReduceAmount(false)}
                >
                  -
                </button>
              </div>
            </div>

            <button
              className={`${cart} ${added && activeCart}`}
              onClick={handleAddRemoveFoodCart}
            >
              {added ? (
                <>
                  <AiOutlineCheck /> <span>Added</span>
                </>
              ) : (
                <>
                  <RiShoppingCartLine /> <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Comments foodid={foodid} />
    </div>
  )
}

export default FoodPage

import React, { useState, useEffect, useContext } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import style from "../styles/FoodPage.module.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { RiShoppingCartLine } from "react-icons/ri"
import { AiOutlineLike, AiOutlineDislike, AiOutlineCheck } from "react-icons/ai"
import Comment from "../components/Comment"
import { Context } from "../context/Context"
import { BsArrowRightShort } from "react-icons/bs"
import { FiArrowRight } from "react-icons/fi"
import { IoIosAlert } from "react-icons/io"
import LoaderData from "../components/LoaderData"
import { v4 as uuidv4 } from "uuid"

function FoodPage(props) {
  const { wrapper } = mainStyle
  const [data, setData] = useState({})
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState("")
  const [added, setAdded] = useState(false)
  const [formComment, setFormComment] = useState("")
  const { token, orders, setOrders, addedOrder, setAddedOrder } = useContext(
    Context
  )
  const [load, setLoad] = useState(false)
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
    containerComments,
    commentBlock,
    avaBlock,
    postBtn,
    username,
    form,
    imgBox,
    btnActive,
    linkEdit,
    activeCart,
    backgroundFood,
    alertBox,
    alertPopup,
    commentWarning,
    invertColorBtnAmount,
    unActiveBtn,
  } = style
  const { foodid } = props.match.params

  const handleChangeComment = (e) => {
    setFormComment(e.target.value)
    setMessage("")
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!!token) {
          const res = await axios.get(`/api/foods/food/auth/${foodid}`, {
            headers: {
              Authorization: `Basic ${token.token}`,
            },
          })
          setData(res.data)
          const {
            category,
            name,
            price,
            institution,
            description,
            weight,
            img,
            rate,
            date,
            _id,
            rateList,
          } = res.data

          setData({
            _id,
            category,
            name,
            price,
            institution,
            description,
            weight,
            img,
            rate,
            date,
            rateStatus: rateList[0].status,
          })
        } else {
          const res = await axios.get(`/api/foods/food/${foodid}`)
          setData(res.data)
        }
        setAdded(false)
      } catch (error) {}
    }

    fetch()
    setTimeout(() => setLoad(true), 1000)
  }, [foodid, token])

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!!token) {
          const res = await axios.get(`/api/comments/list/auth/${foodid}`, {
            headers: {
              Authorization: `Basic ${token.token}`,
            },
          })

          setComments(res.data)
          setComments((prevComments) =>
            prevComments.map((elem) => {
              elem.rateStatus =
                elem.rateList[0] === undefined
                  ? "none"
                  : elem.rateList[0].status

              elem.answerList.map((answer) => {
                answer.rateStatus =
                  answer.rateList[0] === undefined
                    ? "none"
                    : answer.rateList[0].status

                return answer
              })

              return elem
            })
          )
        } else {
          const res = await axios.get(`/api/comments/list/${foodid}`)
          setComments(res.data)
        }
      } catch (error) {}
    }

    fetch()
  }, [foodid, token])

  useEffect(() => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          const res = await axios.get(`/api/orders/check/${foodid}`, {
            headers: {
              Authorization: `Basic ${token.token}`,
            },
          })

          setAdded(res.data)
        } catch (error) {}
      }

      fetch()
    } else {
      orders.map((order) => {
        if (order.foodProps._id === foodid) {
          setAdded(true)
        }
        return order
      })
    }
  }, [orders, data._id, foodid, token.token])

  const handleLikeComment = async (comment) => {
    try {
      const res = await axios.post(
        `/api/rateComments/create/${comment._id}`,
        { status: true, rate: comment.rate },
        {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        }
      )

      setComments((prevComments) =>
        prevComments.map((item) => {
          if (item._id === comment._id) {
            item = {
              ...item,
              rate: res.data.rate,
              rateStatus: res.data.status,
            }
          }
          return item
        })
      )
    } catch (error) {}
  }

  const handleDisLikeComment = async (comment) => {
    try {
      const res = await axios.post(
        `/api/rateComments/create/${comment._id}`,
        { status: false, rate: comment.rate },
        {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        }
      )

      setComments((prevComments) =>
        prevComments.map((item) => {
          if (item._id === comment._id) {
            item = {
              ...item,
              rate: res.data.rate,
              rateStatus: res.data.status,
            }
          }
          return item
        })
      )
    } catch (error) {}
  }

  const handleLikeAnswer = async (answer) => {
    try {
      const res = await axios.post(
        `/api/rateAnswers/create/${answer._id}`,
        { status: true, rate: answer.rate },
        {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        }
      )

      setComments((prevComments) =>
        prevComments.map((item) => {
          item.answerList = item.answerList.map((itemAnswer) => {
            if (itemAnswer._id === answer._id) {
              itemAnswer = {
                ...itemAnswer,
                rate: res.data.rate,
                rateStatus: res.data.status,
              }
            }
            return itemAnswer
          })
          return item
        })
      )
    } catch (error) {}
  }

  const handleDisLikeAnswer = async (answer) => {
    try {
      const res = await axios.post(
        `/api/rateAnswers/create/${answer._id}`,
        { status: false, rate: answer.rate },
        {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        }
      )

      setComments((prevComments) =>
        prevComments.map((item) => {
          item.answerList = item.answerList.map((itemAnswer) => {
            if (itemAnswer._id === answer._id) {
              itemAnswer = {
                ...itemAnswer,
                rate: res.data.rate,
                rateStatus: res.data.status,
              }
            }
            return itemAnswer
          })
          return item
        })
      )
    } catch (error) {}
  }

  const handleSetStateComments = (newAnswer, commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          const owner = {
            username: token.username,
            ava: token.ava,
            typeUser: token.typeUser,
          }

          comment.answerList = [...comment.answerList, { ...newAnswer, owner }]
        }
        return comment
      })
    )
  }

  const commentsJSX = comments.map((comment) => {
    return (
      <Comment
        key={comment._id}
        comment={comment}
        handleLikeComment={handleLikeComment}
        handleDisLikeComment={handleDisLikeComment}
        handleLikeAnswer={handleLikeAnswer}
        handleDisLikeAnswer={handleDisLikeAnswer}
        handleSetStateComments={handleSetStateComments}
      />
    )
  })

  const handleUnLike = async () => {
    try {
      const res = await axios.post(
        `/api/rateFoods/create/${foodid}`,
        { status: false, rate: data.rate },
        {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        }
      )
      setData({
        ...data,
        rate: res.data.rate,
        rateStatus: res.data.status,
      })
    } catch (error) {}
  }

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `/api/rateFoods/create/${foodid}`,
        { status: true, rate: data.rate },
        {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        }
      )

      setData({
        ...data,
        rateStatus: res.data.status,
        rate: res.data.rate,
      })
    } catch (error) {}
  }

  const handleAddFoodToCart = () => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          const res = await axios.post(
            `/api/orders/create/${foodid}`,
            { price: data.price },
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )

          setOrders((prevOrders) => [...prevOrders, res.data])
        } catch (error) {}
      }

      fetch()
    } else {
      setOrders((prevOrders) => [
        ...prevOrders,
        {
          foodProps: data,
          generalPrice: data.price,
          amount: 1,
          status: true,
          _id: uuidv4(),
        },
      ])
    }
    setAddedOrder("")
  }

  const handleRemoveFoodFromCart = async () => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.foodProps._id !== foodid)
          )

          await axios.delete(`/api/orders/delete/${foodid}`, {
            headers: {
              Authorization: `Basic ${token.token}`,
            },
          })
        } catch (error) {}
      }

      fetch()
    } else {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.foodProps._id !== foodid)
      )
    }
    setAdded(false)
    setAddedOrder("")
  }

  const handleRemove = () => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          const res = await axios.patch(
            `/api/orders/amount/remove/${foodid}`,
            null,
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )
          if (res.data.statusError) {
            return
          }
          const { generalPrice, amount } = res.data

          setOrders((prevOrders) =>
            prevOrders.map((order) => {
              if (order.foodProps._id === foodid) {
                order.amount = amount
                order.generalPrice = generalPrice
              }
              return order
            })
          )
        } catch (error) {}
      }

      fetch()
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.foodProps._id === foodid && order.amount !== 1) {
            const amountOrder = order.amount - 1
            order.generalPrice =
              (order.generalPrice / order.amount) * amountOrder
            order.amount = amountOrder
          }
          return order
        })
      )
    }
  }

  const handleAdd = () => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          const res = await axios.patch(
            `/api/orders/amount/add/${foodid}`,
            null,
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )

          const { generalPrice, amount } = res.data

          setOrders((prevOrders) =>
            prevOrders.map((order) => {
              if (order.foodProps._id === foodid) {
                order.amount = amount
                order.generalPrice = generalPrice
              }
              return order
            })
          )
        } catch (error) {}
      }

      fetch()
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.foodProps._id === foodid) {
            const amountOrder = order.amount + 1
            order.generalPrice =
              (order.generalPrice / order.amount) * amountOrder
            order.amount = amountOrder
          }
          return order
        })
      )
    }
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()

    if (!!token.token) {
      const fetch = async () => {
        try {
          if (!formComment) {
            return setMessage("Fill Field To Post!")
          }

          const res = await axios.post(
            `/api/comments/create/${data._id}`,
            { content: formComment },
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )

          const owner = {
            username: token.username,
            typeUser: token.typeUser,
            ava: token.ava,
          }
          setComments((prevComments) => [
            ...prevComments,
            { ...res.data, owner },
          ])
          setFormComment("")
        } catch (error) {}
      }

      fetch()
    } else {
    }
  }

  let orderAmount

  orders.forEach((order) => {
    if (order.foodProps._id === foodid) {
      orderAmount = order.amount
    }
  })

  const displayCommentPost = () => {
    return (
      <div className={commentBlock}>
        <div className={avaBlock}>
          <div className={imgBox}>
            <img src={token.ava} alt='avaImage' />
          </div>
        </div>
        <form className={form} onSubmit={handleSubmitComment}>
          <h3 className={username}>{token.username}</h3>
          <textarea
            onChange={handleChangeComment}
            value={formComment}
            placeholder='Comment'
          ></textarea>
          <button className={postBtn} onClick={handleSubmitComment}>
            <span>Post</span> <BsArrowRightShort />
          </button>
          <span
            className={`${alertBox} ${!!message && alertPopup}`}
            onClick={() => setMessage("")}
          >
            <IoIosAlert /> <span>{message}</span>
          </span>
        </form>
      </div>
    )
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
                  !!token.token
                    ? data.rateStatus === true && btnActive
                    : unActiveBtn
                }`}
                onClick={handleLike}
              >
                <AiOutlineLike />
              </button>
              <span className={rate}>{data.rate}</span>
              <button
                className={`${btnRate} ${
                  !!token.token
                    ? data.rateStatus === false && btnActive
                    : unActiveBtn
                }`}
                onClick={handleUnLike}
              >
                <AiOutlineDislike />
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
                <span>{orderAmount}</span>
              </div>
              <div>
                <button
                  className={`${btnAmount} ${
                    (typeof addedOrder === "string" ? !added : !addedOrder) &&
                    invertColorBtnAmount
                  }`}
                  onClick={handleAdd}
                >
                  +
                </button>
                <button
                  className={`${btnAmount} ${
                    (typeof addedOrder === "string" ? !added : !addedOrder) &&
                    invertColorBtnAmount
                  }`}
                  onClick={handleRemove}
                >
                  -
                </button>
              </div>
            </div>
            {(typeof addedOrder === "string" ? added : addedOrder) ? (
              <button
                className={`${cart} ${activeCart}`}
                onClick={handleRemoveFoodFromCart}
              >
                <AiOutlineCheck /> <span>Added</span>
              </button>
            ) : (
              <button className={cart} onClick={handleAddFoodToCart}>
                <RiShoppingCartLine /> <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={containerComments}>
        {!!token.token ? (
          displayCommentPost()
        ) : (
          <div className={commentWarning}>
            =( Want to leave a comment - first register!
          </div>
        )}

        {commentsJSX}
      </div>
    </div>
  )
}

export default FoodPage

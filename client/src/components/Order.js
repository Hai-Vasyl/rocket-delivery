import React from "react"
import style from "../styles/Order.module.css"
import { Link } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"

function Order({
  order,
  index,
  isCabinet,
  token,
  setPopupCart,
  handleAdd,
  handleRemove,
  handleDelete,
}) {
  const {
    wrapper,
    orderIndex,
    orderName,
    img,
    btnsAmount,
    purchaseBtn,
    deleteBtn,
    amount,
    btnAmount,
    block,
    link,
    containerInfo,
    priceBlock,
    btnBlock,
    buyBtn,
  } = style

  return (
    <div className={wrapper}>
      <span className={orderIndex}>{index}</span>

      <Link
        to={`/details/${order.foodProps._id}`}
        onClick={() => setPopupCart(false)}
        className={img}
      >
        <img src={order.foodProps.img} alt='imgFood' />
      </Link>

      <div className={containerInfo}>
        <Link
          className={orderName}
          onClick={() => setPopupCart(false)}
          to={`/details/${order.foodProps._id}`}
        >
          {order.foodProps.name}
        </Link>
        <div className={block}>
          <span>Category: </span>
          <Link
            className={link}
            onClick={() => setPopupCart(false)}
            to={`/categories/${order.foodProps.category}`}
          >
            {order.foodProps.category}
          </Link>
        </div>
        <div className={block}>
          <span>Insitution: </span>
          <Link
            className={link}
            onClick={() => setPopupCart(false)}
            to={`/partners/${order.foodProps.institution}`}
          >
            {order.foodProps.institution}
          </Link>
        </div>
      </div>

      <div className={priceBlock}>
        <span>Price: </span>
        <div>{order.generalPrice}</div>
      </div>

      <div className={btnBlock}>
        <div className={btnsAmount}>
          <button className={btnAmount} onClick={() => handleAdd(order._id)}>
            +
          </button>
          <span className={amount}>{order.amount}</span>
          <button className={btnAmount} onClick={() => handleRemove(order._id)}>
            -
          </button>
        </div>
        {!!token.token && !isCabinet && (
          <Link
            className={purchaseBtn}
            to='/personalcab'
            onClick={() => setPopupCart(false)}
          >
            <span>Purchase</span> <BsArrowRight />
          </Link>
        )}
        {(!token.token || isCabinet) && (
          <button className={buyBtn}>
            <span>Buy</span> <AiOutlineCheck />
          </button>
        )}
        <button className={deleteBtn} onClick={() => handleDelete(order._id)}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  )
}

export default Order

import React from "react"
import style from "../styles/App.module.css"
import { Link } from "react-router-dom"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { RiShoppingCartLine } from "react-icons/ri"
import Cart from "./Cart"

function CartNavbar({ popupCart, setPopupCart, token }) {
  const {
    popup,
    linkPersonalCab,
    linkContinue,
    containerCart,
    title,
    linkContainer,
    popupActive,
    background,
    backgroundOn,
  } = style

  return (
    <>
      <div
        className={`${background} ${popupCart && backgroundOn}`}
        onClick={() => setPopupCart(false)}
      ></div>

      <div className={`${popup} ${popupCart && popupActive}`}>
        <span className={title}>
          <RiShoppingCartLine /> <span>My Cart</span>
        </span>
        <div className={containerCart}>
          <Cart isCabinet={false} />
        </div>
        <div className={linkContainer}>
          <button className={linkContinue} onClick={() => setPopupCart(false)}>
            <AiOutlineLeft /> <span>Continue Shoping</span>
          </button>
          {!!token.token && (
            <Link
              className={linkPersonalCab}
              to='/personalcab'
              onClick={() => setPopupCart(false)}
            >
              <span>Personal Cabinet</span> <AiOutlineRight />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default CartNavbar

import React, { useContext, useState } from "react"
import style from "../styles/Navbar.module.css"
import { Context } from "../context/Context"
import { NavLink } from "react-router-dom"
import { IoIosRocket } from "react-icons/io"
import { FiUser, FiUsers, FiPlus } from "react-icons/fi"
import { FaSignOutAlt } from "react-icons/fa"
import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineAppstore,
  AiOutlineUsergroupAdd,
} from "react-icons/ai"
import { MdKeyboardArrowRight } from "react-icons/md"
import { FaSignInAlt, FaCheckCircle } from "react-icons/fa"
import { RiShoppingCartLine } from "react-icons/ri"

function Navbar() {
  const {
    wrapper,
    navbar,
    link,
    activeLink,
    logoLink,
    authBlock,
    activeDrop,
    dropMenu,
    dropDownMenu,
    centerBlock,
    dropLink,
    linkActive,
    triangeDrop,
    arrowDrop,
    dropLinkActive,
    btnDropAdaptive,
    activeAdaptive,
    titleLogo,
    linkAdaptive,
    centerBlockAdaptive,
    resizeBriefLogo,
    authAdaptiveLinks,
  } = style
  const {
    token,
    setToken,
    drop,
    setDrop,
    setOrders,
    popupCart,
    setPopupCart,
  } = useContext(Context)

  const [dropAdaptive, setDropAdaptive] = useState(false)

  const handlerSignOut = () => {
    localStorage.removeItem("Auth")
    setToken(false)
    setDrop(false)
    setPopupCart(false)
    setOrders([])
  }
  const hadleDropDownAdaptive = () => {
    setDropAdaptive(!dropAdaptive)
    if (!dropAdaptive) {
      setPopupCart(false)
    }
  }
  const handleDropDownActive = () => {
    setDrop(!drop)
    setPopupCart(false)
  }
  const handleOpenCart = () => {
    setDrop(false)
    setPopupCart(!popupCart)
  }
  const removeAllActivePopups = () => {
    setDrop(false)
    setPopupCart(false)
  }

  const styleAdaptiveLink = () => {
    return (
      <>
        <NavLink
          exact
          to='/categories'
          className={`${link} ${linkAdaptive}`}
          activeClassName={activeLink}
          onClick={() => setDrop(false)}
        >
          <AiOutlineAppstore /> <span>All Categories</span>
        </NavLink>
        <NavLink
          exact
          to='/partners'
          className={`${link} ${linkAdaptive}`}
          activeClassName={activeLink}
          onClick={() => setDrop(false)}
        >
          <AiOutlineUsergroupAdd /> <span>Our Partners</span>
        </NavLink>
      </>
    )
  }
  const styleDropDownMenu = () => {
    return (
      <div className={dropDownMenu}>
        <button
          className={`${link} ${dropLink} ${drop && dropLinkActive}`}
          onClick={handleDropDownActive}
        >
          <AiOutlineMenu /> <span>All Dishes</span>{" "}
          <MdKeyboardArrowRight className={arrowDrop} />
        </button>
        <div className={`${dropMenu} ${drop && activeDrop}`}>
          <div className={triangeDrop}></div>
          <NavLink
            exact
            to='/categories'
            className={link}
            activeClassName={activeLink}
            onClick={() => setDrop(false)}
          >
            <AiOutlineAppstore /> <span>All Categories</span>
          </NavLink>
          <NavLink
            exact
            to='/partners'
            className={link}
            activeClassName={activeLink}
            onClick={() => setDrop(false)}
          >
            <AiOutlineUsergroupAdd /> <span>Our Partners</span>
          </NavLink>

          <NavLink
            exact
            to='/categories/salads'
            className={link}
            activeClassName={activeLink}
            onClick={() => setDrop(false)}
          >
            Salads
          </NavLink>
          <NavLink
            exact
            to='/categories/sushi'
            className={link}
            activeClassName={activeLink}
            onClick={() => setDrop(false)}
          >
            Sushi
          </NavLink>
          <NavLink
            exact
            to='/categories/main_dishes'
            className={link}
            onClick={() => setDrop(false)}
            activeClassName={activeLink}
          >
            Main Dishes
          </NavLink>
          <NavLink
            exact
            to='/categories/pizza'
            className={link}
            onClick={() => setDrop(false)}
            activeClassName={activeLink}
          >
            Pizza
          </NavLink>
          <NavLink
            exact
            to='/categories/soups'
            className={link}
            activeClassName={activeLink}
            onClick={() => setDrop(false)}
          >
            Soups
          </NavLink>
          <NavLink
            exact
            to='/categories/burgers'
            className={link}
            onClick={() => setDrop(false)}
            activeClassName={activeLink}
          >
            Burgers
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className={wrapper}>
      {!!token.token ? (
        token.typeUser === "User" ? (
          <div className={navbar}>
            <NavLink
              exact
              to='/'
              className={logoLink}
              onClick={removeAllActivePopups}
            >
              <IoIosRocket />{" "}
              <span className={titleLogo}>
                R<span className={resizeBriefLogo}>ocket</span>-D
                <span className={resizeBriefLogo}>elivery</span>
              </span>
            </NavLink>

            <div
              className={`${centerBlock} ${
                dropAdaptive && centerBlockAdaptive
              }`}
              onClick={hadleDropDownAdaptive}
            >
              <NavLink
                exact
                to='/'
                activeClassName={activeLink}
                className={link}
                onClick={removeAllActivePopups}
              >
                <AiOutlineHome /> <span>Home</span>
              </NavLink>

              <button
                className={`${link} ${popupCart && linkActive}`}
                onClick={handleOpenCart}
              >
                <RiShoppingCartLine /> <span>My Cart</span>
              </button>
              {styleAdaptiveLink()}

              {styleDropDownMenu()}

              <NavLink
                exact
                to='/personalcab'
                onClick={removeAllActivePopups}
                className={link}
                activeClassName={activeLink}
              >
                <FiUser /> <span>My Cabinet</span>
              </NavLink>
            </div>

            <button onClick={handlerSignOut} className={link}>
              <FaSignOutAlt /> <span>Sign Out</span>
            </button>
            <button
              className={`${link} ${btnDropAdaptive} ${
                dropAdaptive && activeAdaptive
              }`}
              onClick={hadleDropDownAdaptive}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        ) : (
          <div className={navbar}>
            <NavLink
              exact
              to='/'
              className={logoLink}
              onClick={removeAllActivePopups}
            >
              <IoIosRocket />{" "}
              <span className={titleLogo}>
                R<span className={resizeBriefLogo}>ocket</span>-D
                <span className={resizeBriefLogo}>elivery</span>
              </span>
            </NavLink>

            <div
              className={`${centerBlock} ${
                dropAdaptive && centerBlockAdaptive
              }`}
              onClick={hadleDropDownAdaptive}
            >
              <NavLink
                exact
                to='/'
                activeClassName={activeLink}
                className={link}
                onClick={removeAllActivePopups}
              >
                <AiOutlineHome /> <span>Home</span>
              </NavLink>
              <button
                className={`${link} ${popupCart && linkActive}`}
                onClick={handleOpenCart}
              >
                <RiShoppingCartLine /> <span>My Cart</span>
              </button>
              {styleAdaptiveLink()}
              {styleDropDownMenu()}
              <NavLink
                exact
                to='/create'
                className={link}
                onClick={removeAllActivePopups}
                activeClassName={activeLink}
              >
                <FiPlus /> <span>Create</span>
              </NavLink>
              <NavLink
                exact
                to='/users'
                onClick={removeAllActivePopups}
                className={link}
                activeClassName={activeLink}
              >
                <FiUsers /> <span>Users</span>
              </NavLink>
              <NavLink
                exact
                to='/personalcab'
                onClick={removeAllActivePopups}
                className={link}
                activeClassName={activeLink}
              >
                <FiUser /> <span>My Cabinet</span>
              </NavLink>
            </div>

            <button onClick={handlerSignOut} className={link}>
              <FaSignOutAlt /> <span>Sign Out</span>
            </button>
            <button
              className={`${link} ${btnDropAdaptive} ${
                dropAdaptive && activeAdaptive
              }`}
              onClick={hadleDropDownAdaptive}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        )
      ) : (
        <div className={navbar}>
          <NavLink
            exact
            to='/'
            className={logoLink}
            onClick={removeAllActivePopups}
          >
            <IoIosRocket />{" "}
            <span className={titleLogo}>
              R<span className={resizeBriefLogo}>ocket</span>-D
              <span className={resizeBriefLogo}>elivery</span>
            </span>
          </NavLink>

          <button
            className={`${link} ${btnDropAdaptive} ${
              dropAdaptive && activeAdaptive
            }`}
            onClick={hadleDropDownAdaptive}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            className={`${centerBlock} ${dropAdaptive && centerBlockAdaptive}`}
            onClick={hadleDropDownAdaptive}
          >
            <NavLink
              exact
              to='/'
              activeClassName={activeLink}
              className={link}
              onClick={removeAllActivePopups}
            >
              <AiOutlineHome /> <span>Home</span>
            </NavLink>

            <button
              className={`${link} ${popupCart && linkActive}`}
              onClick={handleOpenCart}
            >
              <RiShoppingCartLine /> <span>My Cart</span>
            </button>
            {styleAdaptiveLink()}
            {styleDropDownMenu()}
            <NavLink
              exact
              to='/auth/login'
              className={`${link} ${linkAdaptive}`}
              onClick={removeAllActivePopups}
              activeClassName={activeLink}
            >
              <FaSignInAlt /> <span>Sign In</span>
            </NavLink>
            <NavLink
              exact
              to='/auth/register'
              className={`${link} ${linkAdaptive}`}
              onClick={removeAllActivePopups}
              activeClassName={activeLink}
            >
              <FaCheckCircle /> <span>Sign Up</span>
            </NavLink>
          </div>

          <div className={`${authBlock} ${authAdaptiveLinks}`}>
            <NavLink
              exact
              to='/auth/login'
              className={link}
              onClick={removeAllActivePopups}
              activeClassName={activeLink}
            >
              <FaSignInAlt /> <span>Sign In</span>
            </NavLink>
            <NavLink
              exact
              to='/auth/register'
              className={link}
              onClick={removeAllActivePopups}
              activeClassName={activeLink}
            >
              <FaCheckCircle /> <span>Sign Up</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar

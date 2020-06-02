import React, { useContext } from "react"
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
    triangeDrop,
    arrowDrop,
    dropLinkActive,
  } = style
  const { token, setToken, drop, setDrop } = useContext(Context)

  const handlerSignOut = () => {
    localStorage.removeItem("Auth")
    setToken(false)
    setDrop(false)
  }

  const handleOpenCart = () => {
    setDrop(false)
  }

  const styleDropDownMenu = () => {
    return (
      <div className={dropDownMenu}>
        <button
          className={`${link} ${dropLink} ${drop && dropLinkActive}`}
          onClick={() => setDrop((prevDrop) => !prevDrop)}
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
              onClick={() => setDrop(false)}
            >
              <IoIosRocket /> <span>Rocket-Delivery</span>
            </NavLink>

            <div className={centerBlock}>
              <NavLink
                exact
                to='/'
                activeClassName={activeLink}
                className={link}
                onClick={() => setDrop(false)}
              >
                <AiOutlineHome /> <span>Home</span>
              </NavLink>

              <button className={link} onClick={handleOpenCart}>
                <RiShoppingCartLine /> <span>My Cart</span>
              </button>

              {styleDropDownMenu()}

              <NavLink
                exact
                to='/personalcab'
                onClick={() => setDrop(false)}
                className={link}
                activeClassName={activeLink}
              >
                <FiUser /> <span>My Cabinet</span>
              </NavLink>
            </div>

            <button onClick={handlerSignOut} className={link}>
              <FaSignOutAlt /> <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className={navbar}>
            <NavLink
              exact
              to='/'
              className={logoLink}
              onClick={() => setDrop(false)}
            >
              <IoIosRocket /> <span>Rocket-Delivery</span>
            </NavLink>

            <div className={centerBlock}>
              <NavLink
                exact
                to='/'
                activeClassName={activeLink}
                className={link}
                onClick={() => setDrop(false)}
              >
                <AiOutlineHome /> <span>Home</span>
              </NavLink>
              <button className={link} onClick={handleOpenCart}>
                <RiShoppingCartLine /> <span>My Cart</span>
              </button>
              {styleDropDownMenu()}
              <NavLink
                exact
                to='/create'
                className={link}
                onClick={() => setDrop(false)}
                activeClassName={activeLink}
              >
                <FiPlus /> <span>Create</span>
              </NavLink>
              <NavLink
                exact
                to='/users'
                onClick={() => setDrop(false)}
                className={link}
                activeClassName={activeLink}
              >
                <FiUsers /> <span>Users</span>
              </NavLink>
              <NavLink
                exact
                to='/personalcab'
                onClick={() => setDrop(false)}
                className={link}
                activeClassName={activeLink}
              >
                <FiUser /> <span>My Cabinet</span>
              </NavLink>
            </div>

            <button onClick={handlerSignOut} className={link}>
              <FaSignOutAlt /> <span>Sign Out</span>
            </button>
          </div>
        )
      ) : (
        <div className={navbar}>
          <NavLink
            exact
            to='/'
            className={logoLink}
            onClick={() => setDrop(false)}
          >
            <IoIosRocket /> <span>Rocket-Delivery</span>
          </NavLink>

          <div className={centerBlock}>
            <NavLink
              exact
              to='/'
              activeClassName={activeLink}
              className={link}
              onClick={() => setDrop(false)}
            >
              <AiOutlineHome /> <span>Home</span>
            </NavLink>

            <button className={link} onClick={handleOpenCart}>
              <RiShoppingCartLine /> <span>My Cart</span>
            </button>

            {styleDropDownMenu()}
          </div>

          <div className={authBlock}>
            <NavLink
              exact
              to='/auth/login'
              className={link}
              onClick={() => setDrop(false)}
              activeClassName={activeLink}
            >
              <FaSignInAlt /> <span>Sign In</span>
            </NavLink>
            <NavLink
              exact
              to='/auth/register'
              className={link}
              onClick={() => setDrop(false)}
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

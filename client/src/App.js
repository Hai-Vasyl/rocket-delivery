import React, { useContext, useState, useEffect } from "react"
import style from "./styles/App.module.css"
import { Context } from "./context/Context"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom"
import axios from "axios"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { RiShoppingCartLine } from "react-icons/ri"

import Navbar from "./components/Navbar"
import MainPage from "./pages/MainPage"
import CategoriesPage from "./pages/CategoriesPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import FoodsPage from "./pages/FoodsPage"
import FoodPage from "./pages/FoodPage"
import PersonalCabPage from "./pages/PersonalCabPage"
import CreateFoodPage from "./pages/CreateFoodPage"
import UsersPage from "./pages/UsersPage.js"
import EditFoodPage from "./pages/EditFoodPage"
import PartnersPage from "./pages/PartnersPage"
import PartnerPage from "./pages/PartnerPage"
import Cart from "./components/Cart"

function App() {
  const {
    wrapper,
    background,
    backgroundOn,
    popup,
    linkPersonalCab,
    linkContinue,
    containerCart,
    title,
    linkContainer,
    popupActive,
  } = style
  const [ready, setReady] = useState(false)
  const {
    token,
    setToken,
    drop,
    setDrop,
    setOrders,
    popupCart,
    setPopupCart,
  } = useContext(Context)

  useEffect(() => {
    const auth = localStorage.getItem("Auth")
    if (!!auth) {
      setToken(JSON.parse(auth))

      const fetch = async () => {
        try {
          const res = await axios.get("/api/orders/all", {
            headers: {
              Authorization: `Basic ${JSON.parse(auth).token}`,
            },
          })

          setOrders(res.data)
        } catch (error) {}
      }

      fetch()
      setReady(true)
    } else {
      const orders = localStorage.getItem("UserOrders")
      if (!!orders) {
        setOrders(JSON.parse(orders))
      }
      setReady(true)
    }
  }, [setToken, setOrders])

  if (!ready) {
    return <div>LOADING...</div>
  }

  return (
    <Router>
      <div className={wrapper}>
        <Navbar />
        <div
          className={`${background} ${drop && backgroundOn}`}
          onClick={() => setDrop(false)}
        ></div>

        <div>
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
              <button
                className={linkContinue}
                onClick={() => setPopupCart(false)}
              >
                <AiOutlineLeft /> <span>Continue Shoping</span>
              </button>
              <Link
                className={linkPersonalCab}
                to='/personalcab'
                onClick={() => setPopupCart(false)}
              >
                <span>Personal Cabinet</span> <AiOutlineRight />
              </Link>
            </div>
          </div>
        </div>

        {!!token.token ? (
          token.typeUser === "User" ? (
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/categories' component={CategoriesPage} />
              <Route exact path='/partners' component={PartnersPage} />
              <Route path='/personalcab' component={PersonalCabPage} />

              <Route path='/partners/:partnerid' component={PartnerPage} />
              <Route path='/categories/:foodcategory' component={FoodsPage} />
              <Route path='/details/:foodid' component={FoodPage} />

              <Redirect to='/' />
            </Switch>
          ) : (
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/categories' component={CategoriesPage} />
              <Route exact path='/partners' component={PartnersPage} />
              <Route path='/personalcab' component={PersonalCabPage} />
              <Route path='/create' component={CreateFoodPage} />
              <Route path='/users' component={UsersPage} />

              <Route path='/partners/:partnerid' component={PartnerPage} />
              <Route path='/categories/:foodcategory' component={FoodsPage} />
              <Route path='/edit/:foodid' component={EditFoodPage} />
              <Route path='/details/:foodid' component={FoodPage} />

              <Redirect exact to='/' />
            </Switch>
          )
        ) : (
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/categories' component={CategoriesPage} />
            <Route exact path='/partners' component={PartnersPage} />

            <Route path='/categories/:foodcategory' component={FoodsPage} />
            <Route path='/partners/:partnerid' component={PartnerPage} />
            <Route path='/details/:foodid' component={FoodPage} />

            <Route path='/auth/register' component={RegisterPage} />
            <Route path='/auth/login' component={LoginPage} />

            <Redirect exact to='/' />
          </Switch>
        )}
      </div>
    </Router>
  )
}

export default App

import React, { useContext, useState, useEffect } from "react"
import style from "./styles/App.module.css"
import { Context } from "./context/Context"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

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

function App() {
  const { wrapper, background, backgroundOn } = style
  const [ready, setReady] = useState(false)
  const { token, setToken, drop, setDrop } = useContext(Context)

  useEffect(() => {
    const auth = localStorage.getItem("Auth")
    if (!!auth) {
      setToken(JSON.parse(auth))
    }
    setReady(true)
  }, [setToken])

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
        {!!token.token ? (
          token.typeUser === "User" ? (
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/categories' component={CategoriesPage} />
              <Route exact path='/partners' component={PartnersPage} />
              <Route path='/personalcab' component={PersonalCabPage} />

              <Route path='/partners/:partnerid' component={PartnerPage} />
              <Route path='/categories/:foodcategory' component={FoodsPage} />
              <Route path='/:foodid' component={FoodPage} />

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
              <Route path='/:foodid' component={FoodPage} />

              <Redirect to='/' />
            </Switch>
          )
        ) : (
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/categories' component={CategoriesPage} />
            <Route exact path='/partners' component={PartnersPage} />
            <Route path='/auth/register' component={RegisterPage} />
            <Route path='/auth/login' component={LoginPage} />

            <Route path='/categories/:foodcategory' component={FoodsPage} />
            <Route path='/partners/:partnerid' component={PartnerPage} />
            <Route path='/:foodid' component={FoodPage} />

            <Redirect to='/' />
          </Switch>
        )}
      </div>
    </Router>
  )
}

export default App

import React from "react"
import MainPage from "../pages/MainPage"
import CategoriesPage from "../pages/CategoriesPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import FoodsPage from "../pages/FoodsPage"
import FoodPage from "../pages/FoodPage"
import PersonalCabPage from "../pages/PersonalCabPage"
import CreateFoodPage from "../pages/CreateFoodPage"
import UsersPage from "../pages/UsersPage.js"
import EditFoodPage from "../pages/EditFoodPage"
import PartnersPage from "../pages/PartnersPage"
import PartnerPage from "../pages/PartnerPage"
import { Route, Switch, Redirect } from "react-router-dom"

function AuthUser({ token }) {
  return !token.token ? (
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
  ) : token.typeUser === "User" ? (
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
}

export default AuthUser

import React from "react"
import mainStyle from "../styles/MainStyles.module.css"
import { Link } from "react-router-dom"
import style from "../styles/CategoriesPage.module.css"
import imgPizza from "../imgs/pizza.jpg"
import imgSoups from "../imgs/soups.jpg"
import imgMain_dishes from "../imgs/main_dishes.jpg"
import imgSushi from "../imgs/sushi.jpg"
import imgSalads from "../imgs/salads.jpg"
import imgBurgers from "../imgs/burgers.jpg"

function CategoriesPage() {
  const { wrapper, mainTitle } = mainStyle
  const { wrapperCategories, linkCategory, title } = style

  return (
    <div className={wrapper}>
      <h2 className={mainTitle}>All Categories</h2>
      <div className={wrapperCategories}>
        <Link to='/categories/pizza' className={linkCategory}>
          <img src={imgPizza} alt='category_img' />
          <span className={title}>Pizza</span>
        </Link>
        <Link to='/categories/soups' className={linkCategory}>
          <img src={imgSoups} alt='category_img' />
          <span className={title}>Soups</span>
        </Link>
        <Link to='/categories/main_dishes' className={linkCategory}>
          <img src={imgMain_dishes} alt='category_img' />
          <span className={title}>Main</span>
        </Link>
        <Link to='/categories/burgers' className={linkCategory}>
          <img src={imgBurgers} alt='category_img' />
          <span className={title}>Burgers</span>
        </Link>
        <Link to='/categories/sushi' className={linkCategory}>
          <img src={imgSushi} alt='category_img' />
          <span className={title}>Sushi</span>
        </Link>
        <Link to='/categories/salads' className={linkCategory}>
          <img src={imgSalads} alt='category_img' />
          <span className={title}>Salads</span>
        </Link>
      </div>
    </div>
  )
}

export default CategoriesPage

import React from "react"
import style from "../styles/Food.module.css"
import { Link } from "react-router-dom"

function Food({ food }) {
  const { wrapper, foodPrice, wrapperImg, foodName, category } = style
  return (
    <div className={wrapper}>
      <Link to={`/${food._id}`}>
        <div className={wrapperImg}>
          <img src={food.img} alt='imgFood' />
          <span className={foodPrice}>
            {food.price} <span>&#8372;</span>{" "}
          </span>
        </div>
        <div className={foodName}>{food.name}</div>
      </Link>
      <Link to={`/categories/${food.category}`} className={category}>
        {food.institution}
      </Link>
    </div>
  )
}

export default Food

import React from "react"
import style from "../styles/ContainerPopularFoods.module.css"
import { Link } from "react-router-dom"

function ContainerPopularFoods({ items }) {
  const {
    mainContainer,
    boxFood,
    img,
    title,
    foodName,
    foodInstitution,
  } = style
  const itemsJSX = items.map((item) => {
    return (
      <div className={boxFood} key={item._id}>
        <div className={img}>
          <Link to={`/details/${item._id}`} title={item.name}>
            <img src={item.img} alt='imageFood' />
          </Link>
        </div>
        <div className={title}>
          <Link
            className={foodInstitution}
            to={`/details/${item._id}`}
            title={item.name}
          >
            <span className={foodName}>{item.name}</span>
          </Link>
          <Link
            className={foodInstitution}
            to={`/partners/${item.institution}`}
          >
            <span>{item.institution}</span>
          </Link>
        </div>
      </div>
    )
  })
  return <div className={mainContainer}>{itemsJSX}</div>
}

export default ContainerPopularFoods

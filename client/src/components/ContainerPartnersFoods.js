import React from "react"
import style from "../styles/ContainerPopularFoods.module.css"
import { Link } from "react-router-dom"

function ContainerPartnersFoods({ items }) {
  const {
    mainContainer,
    boxFood,
    img,
    title,
    foodName,
    name,
    foodInstitution,
    partner,
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
            className={foodName}
            to={`/details/${item._id}`}
            title={item.name}
          >
            <span className={name}>{item.name}</span>
          </Link>
          <Link className={foodInstitution} to={`/categories/${item.category}`}>
            <span className={partner}>partner: </span>{" "}
            <span>{item.category}</span>
          </Link>
        </div>
      </div>
    )
  })
  return <div className={mainContainer}>{itemsJSX}</div>
}

export default ContainerPartnersFoods

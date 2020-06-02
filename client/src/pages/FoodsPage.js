import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import style from "../styles/FoodsPage.module.css"
import axios from "axios"
import Food from "../components/Food"

function FoodsPage(props) {
  const { wrapper, mainTitle } = mainStyle
  const { container } = style
  const [data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `/api/foods/${props.match.params.foodcategory}`
        )
        setData(res.data)
      } catch (error) {}
    }

    fetch()
  }, [props.match.params.foodcategory])

  const foods = data.map((food) => {
    return <Food key={food._id} food={food} />
  })

  return (
    <div className={wrapper}>
      <h2 className={mainTitle}>{props.match.params.foodcategory}</h2>
      <div className={container}>{foods}</div>
    </div>
  )
}

export default FoodsPage

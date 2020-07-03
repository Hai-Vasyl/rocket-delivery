import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import Food from "../components/Food"
import LoaderData from "../components/LoaderData"
import { useHTTP } from "../hooks/useHTTP"

function FoodsPage(props) {
  const { wrapper, mainTitle, container } = mainStyle
  const { load, fetchData } = useHTTP()
  const { foodcategory } = props.match.params
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData("get", `/api/foods/${foodcategory}`, null, setData)
  }, [foodcategory, fetchData])

  const foods = data.map((food) => {
    return <Food key={food._id} food={food} />
  })

  if (!load) {
    return (
      <div className={wrapper}>
        <LoaderData />
      </div>
    )
  }
  return (
    <div className={wrapper}>
      <h2 className={mainTitle}>{foodcategory}</h2>
      <div className={container}>{foods}</div>
    </div>
  )
}

export default FoodsPage

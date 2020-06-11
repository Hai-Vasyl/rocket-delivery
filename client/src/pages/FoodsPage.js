import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import axios from "axios"
import Food from "../components/Food"
import LoaderData from "../components/LoaderData"

function FoodsPage(props) {
  const { wrapper, mainTitle, container } = mainStyle
  const { foodcategory } = props.match.params
  const [data, setData] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/foods/${foodcategory}`)
        setData(res.data)
      } catch (error) {}
    }

    fetch()
    setTimeout(() => setLoad(true), 1000)
  }, [foodcategory])

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

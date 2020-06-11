import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import axios from "axios"
import FoodPartner from "../components/FoodPartner"
import LoaderData from "../components/LoaderData"

function PartnerPage(props) {
  const { wrapper, mainTitle, container } = mainStyle
  const { partnerid } = props.match.params
  const [data, setData] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/foods/partner/${partnerid}`)
        setData(res.data)
      } catch (error) {}
    }

    fetch()
    setTimeout(() => setLoad(true), 1000)
  }, [partnerid])

  const foods = data.map((food) => {
    return <FoodPartner key={food._id} food={food} />
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
      <h2 className={mainTitle}>{partnerid}</h2>
      <div className={container}>{foods}</div>
    </div>
  )
}

export default PartnerPage

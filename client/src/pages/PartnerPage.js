import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import axios from "axios"
import FoodPartner from "../components/FoodPartner"

function PartnerPage(props) {
  const { wrapper, mainTitle, container } = mainStyle
  const { partnerid } = props.match.params
  const [data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/foods/partner/${partnerid}`)
        setData(res.data)
      } catch (error) {}
    }

    fetch()
  }, [partnerid])

  const foods = data.map((food) => {
    return <FoodPartner key={food._id} food={food} />
  })

  return (
    <div className={wrapper}>
      <h2 className={mainTitle}>{partnerid}</h2>
      <div className={container}>{foods}</div>
    </div>
  )
}

export default PartnerPage

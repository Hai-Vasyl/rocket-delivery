import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import FoodPartner from "../components/FoodPartner"
import { useHTTP } from "../hooks/useHTTP"
import LoaderData from "../components/LoaderData"

function PartnerPage(props) {
  const { wrapper, mainTitle, container } = mainStyle
  const { load, fetchData } = useHTTP()
  const { partnerid } = props.match.params
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData("get", `/api/foods/partner/${partnerid}`, null, setData)
  }, [partnerid, fetchData])

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

import React, { useState, useEffect } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import axios from "axios"
import ContainerPartnersFoods from "../components/ContainerPartnersFoods.js"
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import LoaderData from "../components/LoaderData"

function Partners() {
  const {
    wrapper,
    mainTitle,
    titlePopular,
    titleCategory,
    linkCategory,
    wrapperContainer,
    invertColorTitle,
    invertColorTitleCategory,
    invertWrapperContainer,
  } = mainStyle
  const [data, setData] = useState({
    Regina: [],
    Embroidered_Shirt: [],
    Pulse: [],
    Dari_Mora: [],
    Brown: [],
  })
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/foods/briefpartners/all")
        setData(res.data)
      } catch (error) {}
    }

    fetch()
    setTimeout(() => setLoad(true), 1000)
  }, [])

  if (!load) {
    return (
      <div className={wrapper}>
        <LoaderData />
      </div>
    )
  }
  return (
    <div className={wrapper}>
      <h2 className={`${mainTitle} ${invertColorTitle}`}>Our Partners</h2>

      <div className={`${wrapperContainer} ${invertWrapperContainer}`}>
        <div className={titlePopular}>
          <span className={`${titleCategory} ${invertColorTitleCategory}`}>
            Regina
          </span>
          <Link className={linkCategory} to='/partners/Regina'>
            <span>More</span> <FiArrowRight />
          </Link>
        </div>
        <ContainerPartnersFoods items={data.Regina} />
      </div>
      <div className={`${wrapperContainer} ${invertWrapperContainer}`}>
        <div className={titlePopular}>
          <span className={`${titleCategory} ${invertColorTitleCategory}`}>
            Dari Mora
          </span>
          <Link className={linkCategory} to='/partners/Dari_Mora'>
            <span>More</span> <FiArrowRight />
          </Link>
        </div>
        <ContainerPartnersFoods items={data.Dari_Mora} />
      </div>
      <div className={`${wrapperContainer} ${invertWrapperContainer}`}>
        <div className={titlePopular}>
          <span className={`${titleCategory} ${invertColorTitleCategory}`}>
            Embroidered Shirt
          </span>
          <Link className={linkCategory} to='/categories/Embroidered_Shirt'>
            <span>More</span> <FiArrowRight />
          </Link>
        </div>
        <ContainerPartnersFoods items={data.Embroidered_Shirt} />
      </div>
      <div className={`${wrapperContainer} ${invertWrapperContainer}`}>
        <div className={titlePopular}>
          <span className={`${titleCategory} ${invertColorTitleCategory}`}>
            Pulse
          </span>
          <Link className={linkCategory} to='/partners/Pulse'>
            <span>More</span> <FiArrowRight />
          </Link>
        </div>
        <ContainerPartnersFoods items={data.Pulse} />
      </div>
      <div className={`${wrapperContainer} ${invertWrapperContainer}`}>
        <div className={titlePopular}>
          <span className={`${titleCategory} ${invertColorTitleCategory}`}>
            Brown
          </span>
          <Link className={linkCategory} to='/partners/Brown'>
            <span>More</span> <FiArrowRight />
          </Link>
        </div>
        <ContainerPartnersFoods items={data.Brown} />
      </div>
    </div>
  )
}

export default Partners

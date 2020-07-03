import React, { useState, useEffect } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import ContainerPartnersFoods from "../components/ContainerPartnersFoods.js"
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import { useHTTP } from "../hooks/useHTTP"
import LoaderData from "../components/LoaderData"

function Partners() {
  const {
    wrapper,
    titleMainPopular,
    titlePopular,
    titleCategory,
    linkCategory,
    wrapperContainer,
    invertColorTitle,
    invertColorTitleCategory,
    invertWrapperContainer,
  } = mainStyle

  const { load, fetchData } = useHTTP()
  const [data, setData] = useState({
    Regina: [],
    Embroidered_Shirt: [],
    Pulse: [],
    Dari_Mora: [],
    Brown: [],
  })

  useEffect(() => {
    fetchData("get", "/api/foods/briefpartners/all", null, setData)
  }, [fetchData])

  if (!load) {
    return (
      <div className={wrapper}>
        <LoaderData />
      </div>
    )
  }
  return (
    <div className={wrapper}>
      <h2 className={`${titleMainPopular} ${invertColorTitle}`}>
        Our Partners
      </h2>

      <div className={`${wrapperContainer} ${invertWrapperContainer}`}>
        <div className={titlePopular}>
          <span
            className={`${titleCategory} ${invertColorTitleCategory}`}
            title='Regina'
          >
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
          <span
            className={`${titleCategory} ${invertColorTitleCategory}`}
            title='Dari Mora'
          >
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
          <span
            className={`${titleCategory} ${invertColorTitleCategory}`}
            title='Embroidered Shirt'
          >
            Emb Shirt
          </span>
          <Link className={linkCategory} to='/categories/Embroidered_Shirt'>
            <span>More</span> <FiArrowRight />
          </Link>
        </div>
        <ContainerPartnersFoods items={data.Embroidered_Shirt} />
      </div>
      <div className={`${wrapperContainer} ${invertWrapperContainer}`}>
        <div className={titlePopular}>
          <span
            className={`${titleCategory} ${invertColorTitleCategory}`}
            title='Pulse'
          >
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
          <span
            className={`${titleCategory} ${invertColorTitleCategory}`}
            title='Brown'
          >
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

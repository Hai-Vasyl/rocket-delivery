import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import style from "../styles/MainPage.module.css"
import axios from "axios"
import ContainerPopularFoods from "../components/ContainerPopularFoods"
import { IoIosRocket } from "react-icons/io"
import imgMain from "../imgs/mainImage.svg"
import { Link } from "react-router-dom"
import { FaAddressCard } from "react-icons/fa"
import {
  AiOutlineAppstore,
  AiOutlineUsergroupAdd,
  AiOutlineLink,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai"
import { FiArrowRight } from "react-icons/fi"
import imgCircle from "../imgs/circle1.svg"
import imgCircle2 from "../imgs/background-circle3.svg"
import imgCircle3 from "../imgs/background-circle2.svg"

function MainPage() {
  const {
    titlePopular,
    titleCategory,
    linkCategory,
    wrapperMain,
    wrapperContainer,
    titleMainPopular,
    wrapper_main,
  } = mainStyle
  // const [load, setLoad] = useState(false)
  const {
    imgHeader,
    title,
    header,
    paragraphMain,
    wrapperHeader,
    textSideBar,
    blockLinks,
    link,
    linkCategories,
    imgTitle,
    img,
    quickLinkBlock,
    quickLink,
    imgBackgroundCircle,
    contactsBlock,
    circle1,
    circle2,
    circle3,
  } = style
  const [data, setData] = useState({
    pizza: [],
    soups: [],
    sushi: [],
    salads: [],
    main_dishes: [],
    burgers: [],
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/foods/briefcategory/all")
        setData(res.data)
      } catch (error) {}
    }

    fetch()
    // setTimeout(() => setLoad(true), 1000)
  }, [])

  // if (!load) {
  //   return <div className={wrapperMain}>LOADER....</div>
  // }

  return (
    <div className={wrapperMain}>
      <div className={header}>
        <div className={wrapperHeader}>
          <img
            className={`${imgBackgroundCircle} ${circle1}`}
            src={imgCircle}
            alt='imgCircle'
          />
          <img
            className={`${imgBackgroundCircle} ${circle3}`}
            src={imgCircle3}
            alt='imgCircle'
          />
          <img
            className={`${imgBackgroundCircle} ${circle2}`}
            src={imgCircle2}
            alt='imgCircle'
          />
          <div className={textSideBar}>
            <h1 className={title}>
              <IoIosRocket /> <span>Rocket-Delivery</span>
            </h1>
            <p className={paragraphMain}>
              Our goal is to help you save time, do more and not be distracted
              from important things. You save on office costs, search costs. At
              the same time you get a competitive advantage. We offer fast
              delivery to any point of your city, in the shortest possible time.
              We are trusted by the best restaurants in the city. Delivery is
              faster than the dishes have time to cool. In case you are not
              satisfied with the delivery we will refund the money.
            </p>
            <div className={blockLinks}>
              <Link className={`${link} ${linkCategories}`} to='/categories'>
                <AiOutlineAppstore /> <span>All Categories</span>
              </Link>
              <Link className={link} to='/partners'>
                <AiOutlineUsergroupAdd /> <span>Our Partners</span>
              </Link>
            </div>
          </div>
          <div className={imgHeader}>
            <div className={imgTitle}>
              <h2>
                <AiOutlineLink /> <span>Quick Links</span>
              </h2>
            </div>
            <div className={quickLinkBlock}>
              <Link className={quickLink} to='/categories/pizza'>
                Pizza
              </Link>
              <Link className={quickLink} to='/categories/salads'>
                Salads
              </Link>
              <Link className={quickLink} to='/categories/sushi'>
                Sushi
              </Link>
              <Link className={quickLink} to='/categories/soups'>
                Soups
              </Link>
              <Link className={quickLink} to='/categories/burgers'>
                Burgers
              </Link>
              <Link className={quickLink} to='/categories/main_dishes'>
                Main Dishes
              </Link>
            </div>
            <div className={img}>
              <img src={imgMain} alt='mainImg' />
            </div>
            <div className={contactsBlock}>
              <span>
                <AiOutlinePhone /> <span>Phone:</span> +951-235-8893
              </span>

              <span>
                <AiOutlineMail /> <span>Email:</span> rocket-delivary@gmail.com
              </span>

              <span>
                <FaAddressCard /> <span>Address:</span> 3309 John Avenue,
                LINCOLN, Alabama, USA
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={wrapper_main}>
        <h2 className={titleMainPopular}>Our Popular Dishes</h2>

        <div className={wrapperContainer}>
          <div className={titlePopular}>
            <span className={titleCategory}>Pizza</span>
            <Link className={linkCategory} to='/categories/pizza'>
              <span>More</span> <FiArrowRight />
            </Link>
          </div>
          <ContainerPopularFoods items={data.pizza} />
        </div>
        <div className={wrapperContainer}>
          <div className={titlePopular}>
            <span className={titleCategory}>Sushi</span>
            <Link className={linkCategory} to='/categories/sushi'>
              <span>More</span> <FiArrowRight />
            </Link>
          </div>
          <ContainerPopularFoods items={data.sushi} />
        </div>
        <div className={wrapperContainer}>
          <div className={titlePopular}>
            <span className={titleCategory}>Main Dishes</span>
            <Link className={linkCategory} to='/categories/main_dishes'>
              <span>More</span> <FiArrowRight />
            </Link>
          </div>
          <ContainerPopularFoods items={data.main_dishes} />
        </div>
        <div className={wrapperContainer}>
          <div className={titlePopular}>
            <span className={titleCategory}>Salads</span>
            <Link className={linkCategory} to='/categories/salads'>
              <span>More</span> <FiArrowRight />
            </Link>
          </div>
          <ContainerPopularFoods items={data.salads} />
        </div>
        <div className={wrapperContainer}>
          <div className={titlePopular}>
            <span className={titleCategory}>Soups</span>
            <Link className={linkCategory} to='/categories/soups'>
              <span>More</span> <FiArrowRight />
            </Link>
          </div>
          <ContainerPopularFoods items={data.soups} />
        </div>
        <div className={wrapperContainer}>
          <div className={titlePopular}>
            <span className={titleCategory}>Burgers</span>
            <Link className={linkCategory} to='/categories/burgers'>
              <span>More</span> <FiArrowRight />
            </Link>
          </div>
          <ContainerPopularFoods items={data.burgers} />
        </div>
      </div>
    </div>
  )
}

export default MainPage

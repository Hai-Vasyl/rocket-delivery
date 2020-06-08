import React from "react"
import mainStyle from "../styles/MainStyles.module.css"
import Cart from "../components/Cart"

function PersonalCab() {
  const { wrapper } = mainStyle
  return (
    <div className={wrapper}>
      <div>
        <Cart isCabinet={true} />
      </div>
    </div>
  )
}

export default PersonalCab

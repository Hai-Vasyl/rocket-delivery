import React from "react"
import style from "../styles/LoaderData.module.css"

export default function LoaderData() {
  const { ldsEllipsis } = style

  return (
    <div className={ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

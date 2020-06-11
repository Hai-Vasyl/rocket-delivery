import React from "react"
import style from "../styles/Loader.module.css"

export default function Loader() {
  const { wrapper, loader } = style
  return (
    <div className={wrapper}>
      <div className={loader}></div>
      <div className={loader}></div>
      <div className={loader}></div>
      <div className={loader}></div>
    </div>
  )
}

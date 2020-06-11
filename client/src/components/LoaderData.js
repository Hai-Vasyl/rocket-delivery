import React from "react"
import style from "../styles/LoaderData.module.css"

export default function LoaderData() {
  const { loader, loader1, loader2 } = style

  return (
    <>
      <div className={`${loader} ${loader1}`}></div>
      <div className={`${loader} ${loader2}`}></div>
    </>
  )
}

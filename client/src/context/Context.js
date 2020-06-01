import React, { createContext, useState } from "react"

export const Context = createContext()

export const MainProvider = (props) => {
  const [token, setToken] = useState(false)
  const [drop, setDrop] = useState(false)

  return (
    <Context.Provider value={{ token, setToken, drop, setDrop }}>
      {props.children}
    </Context.Provider>
  )
}

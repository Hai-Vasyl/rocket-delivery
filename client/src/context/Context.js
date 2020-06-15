import React, { createContext, useState } from "react"

export const Context = createContext()

export const MainProvider = (props) => {
  const [token, setToken] = useState(false)
  const [drop, setDrop] = useState(false)
  const [orders, setOrders] = useState([])
  const [addedOrder, setAddedOrder] = useState("")
  const [popupCart, setPopupCart] = useState(false)

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        drop,
        setDrop,
        orders,
        setOrders,
        popupCart,
        setPopupCart,
        addedOrder,
        setAddedOrder,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

import React, { useContext, useEffect } from "react"
import { Context } from "../context/Context"
import Order from "../components/Order"
import { useHTTP } from "../hooks/useHTTP"
import { useOrderAmountReducer } from "../hooks/useOrderAmountReducer"

function Cart({ isCabinet }) {
  const { orders, setOrders, token, setPopupCart } = useContext(Context)
  const { fetchData } = useHTTP()
  const { reduceOrderAmount } = useOrderAmountReducer()

  useEffect(() => {
    if (token.token) fetchData("get", "/api/orders/all", null, setOrders)
  }, [token, fetchData, setOrders])

  const handleReduceAmount = (orderid, typeReducer) => {
    reduceOrderAmount(true, typeReducer, orderid)

    if (token.token) {
      fetchData(
        "patch",
        `/api/orders/cart/amount/${typeReducer ? "add" : "remove"}/${orderid}`
      )
    }
  }

  const handleDelete = async (orderid) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order._id !== orderid)
    )

    if (token.token) {
      await fetchData("delete", `/api/orders/cart/delete/${orderid}`)
    }
  }

  const handleBuy = (orderid) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order._id === orderid) {
          order.status = false
        }
        return order
      })
    )

    if (token.token) {
      fetchData("patch", `/api/orders/cart/buy/${orderid}`)
    }
  }

  const ordersJSX = orders.map((order, index) => {
    return (
      <Order
        key={order._id}
        order={order}
        token={token}
        isCabinet={isCabinet}
        index={index + 1}
        setPopupCart={setPopupCart}
        handleReduceAmount={handleReduceAmount}
        handleDelete={handleDelete}
        handleBuy={handleBuy}
      />
    )
  })

  return <div>{ordersJSX}</div>
}

export default Cart

import React, { useContext } from "react"
import { Context } from "../context/Context"
import Order from "../components/Order"
import axios from "axios"

function Cart({ isCabinet }) {
  const { orders, setOrders, token, setPopupCart } = useContext(Context)

  const handleRemove = (orderid) => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          const res = await axios.patch(
            `/api/orders/cart/amount/remove/${orderid}`,
            null,
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )

          if (res.data.statusError) {
            return
          }
          const { generalPrice, amount } = res.data

          setOrders((prevOrders) =>
            prevOrders.map((order) => {
              if (order._id === orderid) {
                order.amount = amount
                order.generalPrice = generalPrice
              }
              return order
            })
          )
        } catch (error) {}
      }

      fetch()
    } else {
    }
  }

  const handleAdd = (orderid) => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          const res = await axios.patch(
            `/api/orders/cart/amount/add/${orderid}`,
            null,
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )
          const { generalPrice, amount } = res.data

          setOrders((prevOrders) =>
            prevOrders.map((order) => {
              if (order._id === orderid) {
                order.amount = amount
                order.generalPrice = generalPrice
              }
              return order
            })
          )
        } catch (error) {}
      }

      fetch()
    } else {
    }
  }

  const handleDelete = (orderid) => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          await axios.delete(`/api/orders/cart/delete/${orderid}`, {
            headers: {
              Authorization: `Basic ${token.token}`,
            },
          })

          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderid)
          )
        } catch (error) {}
      }

      fetch()
    } else {
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
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleDelete={handleDelete}
      />
    )
  })

  return <div>{ordersJSX}</div>
}

export default Cart

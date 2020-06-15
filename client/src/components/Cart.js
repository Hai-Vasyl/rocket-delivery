import React, { useContext } from "react"
import { Context } from "../context/Context"
import Order from "../components/Order"
import axios from "axios"

function Cart({ isCabinet }) {
  const { orders, setOrders, token, setPopupCart, setAddedOrder } = useContext(
    Context
  )

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
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderid && order.amount !== 1) {
            const orderAmount = order.amount - 1
            order.generalPrice =
              (order.generalPrice / order.amount) * orderAmount
            order.amount = orderAmount
          }
          return order
        })
      )
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
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderid) {
            const orderAmount = order.amount + 1
            order.generalPrice =
              (order.generalPrice / order.amount) * orderAmount
            order.amount = orderAmount
          }
          return order
        })
      )
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
        } catch (error) {}
      }

      fetch()
    }
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order._id !== orderid)
    )
    setAddedOrder(false)
  }

  const handleBuy = (orderid) => {
    if (!!token.token) {
      const fetch = async () => {
        try {
          const res = await axios.patch(
            `/api/orders/cart/buy/${orderid}`,
            null,
            {
              headers: {
                Authorization: `Basic ${token.token}`,
              },
            }
          )

          if (res.statusError) {
            return
          }

          setOrders((prevOrders) =>
            prevOrders.map((order) => {
              if (order._id === orderid) {
                order.status = false
              }
              return order
            })
          )
        } catch (error) {}
      }

      fetch()
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderid) {
            order.status = false
          }
          return order
        })
      )
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
        handleBuy={handleBuy}
      />
    )
  })

  return <div>{ordersJSX}</div>
}

export default Cart

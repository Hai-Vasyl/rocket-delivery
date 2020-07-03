import { useContext } from "react"
import { Context } from "../context/Context"

export function useOrderAmountReducer() {
  const { orders, setOrders } = useContext(Context)

  const reduceOrderAmount = (isOrderId, typeReducer, id) => {
    setOrders(
      orders.map((order) => {
        const typeId = isOrderId ? order._id : order.foodProps._id
        if (typeId === id) {
          if (!typeReducer && order.amount === 1) {
            return order
          }
          const amountOrder = typeReducer ? order.amount + 1 : order.amount - 1
          order.generalPrice = (order.generalPrice / order.amount) * amountOrder
          order.amount = amountOrder
        }
        return order
      })
    )
  }

  return { reduceOrderAmount }
}

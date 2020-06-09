const { Router } = require("express")
const Order = require("../models/Order")
const auth = require("../middlewares/auth.middleware")
const Food = require("../models/Food")

const router = Router()

router.post("/create/:foodid", auth, async (req, res) => {
  try {
    const { price } = req.body
    const { foodid } = req.params
    const { userId } = req

    const newOrder = new Order({
      foodProps: foodid,
      owner: userId,
      date: new Date(),
      generalPrice: price,
    })

    const order = await newOrder.save()

    const findedOrder = await Order.findById(order._id)
      .populate({
        path: "foodProps",
        select: "category img institution name ",
      })
      .select("amount generalPrice status")

    res.status(201).json(findedOrder)
  } catch (error) {
    res.status(500).json(`Error creating order: ${error.message}`)
  }
})

router.patch("/amount/add/:foodid", auth, async (req, res) => {
  try {
    const { userId } = req
    const { foodid } = req.params

    const orderAmount = await Order.findOne({
      foodProps: foodid,
      owner: userId,
    }).select("amount")

    const foodPrice = await Food.findById(foodid).select("price")

    const amount = orderAmount.amount + 1
    const generalPrice = foodPrice.price * amount

    await Order.updateMany(
      { foodProps: foodid, owner: userId },
      { generalPrice, amount }
    )

    res.json({ generalPrice, amount })
  } catch (error) {
    res.status(500).json(`Error adding amount order: ${error.message}`)
  }
})

router.patch("/amount/remove/:foodid", auth, async (req, res) => {
  try {
    const { userId } = req
    const { foodid } = req.params

    const orderAmount = await Order.findOne({
      foodProps: foodid,
      owner: userId,
    }).select("amount")

    if (orderAmount.amount === 1) {
      return res.json({ statusError: true })
    }

    const foodPrice = await Food.findById(foodid).select("price")

    const amount = orderAmount.amount - 1
    const generalPrice = foodPrice.price * amount

    await Order.updateMany(
      { foodProps: foodid, owner: userId },
      { generalPrice, amount }
    )

    res.json({ generalPrice, amount })
  } catch (error) {
    res.status(500).json(`Error removing amount order: ${error.message}`)
  }
})

router.patch("/cart/buy/:orderid", auth, async (req, res) => {
  try {
    const { orderid } = req.params
    const order = await Order.findById(orderid).select("status")
    if (!order.status) {
      return res.json({ statusError: true })
    }

    await Order.updateOne({ _id: orderid }, { status: false })

    res.json("Order bought successfully!")
  } catch (error) {
    res.status(500).json(`Error removing amount order: ${error.message}`)
  }
})

router.patch("/cart/amount/add/:orderid", auth, async (req, res) => {
  try {
    const { orderid } = req.params

    const order = await Order.findById(orderid)
      .populate({ path: "foodProps", select: "price" })
      .select("amount")

    const amount = order.amount + 1
    const generalPrice = order.foodProps.price * amount

    await Order.updateOne({ _id: orderid }, { generalPrice, amount })

    res.json({ generalPrice, amount })
  } catch (error) {
    res.status(500).json(`Error adding amount order: ${error.message}`)
  }
})

router.patch("/cart/amount/remove/:orderid", auth, async (req, res) => {
  try {
    const { orderid } = req.params

    const order = await Order.findById(orderid)
      .populate({ path: "foodProps", select: "price" })
      .select("amount")

    if (order.amount === 1) {
      return res.json({ statusError: true })
    }

    const amount = order.amount - 1
    const generalPrice = order.foodProps.price * amount

    await Order.updateOne({ _id: orderid }, { generalPrice, amount })

    res.json({ generalPrice, amount })
  } catch (error) {
    res.status(500).json(`Error removing amount order: ${error.message}`)
  }
})

router.delete("/cart/delete/:orderid", auth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderid)

    res.json("Order deleted successfully!")
  } catch (error) {
    res.status(500).json(`Error deleting order: ${error.message}`)
  }
})

router.delete("/delete/:foodid", auth, async (req, res) => {
  try {
    const { foodid } = req.params
    const { userId } = req

    await Order.deleteMany({ foodProps: foodid, owner: userId })

    res.json("Order deleted successfully!")
  } catch (error) {
    res.status(500).json(`Error deleting order: ${error.message}`)
  }
})

router.get("/all", auth, async (req, res) => {
  try {
    const { userId } = req

    const orders = await Order.find({ owner: userId })
      .populate({
        path: "foodProps",
        select: "category img institution name ",
      })
      .select("amount generalPrice status")

    res.json(orders)
  } catch (error) {
    res.status(500).json(`Error getting all orders: ${error.message}`)
  }
})

router.get("/check/:foodid", auth, async (req, res) => {
  try {
    const { foodid } = req.params
    const { userId } = req

    const orders = await Order.find({ owner: userId, foodProps: foodid })

    if (orders.length > 0) {
      res.json(true)
      return
    }
    res.json(false)
  } catch (error) {
    res
      .status(500)
      .json(`Error getting response of checking order: ${error.message}`)
  }
})

module.exports = router

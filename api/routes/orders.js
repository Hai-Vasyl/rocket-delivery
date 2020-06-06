const { Router } = require("express")
const Order = require("../models/Order")
const auth = require("../middlewares/auth.middleware")

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

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json(`Error creating order: ${error.message}`)
  }
})

module.exports = router

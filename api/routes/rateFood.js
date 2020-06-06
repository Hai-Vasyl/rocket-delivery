const { Router } = require("express")
const auth = require("../middlewares/auth.middleware")
const RateFood = require("../models/RateFood")
const Food = require("../models/Food")

const router = Router()

// router.get("/getone/:foodid", auth, async (req, res) => {
//   try {
//     const { userId } = req
//     const { foodid } = req.params
//     const item = await RateFood.findOne({ owner: userId, food: foodid })

//     res.json(item)
//   } catch (error) {
//     res.status(500).json(`Error getting ratefood: ${error.message}`)
//   }
// })

router.post("/create/:foodid", auth, async (req, res) => {
  try {
    const { userId } = req
    const { foodid } = req.params
    let { status, rate } = req.body

    let response = {}

    let item = await RateFood.find({ owner: userId }).findOne({ food: foodid })
    let food = await Food.findById(foodid)

    if (item) {
      if (item.status === status) {
        await RateFood.findByIdAndDelete(item._id)

        await Food.findByIdAndUpdate(foodid, { $pull: { rateList: item._id } })

        // await food.save()

        if (status) {
          rate -= 1
          food.rate -= 1
          await food.save()
        } else {
          rate += 1
          food.rate += 1
          await food.save()
        }
        response.rate = rate
        response.status = "none"
      } else {
        item.status = status
        const saveFoodRate = await item.save()

        if (status) {
          rate += 2
          food.rate += 2
          await food.save()
        } else {
          rate -= 2
          food.rate -= 2
          await food.save()
        }

        response.rate = rate
        response.status = saveFoodRate.status
      }
    } else {
      const newRateFood = new RateFood({ owner: userId, food: foodid, status })
      const saveFoodRate = await newRateFood.save()

      food.rateList.push(saveFoodRate._id)
      await food.save()

      if (status) {
        rate += 1
        food.rate += 1
        await food.save()
      } else {
        rate -= 1
        food.rate -= 1
        await food.save()
      }

      response.rate = rate
      response.status = saveFoodRate.status
    }

    res.json(response)
  } catch (error) {
    res.status(500).json(`Error posting item: ${error.message}`)
  }
})

module.exports = router

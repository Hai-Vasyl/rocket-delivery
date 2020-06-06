const { Router } = require("express")
const auth = require("../middlewares/auth.middleware")
const RateAnswer = require("../models/RateAnswer")
const Answer = require("../models/Answer")

const router = Router()

router.post("/create/:answerid", auth, async (req, res) => {
  try {
    const { userId } = req
    const { answerid } = req.params
    let { status, rate } = req.body

    let response = {}

    let item = await RateAnswer.find({ owner: userId }).findOne({
      answer: answerid,
    })
    let answer = await Answer.findById(answerid)

    if (item) {
      if (item.status === status) {
        await RateAnswer.findByIdAndDelete(item._id)

        await Answer.findByIdAndUpdate(answerid, {
          $pull: { rateList: item._id },
        })

        if (status) {
          rate -= 1
          answer.rate -= 1
          await answer.save()
        } else {
          rate += 1
          answer.rate += 1
          await answer.save()
        }
        response.rate = rate
        response.status = "none"
      } else {
        item.status = status
        const saveAnswerRate = await item.save()

        if (status) {
          rate += 2
          answer.rate += 2
          await answer.save()
        } else {
          rate -= 2
          answer.rate -= 2
          await answer.save()
        }

        response.rate = rate
        response.status = saveAnswerRate.status
      }
    } else {
      const newRateAnswer = new RateAnswer({
        owner: userId,
        answer: answerid,
        status,
      })
      const saveAnswerRate = await newRateAnswer.save()

      answer.rateList.push(saveAnswerRate._id)
      await answer.save()

      if (status) {
        rate += 1
        answer.rate += 1
        await answer.save()
      } else {
        rate -= 1
        answer.rate -= 1
        await answer.save()
      }

      response.rate = rate
      response.status = saveAnswerRate.status
    }

    res.json(response)
  } catch (error) {
    res.status(500).json(`Error posting item: ${error.message}`)
  }
})

module.exports = router

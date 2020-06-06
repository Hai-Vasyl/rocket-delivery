const { Router } = require("express")
const auth = require("../middlewares/auth.middleware")
const RateComment = require("../models/RateComment")
const Comment = require("../models/Comment")

const router = Router()

router.post("/create/:commentid", auth, async (req, res) => {
  try {
    const { userId } = req
    const { commentid } = req.params
    let { status, rate } = req.body

    let response = {}

    let item = await RateComment.find({ owner: userId }).findOne({
      comment: commentid,
    })
    let comment = await Comment.findById(commentid)

    if (item) {
      if (item.status === status) {
        await RateComment.findByIdAndDelete(item._id)

        await Comment.findByIdAndUpdate(commentid, {
          $pull: { rateList: item._id },
        })

        if (status) {
          rate -= 1
          comment.rate -= 1
          await comment.save()
        } else {
          rate += 1
          comment.rate += 1
          await comment.save()
        }
        response.rate = rate
        response.status = "none"
      } else {
        item.status = status
        const saveCommentRate = await item.save()

        if (status) {
          rate += 2
          comment.rate += 2
          await comment.save()
        } else {
          rate -= 2
          comment.rate -= 2
          await comment.save()
        }

        response.rate = rate
        response.status = saveCommentRate.status
      }
    } else {
      const newRateComment = new RateComment({
        owner: userId,
        comment: commentid,
        status,
      })
      const saveCommentRate = await newRateComment.save()

      comment.rateList.push(saveCommentRate._id)
      await comment.save()

      if (status) {
        rate += 1
        comment.rate += 1
        await comment.save()
      } else {
        rate -= 1
        comment.rate -= 1
        await comment.save()
      }

      response.rate = rate
      response.status = saveCommentRate.status
    }

    res.json(response)
  } catch (error) {
    res.status(500).json(`Error posting item: ${error.message}`)
  }
})

module.exports = router

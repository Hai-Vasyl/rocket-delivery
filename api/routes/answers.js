const { Router } = require("express")
const Answer = require("../models/Answer")
const auth = require("../middlewares/auth.middleware")
const Comment = require("../models/Comment")

const router = Router()

router.post("/create/:commentid", auth, async (req, res) => {
  try {
    const { userId } = req
    const { content } = req.body
    const { commentid } = req.params

    const newAnswer = new Answer({
      owner: userId,
      comment: commentid,
      content,
      date: new Date(),
    })

    const answer = await newAnswer.save()

    const commentArr = await Comment.findById(commentid)

    commentArr.answerList.push(answer._id)

    await commentArr.save()

    res.status(201).json(answer)
  } catch (error) {
    res.status(500).json(`Error creating new answer: ${error.message}`)
  }
})

module.exports = router

const { Router } = require("express")
const Comment = require("../models/Comment")
const Food = require("../models/Food")
const auth = require("../middlewares/auth.middleware")

const router = Router()

router.post("/create/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req
    const { content } = req.body

    const comment = new Comment({
      owner: userId,
      food: id,
      date: new Date(),
      content,
    })

    const newComment = await comment.save()

    const foodId = await Food.findById(id)

    foodId.comments.push(newComment._id)

    await foodId.save()

    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json(`Error creating new comment: ${error.message}`)
  }
})

router.get("/list/auth/:foodid", auth, async (req, res) => {
  try {
    const { foodid } = req.params

    let comments = await Comment.find({ food: foodid })
      .populate({
        path: "owner",
        select: "typeUser ava username",
      })
      .populate({
        path: "answerList",
        options: { sort: { rate: -1 } },
        populate: [
          { path: "rateList", match: { owner: req.userId }, select: "status" },
          { path: "owner", select: "typeUser ava username" },
        ],
      })
      .populate({
        path: "rateList",
        match: { owner: req.userId },
        select: "status",
      })
      .sort({ rate: -1 })

    comments = comments.map((item) => {
      item._doc = {
        ...item._doc,
        rateStatus:
          item._doc.rateList[0] === undefined
            ? "none"
            : item._doc.rateList[0].status,
        answerList: item._doc.answerList.map((elem) => {
          elem._doc = {
            ...elem._doc,
            rateStatus:
              elem._doc.rateList[0] === undefined
                ? "none"
                : elem._doc.rateList[0].status,
          }

          return elem
        }),
      }

      return item
    })

    res.json(comments)
  } catch (error) {
    res.status(500).json(`Error getting comments: ${error.message}`)
  }
})

router.get("/list/:foodid", async (req, res) => {
  try {
    const { foodid } = req.params
    const comment = await Comment.find({ food: foodid })
      .populate({
        path: "owner",
        select: "typeUser ava username",
      })
      .populate({
        path: "answerList",
        select: "rate owner content date",
        options: { sort: { rate: -1 } },
        populate: { path: "owner", select: "typeUser ava username" },
      })
      .select("answerList rate owner date content")
      .sort({ rate: -1 })

    res.json(comment)
  } catch (error) {
    res.status(500).json(`Error getting comments: ${error.message}`)
  }
})

module.exports = router

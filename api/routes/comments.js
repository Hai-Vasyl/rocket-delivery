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

router.get("/list/:productId", async (req, res) => {
  try {
    const elems = await Comment.find({ food: req.params.productId }).populate(
      "owner"
    )

    res.json(elems)
  } catch (error) {
    res.status(500).json(`Error getting comments: ${error.message}`)
  }
})

module.exports = router

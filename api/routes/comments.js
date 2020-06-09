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
    // const comment = await Comment.find({ food: foodid }).populate({
    //   path: "owner answerList rateList",
    //   // match: { owner: req.userId },
    //   // select: "typeUser ava username rate owner content date",
    //   populate: {
    //     path: "owner",
    //     // select: "typeUser ava username",
    //   },
    // })

    const comment = await Comment.find({ food: foodid })
      .populate({
        path: "owner",
        // populate: {
        //   path: "owner",
        // },
        select: "typeUser ava username",
      })
      .populate({
        path: "answerList",
        options: { sort: { rate: -1 } },
        // populate: { path: "owner" },
        populate: [
          { path: "rateList", match: { owner: req.userId }, select: "status" },
          { path: "owner", select: "typeUser ava username" },
        ],
      })
      // .sort({ rate: 1 })
      .populate({
        path: "rateList",
        match: { owner: req.userId },
        select: "status",
      })
      .sort({ rate: -1 })

    // const comment = await Comment.find({ food: foodid })
    // .populate({
    //   path: "owner",

    // })
    // .populate([{
    //   path: "answerList",

    //   // populate: [
    //   //   { populate: { path: "rateList" } },
    //   //   { populate: { path: "owner" } },
    //   // ],
    // }, {}, {})
    // .populate({
    //   path: "rateList",
    //   match: { owner: req.userId },
    // }])

    // .populate({
    //   path: "owner",
    //   // select: "typeUser ava username",
    // })

    res.json(comment)
  } catch (error) {
    res.status(500).json(`Error getting comments: ${error.message}`)
  }
})

router.get("/list/:foodid", async (req, res) => {
  try {
    const { foodid } = req.params
    const comment = await Comment.find({ food: foodid })
      .populate({
        path: "owner answerList",
        select: "typeUser ava username rate owner content date",
        populate: { path: "owner", select: "typeUser ava username" },
      })
      .select("answerList rate owner date content")

    res.json(comment)
  } catch (error) {
    res.status(500).json(`Error getting comments: ${error.message}`)
  }
})

// router.get("/comment/auth/:id", auth, async (req, res) => {
//   try {
//     const { id } = req.params

//     const food = await Food.findById(id).populate({
//       path: "rateList",
//       match: { owner: req.userId },
//       select: "status",
//     })

//     res.json(food)
//   } catch (error) {
//     res.status(500).json(`Error getting food by id: ${error.message}`)
//   }
// })

// router.get("/food/:id", async (req, res) => {
//   try {
//     const { id } = req.params

//     const food = await Food.findById(id)

//     res.json(food)
//   } catch (error) {
//     res.status(500).json(`Error getting food by id: ${error.message}`)
//   }
// })

module.exports = router

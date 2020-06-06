const { Router } = require("express")
const Food = require("../models/Food")
const auth = require("../middlewares/auth.middleware")
const RateFood = require("../models/RateFood")
const Order = require("../models/Order")
const Comment = require("../models/Comment")
const RateComment = require("../models/RateComment")
const Answer = require("../models/Answer")
const RateAnswer = require("../models/RateAnswer")
// const RateFood = require("../models/RateFood")

const router = Router()

router.get("/partner/:institution", async (req, res) => {
  try {
    const { institution } = req.params
    const food = await Food.find({ institution }).select(
      "name img category price"
    )

    res.json(food)
  } catch (error) {
    res.status(500).json(`Error getting foods of partner: ${error.message}`)
  }
})
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params

    const food = await Food.find({ category }).select(
      "name price institution img"
    )

    // if (food === null) {
    //   return res
    //     .status(404)
    //     .json({ errorCode: true, message: "Category is not exist!" })
    // }

    res.json(food)
  } catch (error) {
    res.status(500).json(`Error getting foods: ${error.message}`)
  }
})

router.get("/briefcategory/all", async (req, res) => {
  try {
    const pizza = await Food.find({ category: "pizza" })
      .sort({ rate: -1 })
      .select("name img institution")
      .limit(3)
    const soups = await Food.find({ category: "soups" })
      .sort({ rate: -1 })
      .select("name img institution")
      .limit(3)
    const salads = await Food.find({ category: "salads" })
      .sort({ rate: -1 })
      .select("name img institution")
      .limit(3)
    const main_dishes = await Food.find({ category: "main_dishes" })
      .sort({ rate: -1 })
      .select("name img institution")
      .limit(3)
    const sushi = await Food.find({ category: "sushi" })
      .sort({ rate: -1 })
      .select("name img institution")
      .limit(3)
    const burgers = await Food.find({ category: "burgers" })
      .sort({ rate: -1 })
      .select("name img institution")
      .limit(3)

    const response = { pizza, soups, salads, main_dishes, sushi, burgers }
    res.json(response)
  } catch (error) {
    res.status(500).json(`Error getting all popular foods: ${error.message}`)
  }
})
router.get("/food/auth/:id", auth, async (req, res) => {
  try {
    const { id } = req.params

    // const food = await Food.findById(id).populate({
    //   path: "comments",
    //   populate: { path: "owner" },
    // })
    // const ratefood = await RateFood.find({owner: req.userId}).find({food: id})

    const food = await Food.findById(id).populate({
      path: "rateList",
      match: { owner: req.userId },
      select: "status",
    })

    // .find({ rateList: { $elemMatch: { owner: req.userId } } })
    // const foodnew = await food.rateList.find({ owner: req.userId })
    // if (food === null) {
    //   res.status(404).json({ errorCode: true, message: "Food is not exist!" })
    // }

    res.json(food)
  } catch (error) {
    res.status(500).json(`Error getting food by id: ${error.message}`)
  }
})

router.get("/food/:id", async (req, res) => {
  try {
    const { id } = req.params

    const food = await Food.findById(id)

    res.json(food)
  } catch (error) {
    res.status(500).json(`Error getting food by id: ${error.message}`)
  }
})

router.get("/briefpartners/all", async (req, res) => {
  try {
    const Regina = await Food.find({ institution: "Regina" })
      .sort({ rate: -1 })
      .select("category name img")
      .limit(3)

    const Embroidered_Shirt = await Food.find({
      institution: "Embroidered_Shirt",
    })
      .sort({ rate: -1 })
      .select("category name img")
      .limit(3)

    const Pulse = await Food.find({ institution: "Pulse" })
      .sort({ rate: -1 })
      .select("category name img")
      .limit(3)

    const Dari_Mora = await Food.find({ institution: "Dari_Mora" })
      .sort({ rate: -1 })
      .select("category name img")
      .limit(3)

    const Brown = await Food.find({ institution: "Brown" })
      .sort({ rate: -1 })
      .select("category name img")
      .limit(3)

    res.json({ Regina, Embroidered_Shirt, Pulse, Dari_Mora, Brown })
  } catch (error) {
    res.status(500).json(`Error getting all partners foods: ${error.message}`)
  }
})

router.post("/create", auth, async (req, res) => {
  try {
    const {
      category,
      name,
      price,
      img,
      institution,
      description,
      weight,
    } = req.body

    const food = new Food({
      category,
      name,
      price,
      img,
      institution,
      description,
      weight,
      date: new Date(),
    })

    await food.save()

    res.status(201).json(food)
  } catch (error) {
    res.status(500).json(`Error creating new food: ${error.message}`)
  }
})

router.patch("/update/:id", auth, async (req, res) => {
  try {
    // const {
    //   category,
    //   name,
    //   price,
    //   img,
    //   institution,
    //   description,
    //   weight,
    // } = req.body

    const updatedFood = await Food.updateOne({ _id: req.params.id }, req.body)

    // await updatedFood.save()

    res.json(updatedFood)
  } catch (error) {
    res.status(500).json(`Error updating food: ${error.message}`)
  }
})

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params

    await Order.deleteMany({ foodProps: id })

    const comments = await Comment.find({ food: id })

    comments.map((item) => {
      const deleteRecords = async () => {
        try {
          await RateComment.deleteMany({ comment: item._id })

          const answers = await Answer.find({ comment: item._id })

          answers.map((elem) => {
            ;async () => await RateAnswer.deleteMany({ answer: elem._id })
          })

          await Answer.deleteMany({ comment: item._id })
        } catch (error) {}
      }
      deleteRecords()
    })

    await Comment.deleteMany({ food: id })
    await RateFood.deleteMany({ food: id })

    await Food.findByIdAndDelete(id)

    res.json({ message: "Food successfully deleted!" })
  } catch (error) {
    res.status(500).json(`Error deleting food: ${error.message}`)
  }
})
module.exports = router

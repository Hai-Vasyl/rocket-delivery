const { Router } = require("express")
const Food = require("../models/Food")
const auth = require("../middlewares/auth.middleware")

const router = Router()

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
router.get("/food/:id", async (req, res) => {
  try {
    const { id } = req.params

    const food = await Food.findById(id).populate({
      path: "comments",
      populate: { path: "owner" },
    })

    if (food === null) {
      res.status(404).json({ errorCode: true, message: "Food is not exist!" })
    }

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

    const updatedFood = await Food.update({ _id: req.params.id }, req.body)

    // await updatedFood.save()

    res.json(updatedFood)
  } catch (error) {
    res.status(500).json(`Error updating food: ${error.message}`)
  }
})

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id)

    res.json({ message: "Food successfully deleted!" })
  } catch (error) {
    res.status(500).json(`Error deleting food: ${error.message}`)
  }
})
module.exports = router

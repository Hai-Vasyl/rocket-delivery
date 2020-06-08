const { Router } = require("express")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const config = require("config")
const auth = require("../middlewares/auth.middleware")
const RateFood = require("../models/RateFood")
const RateComment = require("../models/RateComment")
const RateAnswer = require("../models/RateAnswer")
const Order = require("../models/Order")

const router = Router()

router.post(
  "/register",
  [
    check("username", "Username is too short!").isLength({ min: 4 }),
    check("email", "Email is not correct!").isEmail(),
    check("password", "Password is too short!").isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        let message = ""
        errors.errors.forEach((error) => {
          message += `${error.msg} `
        })
        message = message.trim()

        return res.status(400).json({ message })
      }

      const {
        username,
        email,
        password,
        typeUser,
        firstname,
        lastname,
      } = req.body

      const usernameUser = await User.findOne({ username })
      const emailUser = await User.findOne({ email })

      if (usernameUser) {
        return res
          .status(400)
          .json({ message: "User with this username is already exists!" })
      }
      if (emailUser) {
        return res
          .status(400)
          .json({ message: "User with this email is already exists!" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        firstname,
        lastname,
        typeUser,
        date: new Date(),
      })

      const user = await newUser.save()

      const token = jwt.sign({ userId: user._id }, config.get("jwt_secret"), {
        expiresIn: "7d",
      })

      res.status(201).json({
        token,
        userId: user._id,
        typeUser: user.typeUser,
        ava: user.ava,
        username: user.username,
      })
    } catch (error) {
      res
        .status(500)
        .json(`Something went wrong while register, error: ${error.message}`)
    }
  }
)

router.post(
  "/login",
  [
    check("email", "Email is not correct!").isEmail(),
    check("password", "Password is not correct!").isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        let message = ""
        errors.errors.forEach((error) => {
          message += `${error.msg} `
        })
        message = message.trim()

        return res.status(400).json({ message })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: "Wrong email, try again!" })
      }

      const compareResult = await bcrypt.compare(password, user.password)

      if (!compareResult) {
        return res.status(400).json({ message: "Wrong password, try again!" })
      }

      const token = jwt.sign({ userId: user._id }, config.get("jwt_secret"), {
        expiresIn: "7d",
      })

      res.json({
        token,
        userId: user._id,
        typeUser: user.typeUser,
        ava: user.ava,
        username: user.username,
      })
    } catch (error) {
      res
        .status(500)
        .json(`Something went wrong while login, error: ${error.message}`)
    }
  }
)

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find().select("ava username email date typeUser")

    res.json(users)
  } catch (error) {
    res.status(500).json(`Error getting users: ${error.message}`)
  }
})

router.delete("/delete/:userid", auth, async (req, res) => {
  try {
    const { userid } = req.params

    await RateFood.deleteMany({ owner: userid })
    await RateAnswer.deleteMany({ owner: userid })
    await RateComment.deleteMany({ owner: userid })
    await Order.deleteMany({ owner: userid })

    await User.findByIdAndDelete(userid)

    res.json("User deleted successfully!")
  } catch (error) {
    res.status(500).json(`Error deleting user: ${error.message}`)
  }
})

module.exports = router

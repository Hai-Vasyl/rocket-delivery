const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json("Access is denied!")
    }
    const { userId } = jwt.verify(token, config.get("jwt_secret"))

    req.userId = userId

    next()
  } catch (error) {
    res.status(401).json(`Error! Not Autorizen! ${error.message}`)
  }
}

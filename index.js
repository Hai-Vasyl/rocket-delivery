const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const path = require("path")

const app = express()
app.use(express.json({ extended: true }))
const PORT = process.env.PORT || config.get("port") || 5000

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || config.get("URI"),
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log("MongoDB started successfully")
    )
    app.use("/api/auth", require("./api/routes/users"))
    app.use("/api/foods", require("./api/routes/foods"))
    app.use("/api/comments", require("./api/routes/comments"))
    app.use("/api/answers", require("./api/routes/answers"))
    app.use("/api/orders", require("./api/routes/orders"))
    app.use("/api/ratefoods", require("./api/routes/rateFood"))
    app.use("/api/ratecomments", require("./api/routes/rateComment"))
    app.use("/api/rateanswers", require("./api/routes/rateAnswer"))

    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"))

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
      })
    }

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(`Server error: ${error.message}`)
    process.exit(1)
  }
}

start()

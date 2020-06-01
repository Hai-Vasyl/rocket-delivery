const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

const app = express()
app.use(express.json({ extended: true }))
const PORT = config.get("port") || 5000

const start = async () => {
  try {
    await mongoose.connect(
      config.get("URI"),
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("MongoDB started successfully")
    )
    app.use("/api/auth", require("./api/routes/users"))
    app.use("/api/foods", require("./api/routes/foods"))
    app.use("/api/comments", require("./api/routes/comments"))
    // app.use("/api/answers", require(""))
    // app.use("/api/orders", require(""))

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(`Server error: ${error.message}`)
    process.exit(1)
  }
}

start()

const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  category: { type: String, require: true },
  name: { type: String, require: true },
  price: { type: Number, require: true },
  institution: { type: String, require: true },
  description: { type: String, require: true },
  weight: { type: Number, require: true },
  img: { type: String, require: true },
  rate: { type: Number, require: true, default: 1 },
  date: { type: Date, require: true },
})

module.exports = model("Food", schema)

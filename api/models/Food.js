const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  institution: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: true },
  img: { type: String, required: true },
  rate: { type: Number, required: true, default: 1 },
  date: { type: Date, required: true },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
})

module.exports = model("Food", schema)

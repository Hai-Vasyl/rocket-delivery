const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User" },
  comment: { type: Types.ObjectId, ref: "Comment" },
  date: { type: Date, require: true },
  content: { type: String, require: true },
  rate: { type: Number, require: true, default: 1 },
})

module.exports = model("Answer", schema)

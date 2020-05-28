const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User" },
  food: { type: Types.ObjectId, ref: "Food" },
  answerList: [{ type: Types.ObjectId, ref: "Answer" }],
  date: { type: Date, require: true },
  rate: { type: Number, require: true, default: 1 },
  content: { type: String, require: true },
})

module.exports = model("Comment", schema)

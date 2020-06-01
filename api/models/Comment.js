const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  food: { type: Types.ObjectId, ref: "Food", required: true },
  answerList: [{ type: Types.ObjectId, ref: "Answer" }],
  date: { type: Date, required: true },
  rate: { type: Number, required: true, default: 1 },
  content: { type: String, required: true },
})

module.exports = model("Comment", schema)

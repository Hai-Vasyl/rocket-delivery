const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  comment: { type: Types.ObjectId, ref: "Comment", required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  rate: { type: Number, required: true, default: 1 },
  rateList: [{ type: Types.ObjectId, ref: "RateAnswer" }],
})

module.exports = model("Answer", schema)

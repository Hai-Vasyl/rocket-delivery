const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  answer: { type: Types.ObjectId, ref: "Answer", required: true },
  status: { type: Boolean, required: true },
})

module.exports = model("RateAnswer", schema)

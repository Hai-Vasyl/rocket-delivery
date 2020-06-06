const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  comment: { type: Types.ObjectId, ref: "Comment", required: true },
  status: { type: Boolean, required: true },
})

module.exports = model("RateComment", schema)

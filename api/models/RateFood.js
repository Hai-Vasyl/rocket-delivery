const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  food: { type: Types.ObjectId, ref: "Food", required: true },
  status: { type: Boolean, required: true },
})

module.exports = model("RateFood", schema)

const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  foodProps: { type: Types.ObjectId, ref: "Food", required: true },
  amount: { type: Number, required: true, default: 1 },
  generalPrice: { type: Number, required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
})

module.exports = model("Order", schema)

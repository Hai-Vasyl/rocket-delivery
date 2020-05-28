const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  foodProps: { type: Types.ObjectId, ref: "Food" },
  amount: { type: Number, require: true, default: 1 },
  generalPrice: { type: Number, require: true },
  owner: { type: Types.ObjectId, ref: "User" },
  date: { type: Date, require: true },
})

module.exports = model("Order", schema)

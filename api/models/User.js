const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  username: { type: String, require: true, unique: true },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  email: { type: String, require: true },
  password: { type: String, require: true },
  typeUser: { type: String, require: true, default: "User" },
  postalCode: { type: String, default: "" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  ava: {
    type: String,
    default:
      "https://www.pngitem.com/pimgs/m/516-5167304_transparent-background-white-user-icon-png-png-download.png",
  },
  orderList: [{ type: Types.ObjectId, ref: "Order" }],
  commentList: [{ type: Types.ObjectId, ref: "Comment" }],
  answerCommentList: [{ type: Types.ObjectId, ref: "Answer" }],
  date: { type: Date, require: true },
})

module.exports = model("User", schema)

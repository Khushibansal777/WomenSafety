const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: Number, enum: [0, 1], default: 0 },
  uid: { type: String, unique: true },
  uname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  emergencyNo: { type: String, required: true },
  emergencyMail: { type: String, required: true },
  pincode: { type: String, required: true },
  address: { type: String },
  extraEmail1: { type: String },
  extraEmail2: { type: String },
  extraPhone1: { type: String },
  extraPhone2: { type: String },
});

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     uid: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     uname: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     phoneNo: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//     },
//     pinCode: {
//       type: String,
//     },
//     emergencyMail: {
//       type: String,
//     },
//     emergencyNo: {
//       type: String,
//     },
//     extraEmail1: {
//       type: String,
//     },
//     extraEmail2: {
//       type: String,
//     },
//     extraPhone1: {
//       type: String,
//     },
//     extraPhone2: {
//       type: String,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

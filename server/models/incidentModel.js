const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    uname: { type: String, required: true },
    report: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincodeOfIncident: {
      type: String,
      required: true,
    },
    isSeen:{
      type: Boolean,
      default: false
  },
  meidaSt: {
    type: String,
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentSchema);

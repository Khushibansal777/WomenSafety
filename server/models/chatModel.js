const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    textChat: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    emergency: {
      type: mongoose.Types.ObjectId,
      ref: "Emergency",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = { Chat };

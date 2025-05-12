const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const { Chat } = require("../models/chatModel");
const { Emergency } = require("../models/emergencyModel");

const addChats = asyncHandler(async (req, res) => {
  const { senderId, receiverId, text, emergId } = req.body;

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);
  const emergency = await Emergency.findById(emergId);

  if (!sender || !receiver || !emergency) {
    return res
      .status(404)
      .json({ message: "Sender, Receiver or Emergency not found" });
  }

  const newChat = await Chat.create({
    sender: senderId,
    receiver: receiverId,
    textChat: text,
    emergency: emergId,
  });

  if (newChat) {
    res
      .status(201)
      .json({ message: "Message sent successfully", chat: newChat });
  } else {
    res.status(500).json({ message: "Failed to send message" });
  }
});

const getChats = asyncHandler(async (req, res) => {
  const receiver = req.params.id;
  const emergency = req.params.emerg;

  const chats = await Chat.find({ receiver, emergency })
    .populate("sender", "name")
    .populate("receiver", "name")
    .populate("emergency");

  if (chats.length > 0) {
    res.status(200).json(chats);
  } else {
    res.status(204).json({ message: "No chats found" });
  }
});

module.exports = { addChats, getChats };

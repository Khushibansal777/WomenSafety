const User = require("../models/userModel");
const Emergency = require("../models/emergencyModel");
const { sendHelpEmail, sendHelpEmailContacts } = require("../utils/email");
const axios = require("axios");
const asyncHandler = require("express-async-handler");

// Utility to fetch data from URL
const getData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    console.log("Reverse geocoding error:", e.message);
  }
};

// POST /api/v1/emergency/emergencypressed
const handleEmergencyPress = async (req, res) => {
  try {
    const { userId, lat, long } = req.body;

    if (!userId || !lat || !long) {
      return res
        .status(400)
        .json({ message: "Latitude, longitude, or userId is missing" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reverse geocode to get address & pincode
    const response = await getData(
      `https://apis.mapmyindia.com/advancedmaps/v1/82d493d7b0a8cdbca37e9adc209f9bfa/rev_geocode?lat=${lat}&lng=${long}`
    );

    const formattedAddress =
      response?.results?.[0]?.formatted_address || "Address not found";
    const pincode = response?.results?.[0]?.pincode || "000000";
    const mapLink = `https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14`;
    console.log("Reverse geocoding pincode", pincode);
    // Collect emergency contacts
    const recipients = [user.emergencyMail];
    // console.log("Receiptents are", recipients);
    if (user.extraEmail1) recipients.push(user.extraEmail1);
    if (user.extraEmail2) recipients.push(user.extraEmail2);
    console.log("Receiptents are", recipients);

    // Send SOS email to contacts
    await sendHelpEmail(
      recipients,
      lat,
      long,
      user.uname,
      pincode,
      formattedAddress
    );

    // Notify nearby users by pincode
    const allUsers = await User.find({});
    const nearbyUsers = allUsers.filter(
      (u) => u.pincode?.trim() === pincode.toString().trim()
    );
    //console.log("Nearby users", nearbyUsers);
    const nearbyEmails = nearbyUsers
      .map((u) => u.email)
      .filter((email) => email !== user.email);
    //console.log("Nearby emails", nearbyEmails);
    await sendHelpEmailContacts(
      nearbyEmails,
      lat,
      long,
      user.uname,
      pincode,
      formattedAddress
    );

    // Save to Emergency collection
    const newEmergency = await Emergency.create({
      userId: userId,
      lat: String(lat),
      long: String(long),
      emergencyLctOnMap: mapLink,
      addressOfIncd: formattedAddress,
    });

    res.status(200).json({
      message: "SOS alert sent successfully",
      emergency: newEmergency,
    });
  } catch (err) {
    console.error("Emergency press error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ GET /api/v1/emergency
const getAllEmergencies = asyncHandler(async (req, res) => {
  const data = [];
  const emer = await Emergency.find({});
  console.log("Fetched Emergencies:", emer); // Log fetched emergencies from DB

  for (const x of emer) {
    const user = await User.findById(x.userId); // Ensure you're using x.userId here
    if (user) {
      data.push({
        _id: x._id,
        mapLct: x.emergencyLctOnMap,
        addressOfInc: x.addressOfIncd,
        username: user.uname,
        userId: user._id,
        emergencyNo: user.emergencyNo,
        isResolved: x.isResolved,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
      });
    }
  }

  console.log("Prepared Emergency Data to send:", data); // Log data before sending to frontend
  res.status(200).json(data);
});

const getSinglEmergency = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const emergency = await Emergency.findById(id);
  if (emergency) {
    emergency.isResolved = true;
    await emergency.save();
    const user = await User.findById(emergency.userId); // Fixed here: x.userId instead of x.user
    if (user) {
      res.status(200).json({
        _id: emergency._id,
        mapLct: emergency.emergencyLctOnMap,
        addressOfInc: emergency.addressOfIncd,
        username: user.uname,
        emergencyNo: user.emergencyNo,
        isResolved: emergency.isResolved,
      });
    }
  }
});

const acknowledgeEmergency = asyncHandler(async (req, res) => {
  const emerg = req.params.id;
  const emerge = await Emergency.findById(emerg);
  if (emerge) {
    emerge.isResolved = true;
    await emerge.save();
    res.status(200).json({ message: "Resolved" });
  }
});

module.exports = {
  handleEmergencyPress,
  getAllEmergencies,
  getSinglEmergency,
  acknowledgeEmergency,
};

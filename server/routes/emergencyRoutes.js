const express = require("express");
const router = express.Router();
const {
  handleEmergencyPress,
  getAllEmergencies,
  acknowledgeEmergency, // ✅ add this import
} = require("../controllers/emergencyController");

// POST - Trigger SOS alert
router.post("/emergencypressed", handleEmergencyPress);

// GET - Fetch all emergencies
router.get("/", getAllEmergencies);

// ✅ PATCH - Acknowledge an emergency
router.patch("/:id", acknowledgeEmergency); // <-- This was missing

module.exports = router;

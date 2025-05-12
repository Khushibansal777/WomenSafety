const Incident = require("../models/incidentModel");
const asyncHandler = require('express-async-handler');

// @desc    Create new incident
// @route   POST /api/v1/incidents
// @access  Public
const createIncident = async (req, res) => {
  try {
    const { uname, report, address, pincodeOfIncident } = req.body;

    if (!report || !pincodeOfIncident || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newIncident = new Incident({
      uname,
      report,
      address,
      pincodeOfIncident,
    });
    await newIncident.save();

    res
      .status(201)
      .json({ message: "Incident reported successfully", newIncident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all incidents
// @route   GET /api/v1/incidents
// @access  Public
const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
const acknowledgeInc = asyncHandler(async (req, res) => {
  const inc = req.params.id;

  // Find the incident by ID
  const incident = await Incident.findById(inc);

  if (!incident) {
    return res.status(404).json({ message: "Incident not found" });
  }

  try {
    // Use $set to only update the isSeen field
    await Incident.updateOne(
      { _id: inc },
      { $set: { isSeen: true } }  // Only update the 'isSeen' field
    );

    return res.status(200).json({
      message: "Incident acknowledged successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating incident" });
  }
});


module.exports = { createIncident, getAllIncidents, acknowledgeInc };

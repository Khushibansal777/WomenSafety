const express = require("express");
const router = express.Router();
const {
  createIncident,
  getAllIncidents,
  acknowledgeInc, // ✅ Add this
} = require("../controllers/incidentController");

// POST -> Create incident
router.post("/incidents", createIncident);

// GET -> Fetch all incidents
router.get("/incidents", getAllIncidents);

// ✅ PATCH -> Acknowledge a specific incident
router.patch("/incidents/:id",acknowledgeInc);

module.exports = router;

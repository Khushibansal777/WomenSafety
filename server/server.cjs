const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const userRoutes = require("./routes/userRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");
dotenv.config();
connectDB();

const app = express();
// const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../WomenSafetyWebApp-main/build"))
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../WomenSafetyWebApp-main", "build", "index.html")
    );
  });
}

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", incidentRoutes); // ✅ Match your frontend axios.get call
app.use("/api/v1/emergency", emergencyRoutes);
app.use("/api/v1/chats", chatRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

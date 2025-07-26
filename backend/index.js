const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
// CORS middleware
app.use(cors({
  origin: 'https://std-feedback-x4zu.vercel.app',
  credentials: true
}));
app.use(express.json());


app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);








//test route
app.get("/", (req, res) => {
  res.send("Server is running");
});



// MongoDB Connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection failed", error));

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

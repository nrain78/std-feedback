const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URL).then(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await Admin.create({ username: "admin", password: hashedPassword });
  console.log("Admin created");
  process.exit();
});
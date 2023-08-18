require("dotenv").config();
const bodyparser = require("body-parser");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const scriptRoutes = require("./routes/scriptRoutes");
const authenticateDevice = require("./middleware/auth");

connectDB();

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use("/auth", cors(corsOptions), authRoutes);
app.use("/script", cors(corsOptions), authenticateDevice, scriptRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);

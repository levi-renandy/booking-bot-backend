const device = require("../models/device");
const bcrypt = require("bcryptjs");

const request = async (req, res) => {
  const { id } = req.body;

  const isDeviceExists = await device.findOne({ id: id });

  if (!isDeviceExists) {
    await device.create({ id: id, allowed: false });
  } else if (isDeviceExists.allowed) {
    res.status(400).json({ message: "This device is already allowed!" });
  }
  res.json({ message: "Success!" });
};

const register = async (req, res) => {
  const { id } = req.body;

  const isDeviceExists = await device.findOne({ id });

  if (!isDeviceExists) {
    await device.create({ id, allowed: true });
  } else if (isDeviceExists.allowed) {
    res.status(400).json({ message: "This device is already allowed!" });
  } else {
    await device.findByIdAndUpdate(isDeviceExists._id, { allowed: true });
  }

  res.json({ message: "Success!" });
};

module.exports = { request, register };

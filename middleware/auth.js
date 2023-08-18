const device = require("../models/device");
const bcrypt = require("bcryptjs");

const auth = async (req, res, next) => {
  const id = req.headers.id;

  if (!id) {
    res.status(401).json({ message: "Device id is needed" });
  } else {
    const isDeviceExists = await device.findOne({ id });

    if (isDeviceExists && isDeviceExists.allowed) {
      next();
    } else {
      res.status(401).json({ message: "This device is not allowed yet" });
    }
  }
};

module.exports = auth;

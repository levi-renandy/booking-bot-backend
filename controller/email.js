const nodemailer = require("nodemailer");
const admin = require("../models/admin");

const sendEmail = async (req, res) => {
  let users = await admin.find({});

  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "funnylife7890@outlook.com",
      pass: "master2033",
    },
  });

  let mailOptions = {
    from: "funnylife7890@outlook.com",
    to: users.map((user) => user.email),
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Failed" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Success!" });
    }
  });
};

module.exports = { sendEmail };

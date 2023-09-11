const nodemailer = require("nodemailer");
const admin = require("../models/admin");

const sendEmail = async (req, res) => {
  let { text, data } = req.body;

  let users = await admin.find({});

  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "funnylife23456@outlook.com",
      pass: "master2033",
    },
  });

  let mailOptions = {
    from: "funnylife23456@outlook.com",
    to: users.map((user) => user.email),
    subject: text,
    text: "",
  };

  if (data) {
    for (let d of data.data) {
      mailOptions.text += `
      Date: ${data.date}
      Centre: ${data.centre}
      Test type: ${d.testType}
      Time: ${d.time}
      Price: ${d.price}
      Tests available: ${d.testsAvailable}
      Last date to cancel: ${d.lastDateToCancel}
      `;
    }
  }

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

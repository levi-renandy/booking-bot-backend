require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const admin = require("../models/admin");

const sendEmail = async (req, res) => {
  let { text, data } = req.body;

  let users = await admin.find({});

  let mailOptions = {
    from: "funnylife0004@outlook.com",
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

  sgMail
    .send(msg)
    .then((response) => {
      console.log("Email sent");
      res.json({ message: "Success!" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Failed" });
    });
};

module.exports = { sendEmail };

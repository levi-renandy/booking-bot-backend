require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const admin = require("../models/admin");

const sendEmail = async (req, res) => {
  let { text, data } = req.body;

  let users = await admin.find({});

  let to = [];
  for (let user of users) {
    to.push(user.email);
  }

  console.log(to);

  let mailOptions = {
    from: "funnylife0004@outlook.com",
    to,
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
  } else {
    mailOptions.subject = "Warning!";
    mailOptions.text = text;
  }

  sgMail
    .send(mailOptions)
    .then((response) => {
      console.log("Email sent");
      res.json({ message: "Success!" });
    })
    .catch((error) => {
      console.log(error.response.body);
      res.status(500).json({ message: "Failed" });
    });
};

module.exports = { sendEmail };

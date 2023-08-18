const path = require("path");

const getScript = async (req, res) => {
  const options = {
    root: path.join(__dirname.split("controller")[0], "config"),
  };

  const fileName = "content.js";

  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

module.exports = { getScript };

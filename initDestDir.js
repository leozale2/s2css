const fs = require("fs");

module.exports = function(destPath) {
  try {
    fs.accessSync(destPath);
  } catch (err) {
      fs.mkdirSync(destPath);
  }
}

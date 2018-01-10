module.exports = function (path = "") {
  const filename = path.split(/(\/|\\)/).pop();
  return filename.split(".");
}

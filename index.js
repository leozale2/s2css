// var compile = require('sass.js/dist/sass.node');
var fs = require("fs");
var path = require("path");
var compile = require("./compile");
var initDestDir = require("./initDestDir");

module.exports = function(src, dest) {

  initDestDir(dest);

  fs.watch(src, function(type, filename) {
    filenames = filename.split(".");
    if (filenames[1] !== "scss") return;
    compile(path.join(src, filename), path.join(dest, filenames[0] + ".css"));
  })
}

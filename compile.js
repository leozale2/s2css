var compile = require('sass.js/dist/sass.node');
var fs = require("fs");
var path = require("path");

var options = {
  style: compile.Sass.style.expanded,
};

module.exports = function(srcFilePath,destFilePath){
  compile(srcFilePath, options, function(result) {
    fs.writeFile(destFilePath,result.text,function () {
      console.log(srcFilePath + " file is compiled!");
    })
  });
}

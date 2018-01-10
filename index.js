var compile = require('sass.js/dist/sass.node');
var fs = require("fs");
var path = require("path");

module.exports = function(src, dest) {

    fs.access(dest,function (err) {
      if(err){
        fs.mkdirSync(dest);
      }
    })

    fs.watch(src, function(type, filename) {
      filenames = filename.split(".");
      if(filenames[1] !== "scss") return;
        var options = {
          style: compile.Sass.style.expanded,
        };

        compile(path.join(src,filename), options, function(result) {
          fs.writeFile(path.join(dest,filenames[0]+".css"),result.text,function () {
            console.log(filename + " file is compiled!");
          })
        });
      })
    }

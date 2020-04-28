const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const images = "images";

fs.readdir(images, function(err, files) {
  if(err) console.log(err);
  files.forEach(function (file, index) {
    let fileName = file.substring(0, file.indexOf("."));
    let from = path.join(images, file);
    let to = path.join("tiles", fileName);
    sharp(from)
      .tile({
        size: 512
      })
      .toFile(to, function(err, info) {
        if(err) console.log(err);
      });
    //console.log(file);
    //console.log(fileName);
  });
});

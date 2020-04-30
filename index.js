const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const fromFolder = "images";
const toFolder = "tiles";
const read = require("fs-readdir-recursive");

const files = read(fromFolder);
files.forEach((file, index) => {
  let fileName = file.substring(0, file.indexOf("."));
  let from;
  let to;
  let filePathArray = file.split("/");
  if(filePathArray.length > 1) {
    let folder = filePathArray[0];
    fileName = filePathArray[1];
    from = path.join(fromFolder,folder,fileName);
    to = path.join(toFolder,folder);
    fs.mkdirSync(to,{recursive: true});
    to = path.join(toFolder,folder,fileName);
  } else {
    from = path.join(fromFolder, file);
    to = path.join(toFolder, fileName);
  }
  sharp(from)
    .tile({
      size: 512
    })
    .toFile(to, function(err, info) {
      if(err) console.log(err);
    });
});


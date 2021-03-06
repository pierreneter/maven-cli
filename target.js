var path = require('path');
var fs = require('fs');
const config = require('./package');
const http = require("http");
var extract = require('extract-zip');

let defaultUrl = `http://www-us.apache.org/dist/maven/maven-3/${config.mavenVersion}/binaries/apache-maven-${config.mavenVersion}-bin.zip`;
let fileZipName = path.resolve(__dirname, 'src', `apache-maven-${config.mavenVersion}-bin.zip`);
let target = exports;
target.home = process.env.HOME || process.env.USERPROFILE;
target.home += '/.maven';
target.path = path.join(target.home, `apache-maven-${config.mavenVersion}`, 'bin');
target.pathCheck = path.join(target.path, 'mvn');

target.init = function() {
  let nothing = true;
  // Make dir .maven
  try {
    fs.accessSync(target.pathCheck, fs.F_OK);
    nothing = false;
  } catch (e) {
    try {
      fs.accessSync(target.home, fs.F_OK);
    } catch (e) {
      fs.mkdir(target.home);
    }
  }
  // install maven
  if (nothing) {
    createFolder();
  }
}

function createFolder() {
  file = fs.createReadStream(fileZipName);
  extract(fileZipName, {dir: target.home}, function (err) {});
}

target.init();

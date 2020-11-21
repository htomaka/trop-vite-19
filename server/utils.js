const fs = require("fs").promises;
const del = require("del");

async function readDir(path) {
  try {
    return fs.readdir(path);
  } catch (err) {
    console.error(err);
  }
}

async function rmDir(path) {
  try {
    return del(path);
  } catch (err) {
    console.error(err);
  }
}

async function mkDir(path) {
  try {
    return fs.mkdir(path);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  readDir,
  rmDir,
  mkDir
};

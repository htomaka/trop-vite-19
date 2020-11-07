const fs = require("fs").promises;

async function readDir(path) {
  try {
    return await fs.readdir(path);
  } catch (err) {
    console.error(err);
  }
}

async function rmDir(path, options){
  return await fs.rmdir(path, options);
}

async function mkDir(path, options){
  return await fs.mkdir(path);
}

module.exports = {
  readDir,
  rmDir,
  mkDir
};

const fs = require("fs").promises;
const path = require("path");

async function readDir(path) {
  try {
    return await fs.readdir(path);
  } catch (err) {
    console.error(err);
  }
}

async function cleanDir(dir) {
  try {
    const files = await fs.readdir(dir);
    return files.forEach(async (file) => await fs.unlink(path.join(dir, file)));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  readDir,
  cleanDir,
};

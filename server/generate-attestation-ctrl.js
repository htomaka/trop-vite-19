const fs = require("fs").promises;
const path = require("path");
const schema = require("./schema");
const { tmpFolder } = require("./config");
const { generateAttestation } = require("./generate-attestation-service");

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
    return files.forEach(
      async (file, i) => await fs.unlink(path.join(dir, file))
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  async generateAttestationCtrl(req, res) {
    if (!schema.valid(req.body)) {
      res.status(500).end("Invalid input");
    }

    try {
      await cleanDir(tmpFolder);
      await generateAttestation(req.body);
      const files = await readDir(tmpFolder);
      if (files.length) {
        await res.download(path.join(tmpFolder, files[files.length - 1]));
      }
    } catch (err) {
      res.status(500).end(JSON.stringify(err));
    }
  },
};

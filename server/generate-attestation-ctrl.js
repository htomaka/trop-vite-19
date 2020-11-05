const path = require("path");
const fs = require("fs").promises;
const schema = require("./schema");
const AttestationGeneratorService = require("./attestation-generator-service");
const config = require("../config");
const { readDir, cleanDir } = require("./utils");
const service = new AttestationGeneratorService(config);

module.exports = {
  async generateAttestationCtrl(req, res) {
    if (!schema.valid(req.body)) {
      res.status(500).end("Invalid input");
    }

    try {
      await fs.mkdir(config.tmpFolder);
      await service.exec(req.body);
      const files = await readDir(config.tmpFolder);
      if (files.length) {
        await res.download(
          path.join(config.tmpFolder, files[files.length - 1])
        );
      }
      await fs.rmdir(config.tmpFolder, { recursive: true });
    } catch (err) {
      res.status(500).end(JSON.stringify(err));
    }
  },
};

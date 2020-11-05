const path = require("path");
const schema = require("./schema");
const AttestationGeneratorService = require("./attestation-generator-service");
const config = require("./config");
const { readDir, cleanDir } = require("./utils");
const service = new AttestationGeneratorService(config);

module.exports = {
  async generateAttestationCtrl(req, res) {
    if (!schema.valid(req.body)) {
      res.status(500).end("Invalid input");
    }

    try {
      await cleanDir(config.tmpFolder);
      await service.exec(req.body);
      const files = await readDir(config.tmpFolder);
      if (files.length) {
        await res.download(
          path.join(config.tmpFolder, files[files.length - 1])
        );
      }
    } catch (err) {
      res.status(500).end(JSON.stringify(err));
    }
  },
};

const path = require("path");
const fs = require("fs").promises;
const schema = require("./schema");
const AttestationGeneratorService = require("./attestation-generator-service");
const config = require("./config");
const { mkDir } = require("./utils");
const { rmDir } = require("./utils");
const { readDir } = require("./utils");
const service = new AttestationGeneratorService(config);

module.exports = {
  async generateAttestationCtrl(req, res) {
    if (!schema.valid(req.body)) {
      res.status(500).end("Invalid input");
    }

    try {
      service.on("generatorService::error", console.error);
      service.on("generatorService::init", async () => await mkDir(config.tmpFolder));
      service.on("generatorService::afterExec", async () => {
        const files = await readDir(config.tmpFolder);
        if (files.length) {
          await res.download(
            path.join(config.tmpFolder, files[files.length - 1])
          );
        }
        await rmDir(config.tmpFolder);
      });
      await service.exec(req.body);
    } catch (err) {
      res.status(500).end(JSON.stringify(err));
    }
  }
};

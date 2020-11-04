const fs = require("fs");
const path = require("path");
const schema = require("./schema");
const { generateAttestation } = require("./generate-attestation-service");

function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (!err) {
        resolve(files);
      } else {
        reject(err);
      }
    });
  });
}

function cleanDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files = []) => {
      if (err) {
        reject(err);
      }
      files.forEach((file, i) => {
        fs.unlink(path.join(dir, file), (err) => {
          if (err) {
            reject(err);
          }

          if (i === files.length - 1) {
            resolve();
          }
        });
      });
    });
  });
}

module.exports = {
  generateAttestationCtrl(req, res) {
    if (!schema.valid(req.body)) {
      res.status(500).end("Invalid input");
    }

    cleanDir(path.join(__dirname, "downloads"))
      .then(() => {
        return generateAttestation(req.body);
      })
      .then(() => {
        console.log("read dir");
        return readDir(path.join(__dirname, "downloads"));
      })
      .then((files) => {
        if (!files.length) {
          res.status(500).end("download failed");
        }
        console.log("attempt to download");
        res.download(
          path.join(__dirname, "downloads", files[files.length - 1]),
          (err, _) => {
            if (!err) {
              res.status(200).end();
              console.log("download success");
            } else {
              res.status(500).end(JSON.stringify(err));
              console.error("download failed");
            }
          }
        );
      })
      .catch((err) => {
        res.status(500).end(JSON.stringify(err));
      });
  },
};

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  generateAttestationCtrl,
} = require("./server/generate-attestation-ctrl");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/generate", generateAttestationCtrl);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const cors = require("cors");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GCS config
const storage = new Storage({
  keyFilename: "service-account.json", // path to your JSON key
});
const bucket = storage.bucket(process.env.BUCKET_NAME);

// POST /submit
app.post("/submit", async (req, res) => {
  try {
    const data = req.body;
    const id = uuidv4();
    data.id = id;
    data.timestamp = new Date().toISOString();

    const file = bucket.file(`${id}.json`);
    await file.save(JSON.stringify(data), {
      resumable: false,
      contentType: "application/json",
    });

    console.log("Received data:", req.body);

    return res.status(200).json({ status: "success", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Spendly backend running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const { BigQuery } = require("@google-cloud/bigquery");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const bigquery = new BigQuery({ keyFilename: "service-account.json" });
const storage = new Storage({ keyFilename: "service-account.json" });
const bucket = storage.bucket(process.env.BUCKET_NAME);

// Middleware
app.use(cors());
app.use(express.json());

// POST /submit - Save expense to GCS
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

    console.log("✅ Data saved:", data);
    return res.status(200).json({ status: "success", id });
  } catch (err) {
    console.error("❌ Error saving data:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

// GET /history/daily
app.get("/history/daily", async (req, res) => {
  const query = `
    SELECT id, category, amount, note, timestamp
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) = CURRENT_DATE()
    ORDER BY timestamp DESC;
  `;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});

// GET /history/weekly
app.get("/history/weekly", async (req, res) => {
  const query = `
    SELECT id, category, amount, note, timestamp
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
    ORDER BY timestamp DESC;
  `;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});

// GET /history/monthly
app.get("/history/monthly", async (req, res) => {
  const query = `
    SELECT id, category, amount, note, timestamp
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE())
      AND EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE())
    ORDER BY timestamp DESC;
  `;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});

// GET /history/yearly
app.get("/history/yearly", async (req, res) => {
  const query = `
    SELECT id, category, amount, note, timestamp
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE())
    ORDER BY timestamp DESC;
  `;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});


// GET /get-expenses-history
app.get("/get-expenses-history", async (req, res) => {
  const query = `
    SELECT 
      FORMAT_DATE('%d/%m/%y', DATE(timestamp)) AS date,
      FORMAT_TIME('%I:%M%p', TIME(timestamp)) AS time,
      category,
      amount,
      note
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    ORDER BY timestamp DESC
  `;
  try {
    const [rows] = await bigquery.query({ query });
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Failed to fetch expenses history:", err);
    res.status(500).json({ error: "Failed to fetch expenses history." });
  }
});


// GET /home/spent-today
app.get("/home/spent-today", async (req, res) => {
  const query = `
    SELECT SUM(amount) AS total
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) = CURRENT_DATE()
  `;
  try {
    const [rows] = await bigquery.query({ query });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch today's expenses." });
  }
});

// GET /home/average-daily
app.get("/home/average-daily", async (req, res) => {
  const query = `
    SELECT ROUND(AVG(amount), 2) AS average
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
  `;
  try {
    const [rows] = await bigquery.query({ query });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch average daily expenses." });
  }
});

// GET /home/monthly-total
app.get("/home/monthly-total", async (req, res) => {
  const query = `
    SELECT SUM(amount) AS total
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE())
      AND EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE())
  `;
  try {
    const [rows] = await bigquery.query({ query });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch monthly total." });
  }
});

// GET /home/dominant-category
app.get("/home/dominant-category", async (req, res) => {
  const query = `
    SELECT category, SUM(amount) AS total
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    GROUP BY category
    ORDER BY total DESC
    LIMIT 1
  `;
  try {
    const [rows] = await bigquery.query({ query });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dominant category." });
  }
});

// Already existing endpoints (optional rename for clarity)
app.get("/get-expenses", async (req, res) => {
  const query = `
    SELECT id, timestamp, category, amount, note
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
    ORDER BY timestamp DESC
  `;
  try {
    const [rows] = await bigquery.query({ query });
    const formattedRows = rows.map((row) => ({
      ...row,
      timestamp: row.timestamp?.value || null,
    }));
    res.json(formattedRows);
  } catch (err) {
    console.error("❌ BigQuery error:", err);
    res.status(500).json({ error: "Failed to fetch expenses." });
  }
});

// Others (unchanged)
app.get("/get-daily-expenses", async (req, res) => {
  const query = `SELECT 
    FORMAT_DATE('%Y-%m-%d', DATE(timestamp)) AS date,
    SUM(amount) AS total
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY)
    GROUP BY date
    ORDER BY date;`;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});

app.get("/get-weekly-expenses", async (req, res) => {
  const query = `SELECT 
    FORMAT_DATE('%Y-%W', DATE(timestamp)) AS week,
    SUM(amount) AS total
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    GROUP BY week
    ORDER BY week;`;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});

app.get("/get-category-expenses", async (req, res) => {
  const query = `SELECT 
    category,
    SUM(amount) AS total
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    GROUP BY category
    ORDER BY total DESC;`;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});

app.get("/get-monthly-expenses", async (req, res) => {
  const query = `SELECT 
    FORMAT_DATE('%Y-%m', DATE(timestamp)) AS month,
    SUM(amount) AS total
    FROM \`${process.env.PROJECT_ID}.spendly_data.expenses\`
    WHERE DATE(timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
    GROUP BY month
    ORDER BY month;`;
  const [rows] = await bigquery.query({ query });
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`✅ Spendly backend running at http://localhost:${PORT}`);
});

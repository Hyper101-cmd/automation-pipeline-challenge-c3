const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const MOCK_RESULTS = [
  { id: "img_001", title: "Sunset over dunes", type: "image" },
  { id: "vid_002", title: "Waves at dawn", type: "video" }
];

app.get("/healthz", (req, res) => {
  res.type("text/plain").status(200).send("OK\n");
});

app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const filtered = q
    ? MOCK_RESULTS.filter(r => r.title.toLowerCase().includes(q))
    : MOCK_RESULTS;
  res.json({ query: q, count: filtered.length, results: filtered });
});

app.get("/", (_req, res) => {
  res.type("text/plain").send("Demo Media API. Try /healthz or /search?q=sunset\n");
});

app.listen(PORT, () => {
  console.log(`Demo Media API listening on :${PORT}`);
});

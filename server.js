const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));

let links = {};

app.post("/shorten", (req, res) => {
  const originalUrl = req.body.url;
  const shortId = Math.random().toString(36).substring(2, 8);
  links[shortId] = originalUrl;
  res.json({ shortUrl: `/ad/${shortId}` });
});

app.get("/ad/:id", (req, res) => {
  const shortId = req.params.id;
  if (links[shortId]) {
    res.sendFile(path.join(__dirname, "src", "views", "ad.html"));
  } else {
    res.status(404).send("Not Found");
  }
});

app.get("/redirect/:id", (req, res) => {
  const shortId = req.params.id;
  if (links[shortId]) {
    res.redirect(links[shortId]);
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

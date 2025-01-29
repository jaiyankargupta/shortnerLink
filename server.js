require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const Url = require("./models/Url"); // Import the Url model
const app = express();
const port = process.env.PORT || 3005; // Change the port number

app.use(bodyParser.json());

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, "src")));

function generateShortenedUrl() {
  const hash = nanoid(8); // Generate a unique ID of length 8
  return hash;
}

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Shorten URL route
app.post("/shorten", async (req, res) => {
  try {
    const originalUrl = req.body.url;
    const hash = generateShortenedUrl();
    const shortUrl = `https://rustyn.vercel.app/${hash}`; // Use your Vercel app URL

    const newUrl = new Url({
      originalUrl,
      shortUrl,
      hash,
    });

    await newUrl.save();

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
  console.log(`URL shortener app listening at http://localhost:${port}`);
});

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const Url = require("./models/Url"); // Import the Url model
const app = express();
const port = process.env.PORT || 3008;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

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
    const shortUrl = `${req.protocol}://${req.get("host")}/${hash}`; // Construct the full short URL

    const newUrl = new Url({
      originalUrl,
      shortUrl,
      hash,
      createdAt: new Date(), // Ensure createdAt is set
    });

    await newUrl.save();

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Redirect route
app.get("/:hash", async (req, res) => {
  try {
    const hash = req.params.hash;
    const url = await Url.findOne({ hash });

    if (url) {
      url.clicks += 1;
      await url.save();
      res.sendFile(path.join(__dirname, "src", "/views/ad.html"));
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error("Error finding URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Final destination route
app.get("/redirect/:hash", async (req, res) => {
  try {
    const hash = req.params.hash;
    const url = await Url.findOne({ hash }); // Find the URL by the hash in the database
    // redirect to the original URL
    if (url) {
      res.status(301).redirect(url.originalUrl);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error("Error finding URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`URL shortener app listening at http://localhost:${port}`);
});

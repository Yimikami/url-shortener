const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Url = require("./models/urlModel");
const app = express();
const shortId = require("shortid");
const QRCode = require("qrcode");

dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // mongodb connection string
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected.");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// connect to mongoDB
connectDB();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware for handling JSON, URL-encoded data, and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// start the server and listen on PORT
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});

app.post("/shorten", async (req, res) => {
  try {
    let shortUrl;

    if (req.body.shortUrl) {
      shortUrl = req.body.shortUrl;
    } else {
      shortUrl = shortId.generate();
    }
    const url = new Url({
      fullUrl: req.body.fullUrl,
      name: req.body.name,
      shortUrl: shortUrl,
    });

    const qrCodeUrl = await QRCode.toDataURL(process.env.BASE_URL + shortUrl);
    url.qrCode = qrCodeUrl;

    await url.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Invalid URL");
  }
});

app.get("/", async (req, res) => {
  try {
    const urls = await Url.find();
    res.render("index", { urls });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(400).send("URL not found");
    }
    // Increment the click count and save the updated URL
    url.clicks++;
    url.save();
    res.redirect(url.fullUrl);
  } catch (error) {
    res.status(500).send("URL not found");
  }
});

app.post("/update/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const newFullUrl = req.body.newFullUrl;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(400).send("URL not found");
    }

    url.fullUrl = newFullUrl;
    await url.save();
    res.redirect("/");
  } catch (error) {
    // detailed error message
    res.status(500).send("Error updating URL" + error.message);
  }
});

app.post("/delete/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const result = await Url.deleteOne({ shortUrl });

    if (result.deletedCount === 0) {
      return res.status(400).send("URL not found");
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting URL" + error.message);
  }
});

app.get("/qrcode/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(400).send("URL not found");
    }

    const qrCodeUrl = await QRCode.toDataURL(process.env.BASE_URL + shortUrl);
    url.qrCode = qrCodeUrl;
    await url.save();

    res.json({ qrCodeUrl });
  } catch (error) {
    res.status(500).send("Error generating QR Code: " + error.message);
  }
});

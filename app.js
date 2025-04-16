require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

console.log("mongourl", process.env.MONGO_URL)

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));


app.get("/", async (req, res) => {
  res.end("Reponse is now.")
});



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

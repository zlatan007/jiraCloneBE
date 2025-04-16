require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;

console.log("mongourl", process.env.MONGO_URL)

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));

  app.use(cors({
    origin: (origin, callback) => callback(null, origin),
    credentials: true
  }));
  
app.use(bodyParser.json());
// app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.end("Reponse is now.")
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

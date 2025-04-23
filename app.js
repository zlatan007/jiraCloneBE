require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;

console.log("mongourl", process.env.MONGO_URL)

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow all origins (you could also specify your front-end domains)
        callback(null, true); // Accept any origin
      },
      credentials: true, // Allow cookies or authorization headers
      allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow Authorization header
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary HTTP methods
    })
  );
  
app.use(bodyParser.json());
// app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.end("Reponse is now.")
});

app.use("/auth", authRoute);

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

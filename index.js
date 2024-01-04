const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const postRouter = require("./routes/postRoutes")

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose
  .connect(
   mongoURL
  )
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => {
    console.log(e);
    setTimeout(connectWithRetry, 5000);
  
  });
}

connectWithRetry();

// Defining a middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hi There</h2>");
});

//localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter)
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}`));

const express = require("express");
const cors = require("cors");

const app = express();
const cardRouter = require("./routes/cardRoutes");
const itemRouter = require("./routes/itemRoutes");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://nightw0lfff.github.io");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/api/cards", cardRouter);
app.use("/api/items", itemRouter);

module.exports = app;

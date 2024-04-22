const express = require("express");

const app = express();
const cardRouter = require("./routes/cardRoutes");

app.use(express.json());

app.use("/api/cards", cardRouter);

module.exports = app;

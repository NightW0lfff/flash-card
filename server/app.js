const express = require("express");
const cors = require("cors");

const app = express();
const cardRouter = require("./routes/cardRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/cards", cardRouter);

module.exports = app;

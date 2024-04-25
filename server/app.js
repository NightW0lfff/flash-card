const express = require("express");
const cors = require("cors");

const app = express();
const cardRouter = require("./routes/cardRoutes");
const itemRouter = require("./routes/itemRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/cards", cardRouter);
app.use("/api/items", itemRouter);

module.exports = app;

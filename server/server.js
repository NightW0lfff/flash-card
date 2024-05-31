const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8080;

app.listen(port, (res, req) => {
  console.log(`App running on port ${port} ....`);
});

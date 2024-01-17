const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const userrt = require("./router/userrouter");

dotenv.config("./.env");

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
if (process.env.node_env === "development") {
  app.use(morgan("dev"));
}
mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/0.1/users", userrt);

const port = process.env.port;
app.listen(port, () => {
  console.log(`Sever is Listening on Port ${port}`);
});

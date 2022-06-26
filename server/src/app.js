const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const api = require("./routes/api");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("combined"));

// http://localhost:8000/v1/users
app.use("/v1", api);

module.exports = app;

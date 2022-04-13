const express = require("express");
const morgan = require("morgan");
const caseRouter = require("./routes/caseRoutes");

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/cases", caseRouter);

module.exports = app;

const express = require("express");
const morgan = require("morgan");
const caseRouter = require("./routes/caseRoutes");
const lawyerRouter = require("../advocase_backend/routes/lawyerRoutes")
const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/cases", caseRouter);
app.use(lawyerRouter)

module.exports = app;

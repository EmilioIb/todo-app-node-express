require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { postgresSequelize } = require("./helpers/db.helper");
const errorHandler = require("./middlewares/error.handler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/index.routes"));
app.use(errorHandler);

const startApp = () => {
  app.listen(
    process.env.PORT,
    console.log(`Server listening in port: ${process.env.PORT}`)
  );
};

postgresSequelize
  .authenticate()
  .then(() => startApp())
  .catch((err) => {
    throw err;
  });
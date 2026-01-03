const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loadEnvVariables = require("./utils/envHelper");
const errorHandler = require("./middlewares/errorHandler.middleware");
const routes = require("./routes");

const createServer = () => {
  const app = express();

  // initialize environment variables
  loadEnvVariables();
  // initializeFirebase();

  // Body parsing Middleware
  app.use(express.json({ limit: "50mb" }));
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cors());

  //Routes
  app.use("/api", routes);

  // if (process.env.NODE_ENV == "development") {
  // } else if (process.env.NODE_ENV == "preprod") {
  // } else {
  // }

  app.use("/images", express.static("images"));

  // eslint-disable-next-line no-unused-vars
  app.get("/", async (_req, res) => {
    return res.status(200).send({
      success: true,
      message: "The insuredmine service is running",
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.get("/health", async (_req, res) => {
    return res.status(200).send({
      success: true,
      message: "The server is running",
    });
  });

  // global error handler (must be last)
  app.use(errorHandler);

  return app;
};

module.exports = createServer;

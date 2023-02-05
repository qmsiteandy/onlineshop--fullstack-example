const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const { apiRouter, pageRouter } = require("./routes");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", pageRouter);
app.use("/api", apiRouter);

// swagger設定檔案
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running on port " + process.env.SERVER_PORT);
});

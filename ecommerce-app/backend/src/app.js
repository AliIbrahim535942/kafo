const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({
    message: "Welcome",
  });
});

const contactsRouter = require("./app/routes/contact.route");
app.use("/api/contacts", contactsRouter);

app.use((res, req, next) => {
  return next(new ApiError(404, "Resource Not Found."));
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Sever Error!",
  });
});

module.exports = app;

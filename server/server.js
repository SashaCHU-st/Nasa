const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const HttpError = require("./models/https-error");
const app = express();
const UserRoutes = require("./routes/user-routes");


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");//разрешает запросы
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );//загаловки которые модно отправлять
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");//запросф каотрые можно отпарвлять
  next();
});

const mongoose = require("mongoose");

app.use("/api/users", UserRoutes); // даем адрес по которому можно найти
app.use((req, res, next) => {
  const err = new HttpError("could not found ", 404);
  throw err;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "Anknown error occured!",
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
      console.log("all good");
      const port = process.env.PORT || 5000; // Использует PORT, если он доступен, иначе 5000 для локальной разработки
      app.listen(port, () => {
        console.log(` port ${port}`);//удалить потом
      });
     
  })
  .catch((err) => {
    console.error("Bad:", err);
  });
  

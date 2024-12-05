const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const HttpError = require("./models/http-error");
const app = express();
const UserRoutes = require("./routes/user-routes");
const ArticlesRoutes = require("./routes/article-routes")


app.use(bodyParser.json());
app.use((req, res, next) => { // this is ned for cors
  res.setHeader("Access-Control-Allow-Origin", "*");//allow requests
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );//titles that can be send
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");//requests that can be send
  next();
});

const mongoose = require("mongoose");

app.use("/api/users", UserRoutes); // giving adress where can be found smth in this case users throug /api/user...  before that liknk to website
app.use("/api/articles", ArticlesRoutes)
app.use((req, res, next) => {// in case of error not found
  const err = new HttpError("could not found ", 404);
  throw err;
});

app.use((error, req, res, next) => {// in case smth went wrong
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
      const port = 
      process.env.PORT 
      || 
      5000; // in case PORT is ok use it (when it is deployed in Render) if not use 5000 ->localhost
      app.listen(port, () => {
      });
     
  })
  .catch((err) => {
    console.error("Bad:", err);
  });
  

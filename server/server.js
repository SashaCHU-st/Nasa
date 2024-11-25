const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // для загрузки переменных окружения

const HttpError = require("./models/https-error");
const UserRoutes = require("./routes/user-routes");

const app = express();

// Middleware для парсинга JSON
app.use(bodyParser.json());

// CORS настройки (разрешаем запросы с любого источника)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// Роуты API для работы с пользователями
app.use("/api/users", UserRoutes);

// Если маршрут не найден, отправляем ошибку 404
app.use((req, res, next) => {
  const err = new HttpError("Could not find this route.", 404);
  throw err;
});

// Глобальная обработка ошибок
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred!",
  });
});

// Соединение с MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to the database!");

    // После подключения к базе данных запускаем сервер
    const port = process.env.PORT || 10000; // Порт из переменной окружения или 10000 по умолчанию
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err);
  });

// Настройки для режима продакшн (если приложение собралось с помощью react-scripts)
if (process.env.NODE_ENV === "production") {
  // Отдаем статические файлы из папки build
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Для всех других запросов возвращаем index.html, чтобы React-роутинг работал
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

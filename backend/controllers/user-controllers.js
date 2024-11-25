const { validationResult } = require("express-validator");
const HttpError = require("../models/https-error");
const User = require("../models/user");


const getUsers = async (req, res, next) => {
  let users;// 
  try {
    users = await User.find({}, "-password"); // everything exept password
  } catch (err) {
    return next(new HttpError("cannot get users", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};


const createUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return next(new HttpError("Invalid input!", 422));
  }
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Invalid input?", 500));
  }

  if (hasUser) return next(new HttpError("Already exist", 422));

  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Something went wrong", 500));
  }
  res.status(201).json({ users: newUser.toObject({ getters: true }) });
};



const login = async (req, res, next) => {
  const { email, password } = req.body;

  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Logging failed", 500));
  }

  if (!hasUser || hasUser.password !== password)
    return next(new HttpError("Logging failed, wrong credentials", 401));
  res.status(200).json({ message: "loged in" });
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;

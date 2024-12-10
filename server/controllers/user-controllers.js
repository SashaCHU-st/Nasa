const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // access the Authorization header from request. in Postman
  //Header: Authorization => Bearer <TOKEN>. after that it will split with space and [1] means that it will take second
  //element whta is actaul token value . ? not really needed? but it is just oprional in case if it undefined it will
  // not triygh error, but will jsyt says that token undifined

  if (!token) {
    return next(new HttpError("Access denied. No token provided", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    // verificate paramenters token and +secret key
    //it will call once, and check if arguments are correct
    if (err) {
      return next(new HttpError("Invalid token", 403)); // 403 server got req, but e.g user does not have permission
    }
    // if no err then decoded will have user's data. it is exctaret userId from token
    req.userData = { userId: decoded.userId }; // it adds to req.userData it can accesed in other middleware or route
    //handlers. It show other part which excet user making req
    next();
  });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password").populate("favorites.article"); // Populate favorites
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }

  const usersWithFavoritesCount = users.map((user) => ({
    // mapping users one by one by user
    id: user.id,
    name: user.name,
    email: user.email,
    favoritesCount: user.favorites.length, //.length Count of favorites
    favorites: user.favorites,
  }));

  res.json({ users: usersWithFavoritesCount });
};

const createUser = async (req, res, next) => {
  const error = validationResult(req); //. if it is return empty that eberyt is ok, if not then error
  if (!error.isEmpty()) {
    // if false then
    // console.log(error);
    return next(new HttpError("Invalid input!", 422));
  }

  const { name, email, password } = req.body; // the request that can be requsted

  let hasUser;
  try {
    hasUser = await User.findOne({ email: email }); // check if email alredy exist
  } catch (err) {
    return next(new HttpError("Invalid input?", 500));
  }

  if (hasUser) return next(new HttpError("User already exists", 422));

  // Create a new user
  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    await newUser.save(); // wait untill it finished
  } catch (err) {
    return next(
      new HttpError("Something went wrong while saving the user", 500)
    );
  }

  // Generate JWT Token after user is created
  const token = jwt.sign(
    { userId: newUser.id }, /// user id
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );

  // Return response with token and user details
  res.status(201).json({
    message: "User created successfully!",
    token: token, //needed for auth when addeing to favorites or updates
    userId: newUser.id, // needed for auth when addeing to favorites or updates
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body; // req email and pass

  let hasUser;
  try {
    hasUser = await User.findOne({ email: email }); // find on email and put it to var hasUser, whcih will incluse all info
    //about user->email, password. and if email is corect will = hasUser
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  if (!hasUser || hasUser.password !== password) {
    // if pass is not belongs to user
    return next(new HttpError("Logging in failed, wrong credentials.", 401));
  }

  const token = jwt.sign(
    { userId: hasUser.id }, /// user id
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );

  res.status(200).json({
    message: "Logged in successfully",
    token: token, // needed for auth when addeing to favorites
    userId: hasUser.id, // needed for auth when addeing to favorites
  });
};
// This is mainly for updating user
const getCurrentUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userData.userId).select("-password"); // Exclude password. checking from req.userId that was coming from authJWT
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const updateCurrentUser = async (req, res, next) => {
  const { name, password } = req.body;

  let user;
  try {
    user = await User.findById(req.userData.userId); // chekcing by user ID
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  if (name) {
    user.name = name; // uodatug ehat has come from req
  }

  if (password) {
    user.password = password; // Update password
  }

  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError("Updating user failed, please try again later.", 500)
    );
  }

  res.status(200).json({ message: "User updated successfully!" });
};

exports.updateCurrentUser = updateCurrentUser;
exports.getCurrentUser = getCurrentUser;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;
exports.authJWT = authJWT;

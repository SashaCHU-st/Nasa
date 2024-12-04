const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const authJWT = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = { userId: decoded.userId }; // add info about user in request
//     next();
//   });
// };
const authJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'

  if (!token) {
    return next(new HttpError('Access denied. No token provided', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new HttpError('Invalid token', 403));
    }
    req.userData = { userId: decoded.userId }; // Add user data to request
    next();
  });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password").populate('favorites.article'); // Populate favorites
  } catch (err) {
    return next(new HttpError("Fetching users failed, please try again later.", 500));
  }

  const usersWithFavoritesCount = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    favoritesCount: user.favorites.length,// Count of favorites
    favorites: user.favorites
    
  }));

  res.json({ users: usersWithFavoritesCount });
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

  if (hasUser) return next(new HttpError("User already exists", 422));

  // Create a new user
  const newUser = new User({
    name,
    email,
    password, // You should hash the password in a real application for security
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Something went wrong while saving the user", 500));
  }

  // Generate JWT Token after user is created
  const token = jwt.sign(
    { userId: newUser.id }, // Payload for the token (user id)
    process.env.JWT_SECRET_KEY, // Secret key to sign the token
    { expiresIn: '2h' } // Expiration time (e.g., 2 hours)
  );

  // Return response with token and user details
  res.status(201).json({
    message: "User created successfully!",
    token: token,
    userId: newUser.id
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again later.", 500));
  }

  if (!hasUser || hasUser.password !== password) {
    return next(new HttpError("Logging in failed, wrong credentials.", 401));
  }

  // Create JWT token
  const token = jwt.sign(
    { userId: hasUser.id }, // Token payload (in this case, user id)
    process.env.JWT_SECRET_KEY, // Secret key for signing the token
    { expiresIn: '2h' } // Token expiration time (e.g., 2 hours)
  );

  // Instead of logging the token or userId, simply respond with the necessary data
  res.status(200).json({
    message: "Logged in successfully",
    token: token, // Send token but do not log it
    userId: hasUser.id  // Send userId as part of the response, not logged
  });
};
const getCurrentUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userData.userId).select('-password'); // Exclude password
  } catch (err) {
    return next(new HttpError('Fetching user failed, please try again later.', 500));
  }

  if (!user) {
    return next(new HttpError('User not found.', 404));
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const updateCurrentUser = async (req, res, next) => {
  const { name, password } = req.body;

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(new HttpError('Fetching user failed, please try again later.', 500));
  }

  if (!user) {
    return next(new HttpError('User not found.', 404));
  }

  if (name) {
    user.name = name;
  }

  if (password) {
    user.password = password; // Update password without hashing
  }

  try {
    await user.save();
  } catch (err) {
    return next(new HttpError('Updating user failed, please try again later.', 500));
  }

  res.status(200).json({ message: 'User updated successfully!' });
};

exports.updateCurrentUser = updateCurrentUser;
exports.getCurrentUser = getCurrentUser;

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;
exports.authJWT = authJWT;

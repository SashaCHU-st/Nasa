const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Article = require("../models/articles");

const addFavorite = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { nasa_id, title, description, image } = req.body;
  const userId = req.userData.userId;

  if (!userId) {
    return next(new HttpError('Authentication error: User ID is required.', 401));
  }

  let article;
  try {
    // Check if the article already exists
    article = await Article.findOne({ nasa_id });
    if (!article) {
      // Create a new article if it doesn't exist
      article = new Article({
        nasa_id,
        title: title || "Untitled Article",
        description: description || "No description available.",
        image: image || "default-image-url.jpg",
        userId,
      });
      await article.save();
    }
  } catch (err) {
    console.error('Error fetching or creating article:', err);
    return next(new HttpError('Fetching or creating article failed, please try again.', 500));
  }

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('Could not find user for provided id.', 404));
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    return next(new HttpError('Fetching user failed, please try again later.', 500));
  }

  if (user.favorites.includes(article._id)) {
    return next(new HttpError('Article already in favorites.', 400));
  }

  user.favorites.push(article._id);

  try {
    await user.save();
  } catch (err) {
    console.error('Error saving user:', err);
    return next(new HttpError('Adding favorite failed, please try again.', 500));
  }

  res.status(200).json({ message: 'Article added to favorites.', user: user.toObject({ getters: true }) });
};



const getFavorites = async (req, res, next) => {
  const userId = req.userData.userId; // Use req.userData set by authJWT middleware

  let user;
  try {
    user = await User.findById(userId).populate('favorites');
    if (!user) {
      return next(new HttpError('Could not find user for provided id.', 404));
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    return next(new HttpError('Fetching user failed, please try again later.', 500));
  }

  res.status(200).json({ favorites: user.favorites });
};

const deleteFavorite = async (req, res, next) => {
  const userId = req.userData.userId;
  const { articleId } = req.params;

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('Could not find user for provided id.', 404));
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    return next(new HttpError('Fetching user failed, please try again later.', 500));
  }

  // Remove the article from the user's favorites
  user.favorites.pull(articleId);

  try {
    await user.save();
  } catch (err) {
    console.error('Error saving user:', err);
    return next(new HttpError('Removing favorite failed, please try again.', 500));
  }

  res.status(200).json({ message: 'Article removed from favorites.', user: user.toObject({ getters: true }) });
};
const getUserFavorites = async (req, res, next) => {
  const { userId } = req.params;

  let user;
  try {
    user = await User.findById(userId).populate('favorites');
    if (!user) {
      return next(new HttpError('Could not find user for provided id.', 404));
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    return next(new HttpError('Fetching user failed, please try again later.', 500));
  }

  res.status(200).json({ favorites: user.favorites });
};

exports.getUserFavorites = getUserFavorites;
exports.deleteFavorite = deleteFavorite
 exports.addFavorite = addFavorite;
 exports.getFavorites = getFavorites;
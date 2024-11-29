// article-routes.js
const express = require('express');
const router = express.Router();
const articleControllers = require('../controllers/article-controllers');
const { authJWT } = require('../controllers/user-controllers');

router.post('/:uid', authJWT, articleControllers.addFavorite);
router.get('/:uid/favorites', authJWT, articleControllers.getFavorites);
router.delete('/:uid/favorites/:articleId', authJWT, articleControllers.deleteFavorite);

module.exports = router;
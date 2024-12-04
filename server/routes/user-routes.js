const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user-controllers')
const {check} = require('express-validator')
const {authJWT} = require('../controllers/user-controllers')
 
router.get('/',userControllers.getUsers);


router.post('/signup',
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({min:6})
    ],
    userControllers.createUser
)
router.post('/login', userControllers.login)
router.get('/me', authJWT, userControllers.getCurrentUser);

router.patch('/me', authJWT,
  [
    check("name").optional().not().isEmpty(),
    check("password").optional().isLength({ min: 6 })
  ],
  userControllers.updateCurrentUser
);



module.exports = router// импортируем все
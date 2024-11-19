const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user-controllers')
const {check} = require('express-validator')


router.get('/', userControllers.getUsers);

router.post('/signup',
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({min:6})
    ],
    userControllers.createUser
)
router.post('/login', userControllers.login)

module.exports = router// импортируем все
const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user-controllers')
const {check} = require('express-validator')
const {authJWT} = require('../controllers/user-controllers')
 
/// Routers just continuing gives adress to specific action. For example in this case '/' will 
// will be https://...../api/users/ => will show all users 
// for  signup https://...../api/users/signup will send to signup page etc...
router.get('/',userControllers.getUsers);
router.post('/signup',
    [
        check("name").not().isEmpty(), // cannot be empty
        check("email").normalizeEmail().isEmail(),//have to be email
        check("password").isLength({min:6})//length min 6
    ],
    userControllers.createUser
)
router.post('/login', userControllers.login)
router.get('/me', authJWT, userControllers.getCurrentUser);// here added authJWT , bevause we need to be sure that user authorised and can have access to requested data

router.patch('/me', authJWT,
  [
    check("name").optional().not().isEmpty(),// optional() =>not must to change
    check("password").optional().isLength({ min: 6 })
  ],
  userControllers.updateCurrentUser
);



module.exports = router// import everything
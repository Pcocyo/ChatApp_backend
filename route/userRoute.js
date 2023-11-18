const router = require('express').Router()
const {register,login,findUser} = require('../controller/userController')


router.post('/register',register)
router.post('/login',login)
router.post('/findUser',findUser)
module.exports = router
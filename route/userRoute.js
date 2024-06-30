const router = require('express').Router()
const {register,login,findUser} = require('../controller/userController')

router.get('/test',(req,res)=>{
    res.send({m:'hello'})
})
router.post('/register',register)
router.post('/login',login)
router.post('/findUser',findUser)
module.exports = router
const router = require('express').Router()
const {createConversation,getConversation} = require('../controller/conversationController')


router.post('/createConversation',createConversation)
router.post('/getConversation',getConversation)
module.exports = router
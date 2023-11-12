const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())



const port = 8080
const mongoDbPort = 'mongodb://localhost:27017/ChatMeUp'
app.listen(port,()=>{
    console.log(`listen to ${port}`)
})
mongoose.connect(mongoDbPort)
    .then(console.log('MongoDb Connected'))
    .catch((e)=>{
        console.log('error detected')
        console.log(e.message)
    })
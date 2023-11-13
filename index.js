const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const userRoute = require('./route/userRoute')
app.use(express.json())
app.use(cors())

app.use('/api/user',userRoute)

const port = 8080
const mongoDbPort = 'mongodb://127.0.0.1:27017/ChatMeUp'
app.listen(port,()=>{
    console.log(`listen to ${port}`)
})
mongoose.connect(mongoDbPort)
    .then(console.log('MongoDb Connected'))
    .catch((e)=>{
        console.log('error detected')
        console.log(e.message)
})
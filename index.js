const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http');
const socketIo = require('socket.io');

const app = express()
const tokenMiddleware = require('./middleware/TokenVerify')
const userRoute = require('./route/userRoute')
const conversationRoute= require('./route/conversationRouter')
const messageRoute = require('./route/messageRouter')
app.use(express.json())
app.use(cors())
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your React app's origin
      methods: ["GET", "POST"]
    }
  });

app.use('/api/user',userRoute)
app.use('/api/conversation',tokenMiddleware,conversationRoute)
app.use('/api/message',tokenMiddleware,messageRoute)

io.on('connection', (socket) => {
    console.log('A user connected');
    // Listen for the "join" event to join a specific room
    socket.on('join', (room) => {
        socket.join(room)
        console.log('user join a room')
    });

    // Listen for messages from the client
    socket.on('message', (data) => {
        //console.log(`Message from client in room ${room}: ${message}`);
        console.log(data)
        // Broadcast the message to all clients in the room
        socket.to(data.conversation_id).emit('message', data);
    });

    socket.on('leave', (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
      });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = 8080
const mongoDbPort = 'mongodb+srv://joshuaelson46:h2T54T1nVnN3zDPA@cluster0.vonmdjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
server.listen(port,()=>{    
    console.log(`listen to ${port}`)
})


mongoose.connect(mongoDbPort,{
    serverSelectionTimeoutMS: 60000
})
    .then(console.log('MongoDb Connected'))
    .catch((e)=>{
        console.log('error detected')
        console.log(e.message)
})



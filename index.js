const express=require('express')
const bodyParser=require('body-parser')
const cors =require('cors')
const morgan =require('morgan')
const path = require('path');
const http = require('http');
const app=express()
// const server = http.createServer(app)
// const io = require('socket.io')(server)
require("dotenv").config(); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
const mongoose = require('mongoose')
const uri=process.env.uri
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('err', () => { console.log('connection failed') });
mongoose.connection.on('ok', () => { console.log('connection done') })
const UserRoute=require('./routes/userRoutes')
const CategoryRoute=require('./routes/CategoryRoute')
const subCategory=require('./routes/SubCatRoute')
const productRoute=require('./routes/productRoute')
const PanierRoute=require('./routes/panierRoute')
const commentRoute=require('./routes/CommentRoute')
app.use('/comment',commentRoute)
app.use('/panier',PanierRoute)
app.use('/subcategory',subCategory)
app.use('/category',CategoryRoute)
app.use('/user',UserRoute)
app.use('/product',productRoute)
let port=process.env.PORT
let host=process.env.HOST
const server = http.createServer(app)
const io = require('socket.io')( server, {
    cors: {
      origin: "http://localhost:4200",
      credentials: true
    }
  });
server.listen(port, () => {

    console.log("server is listenning on 3000");    
    io.on('connection', (socket) => {
        socket.on('connect-server',(token)=>{
        })
        socket.on('panier_created',(message)=>{
            socket.broadcast.emit('panier_created_client',({message:message}));
        })

    })})
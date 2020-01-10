import express from "express"
import bp from "body-parser"
import DbContext from "./db/dbconfig"
import Socket from './socket/SocketService'
import cors from 'cors'

//Import Routes
import ProductController from './Controllers.js/ProductController'

//create server & socketServer 
const server = express();
const socketServer = require("http").createServer(server);
const io = require("socket.io")(socketServer);
const port = 3000

//Connect to Db and Socket
DbContext.connect()
Socket.setIO(io)

//Configure and Register Middleware (cors, body-parser)
var whitelist = ['http://localhost:8080'];
var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
server.use(cors(corsOptions))
server.use(bp.json())

//Register Routes
server.use('/api/products', new ProductController().router)


//Default Error Handler
server.use((error, req, res, next) => {
    res.status(error.status || 400).send(error)
})

//Start Server
socketServer.listen(port, () => {
    console.log("Server running on port:", port)
})
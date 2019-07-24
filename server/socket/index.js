class Socket {
    setIO(io) {
        this.io = io
        this.rooms = {}
        //Server listeners 
        io.on("connection", socket => this.newConnection(socket));
        io.on("join", data => this.joinRoom(data))
    }
    newConnection(socket) {
        //Handshake / Confirmation of Connection
        socket.emit("CONNECTED", {
            socket: socket.id,
            message: "Successfully Connected"
        });
    }
    joinRoom(data) {
        this.io.join(data.boardId);
    }
    leaveRoom(data) {
        this.io.leave(data.boardId);
    }

    notifyBoard(list) {
        this.io.to(list.boardId).emit('list', list)
    }


    notifyBid(product) {
        this.io.emit('bid', product)
    }
    notifyDelete(productId) {
        this.io.emit('delete', { _id: productId })
    }
}


const socket = new Socket();


module.exports = socket


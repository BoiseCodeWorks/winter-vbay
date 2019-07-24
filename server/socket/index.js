

class Socket {
    setIO(io) {
        this.io = io
        io.on("connection", socket => {
            //Handshake / Confirmation of Connection
            socket.emit("CONNECTED", {
                socket: socket.id,
                message: "Successfully Connected"
            });
        });
    }
    notifyBid(product) {
        this.io.emit('bid', product)
    }
}


const socket = new Socket();


module.exports = socket


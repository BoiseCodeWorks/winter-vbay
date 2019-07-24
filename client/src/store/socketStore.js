import io from 'socket.io-client'

let socket = {};

export default {
    actions: {
        initalizeSocket({ commit, dispatch }) {
            //establish connection with socket
            socket = io('//localhost:3000')
            //Register all listeners
            socket.on('CONNECTED', data => {
                console.log('Connected to socket')
            })

            socket.on('bid', data => {
                commit('updateProduct', data)
            })

        }
    }
}
import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', err => {
    console.error('[DATABASE ERROR]:', err)
})

const connectionString = "mongodb+srv://student:student123@classroom-afyyj.mongodb.net/auctionhouse?retryWrites=true&w=majority"

export default class DbContext {
    static async connect() {
        try {
            let status = await mongoose.connect(connectionString)
            console.log("CONNECTED")
            return status
        } catch (e) {
            console.error(e)
        }
    }
}
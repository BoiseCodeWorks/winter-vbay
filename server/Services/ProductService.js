import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imgUrl: { type: String }
}, { timestamps: true })

export default mongoose.model('Product', _schema)
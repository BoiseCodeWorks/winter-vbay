import express from 'express'
import _productService from '../Services/ProductService'
import socket from '../socket/index'

//PUBLIC
export default class ProductsController {
    constructor() {
        this.router = express.Router()
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id/bid', this.bid)
            .delete('/:id', this.delete)
            .use(this.defaultRoute)
    }

    defaultRoute(req, res, next) {
        next({ status: 404, message: 'No Such Route' })
    }

    async getAll(req, res, next) {
        try {
            //only gets boards by user who is logged in
            let data = await _productService.find({})
            return res.send(data)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let data = await _productService.findOne({ _id: req.params.id })
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            let data = await _productService.create(req.body)
            //notify sockets of a change
            socket.notifyBid(data)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async bid(req, res, next) {
        try {
            //only change allowed is a bid
            let newBid = {
                price: req.body.price
            }
            let data = await _productService.findOneAndUpdate({ _id: req.params.id }, newBid, { new: true })
            if (data) {
                //notify sockets of new bid
                socket.notifyBid(data)
                return res.send(data)
            }
            throw new Error("invalid id")
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await _productService.findOneAndRemove({ _id: req.params.id })
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}
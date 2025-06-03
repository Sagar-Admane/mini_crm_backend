import Order from "../models/orders.js";

async function createOrder(req, res){
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({order}, {id : order._id});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

export {createOrder};
import Customer from "../models/customer.js";
import addToStream from "../redis/index.js";

async function createCustomer(req, res){
    try {
        const {f} = req.body;

        const form = JSON.parse(f);

        const name = form.name;
        const email = form.email;
        const totalSpend = form.totalSpend;
        const visits = form.visits;
        const lastActive = form.lastActive;

        await addToStream('customers_stream', {
            name,
            email,
            totalSpend,
            visits,
            lastActive
        });
        console.log("Saved to redis stream")
        res.status(200).json({message : "successfully saved to redis stream"});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

export {createCustomer}
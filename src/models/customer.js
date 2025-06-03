import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        requried : true
    },
    totalSpend : {
        type : Number,
        default : 0
    },
    visits : {
        type : Number,
        default : 0
    },
    lastActive : {
        type : Date
    }
}, {timestamps : true});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
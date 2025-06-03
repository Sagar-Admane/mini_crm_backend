import mongoose from "mongoose"

const communicationSchema = mongoose.Schema({
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    }, 
    campaignId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Campaign',
        required : true
    },
    message : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ['SENT', 'FAILED'],
        required : true
    }
});

const Communication = mongoose.model('CommunicationLogs', communicationSchema);

export default Communication
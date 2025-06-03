import mongoose from "mongoose";

const campaignSchema = mongoose.Schema({
    rules : Array,
    audienceSize : Number,
    sent : Number,
    failed : Number,
    createdAt :  {type : Date, default : Date.now}
})

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign
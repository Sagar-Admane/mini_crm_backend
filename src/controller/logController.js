import Communication from "../models/communicationModel.js";

async function getLogsByCampaign(req, res){
    try {
        const logs = await Communication.find({campaignId : req.params.campaignId}).populate('customerId', 'name email');
        res.json(logs);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

export {getLogsByCampaign}
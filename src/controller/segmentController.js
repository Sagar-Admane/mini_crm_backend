import axios from "axios";
import Campaign from "../models/campaignSchema.js";
import Communication from "../models/communicationModel.js";
import Customer from "../models/customer.js";
import queryBuilder from "../utils/queryBuilder.js";

async function viewAudience(req, res){
    const {rules} = req.body;

    if(!rules){
        return res.status(400).json({error : "No rules found"});
    }

    try {
        const query = queryBuilder(rules);
        console.log(query);
        const c = await Customer.countDocuments(query);
        console.log(c);
        res.json({cutomers : c});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

async function saveCampaign(req, res){
    const {rules} = req.body;

    if(!rules){
        return res.status(400).json({error : "No rules found"});
    }

    try {
        const query = queryBuilder(rules);
        const customers = await Customer.find(query);

        const deliveryLogs = [];

        for(const customer of customers){
            const msg = `Hi ${customer.email}, here's 10% off on your next order!`;

            try {
                const vendorRes = await axios.post(`http://localhost:3001/vendor/send`, {
                    to : customer.email,
                    message : msg
                });

                deliveryLogs.push({
                    customerId : customer._id,
                    campaignId : null,
                    status : vendorRes.data.status,
                    message : msg,
                    timestamp : new Date()
                });
            } catch (error) {
                console.log(error.message);
                deliveryLogs.push({
                    customerId : customer._id,
                    campaignId : null,
                    status : 'FAILED',
                    message : msg,
                    timestamp : new Date()
                });
            }
        }

        



        const sent = customers.filter(r => r.status==='SENT').length;
        const failed = customers.length - sent;

        const campaign = await Campaign.create({
            rules,
            audienceSize : customers.length,
            sent,
            failed
        });

        const logEntries = deliveryLogs.map(log => ({
            ...log,
            campaignId : campaign._id
        }))

        await Communication.insertMany(logEntries)

        res.status(201).json({message : 'campaign created and message sent' ,campaign : campaign, logsSaved : logEntries.length});

    } catch (error) {
        res.status(500).json({error : error.message});
    }

}

async function getHistory(req, res){
    try {
        const result = await Campaign.find().sort({created_at : -1});
        console.log(result);
        res.json({result}); 
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

export {viewAudience, saveCampaign, getHistory}
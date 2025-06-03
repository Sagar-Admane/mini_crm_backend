import Redis from "ioredis";
import Customer from "../models/customer.js";
import mongoose from "mongoose";
import env from "dotenv"

async function worker(){

env.config({path : "../../.env"});
const redis = new Redis({
    host : "redis-14098.c9.us-east-1-2.ec2.redns.redis-cloud.com",
    password : "O0XcdHk48hUWbwI6omoiB74hy5ZfmOe2",
    port : 14098
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongodb connected");
}).catch(err => console.log(err));

const stream = 'customers_stream';
const group = 'crm_group';
const consumer = 'crw_worker';

(async() => {
    try {
        await redis.xgroup('CREATE',stream,group,'$','MKSTREAM');
    } catch (error) {
        if(!error.message.includes('BUSYGROUP')) console.error(error);
    }
})();

console.log('Listening new customer . . .');

while(true){
    try {
        const result = await redis.xreadgroup(
            'GROUP', group, consumer,
            'BLOCK', 5000,
            'COUNT', 10,
            "STREAMS", stream, '>'
        );

        if(result){
            for(const [, messages] of result) {
                for(const [id, fields] of messages) {
                    const customer = {};
                    for(let i=0; i<fields.length; i+=2) {
                        customer[fields[i]] = fields[i+1];
                    }

                    try {
                        await Customer.create(customer);
                        await redis.xack(stream, group, id);
                        console.log(`Saved customer ${customer.email} `);
                    } catch (error) {
                        console.error(error.message);
                    }
                }
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

}

export default worker;
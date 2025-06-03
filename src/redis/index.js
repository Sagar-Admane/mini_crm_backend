import Redis from "ioredis"

const redis = new Redis({
    host : "redis-14098.c9.us-east-1-2.ec2.redns.redis-cloud.com",
    password : "O0XcdHk48hUWbwI6omoiB74hy5ZfmOe2",
    port : 14098
});

async function addToStream(stream, data){
    try {
        await redis.xadd(stream, '*', ...Object.entries(data).flat());
        console.log(`Published to stream  : ${stream}`);
    } catch (error) {
        console.error(`Failed to publish : ${error.message}`);
    }
}

export default addToStream;
import axios from "axios"
import OpenAI from "openai"
import env from "dotenv"
env.config();

async function generateMessage(req, res){
    const {obj} = req.body;
    if(!obj){
        res.status(400).json({message : "Campaign objective required"});
    }

    const prompt = `Generate 3 short marketing messages to achieve this goal: "${obj}". Keep each under 100 characters. Don't add any extra message or response, just 3 points`

    const openai = new OpenAI({
        baseURL : "https://openrouter.ai/api/v1",
        apiKey : process.env.AI_KEY
    });

    try {
        const completion = await openai.chat.completions.create({
            model : "deepseek/deepseek-chat-v3-0324:free",
            messages : [
                {
                    "role" : "user",
                    "content" : prompt 
                }
            ]
        });

        console.log(completion.choices[0].message);
        const reply = completion.choices[0].message.content;
        console.log(reply);
        const messages = reply.split('\n').filter(line => line.trim()).map(line => line.replace(/^\d+\.?\s*/, ''));
        res.json({messages});
    } catch (error) {
        console.log(error.message);
    }

}

export {generateMessage}
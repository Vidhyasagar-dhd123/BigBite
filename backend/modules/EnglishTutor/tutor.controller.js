import { aiResponse } from "../ChatAI/chat.services.js";


const getExplanation = async (req, res) =>
{
    try
    {
        const {query} = req.body;
        //Find the mistakes using AI
        const systemInstruction = "Please find out the mistakes in the sejtences provided by user.";
        //const response = await aiResponse(query,systemInstruction)
        const response = `The error in '${query}' is something!!!`
        res.json({query, response})
    }
    catch(err)
    {
        console.log(err)
    }
}

export {getExplanation}
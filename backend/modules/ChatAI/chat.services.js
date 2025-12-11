import {GoogleGenAI} from "@google/genai";
import ChatMessage from "./chatMessage.model.js";
import Chat from "./chat.model.js";

//gemini-2.5-flash
const aiResponse = async (message, systemInstruction="", model="gemini-2.5-flash") => 
{
    const client = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY||"AIzaSyAFhs9d7MZjyfW72VVxYqWY2ziYP6UMau0"});
    console.log("Generating content with model:", model);
    console.log(message)
    const response = await client.models.generateContent({
        model,
        contents: message,
        config:{
            systemInstruction,
        }
    });
    console.log(response);
    return response.text;
}

const aiChatResponse = async (message, systemInstruction, model="gemini-2.5-flash", history=[]) => 
{
    //giving contentReunionion error, because of the way history is passed, need to map to parts
    const client = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY||"AIzaSyAFhs9d7MZjyfW72VVxYqWY2ziYP6UMau0"});
    const formattedHistory = history.map(msg=>({role: msg.role, parts: [{text: msg.text}]}));
    console.log(formattedHistory);
   const chat = client.chats.create({
    model: "gemini-2.5-flash",
    history: formattedHistory,
    config:
    {
        systemInstruction
    }
  });

  const response = await chat.sendMessage({
    message,
  });
    console.log(response);
    return response.text;
}

const getMessageByIds = async (ids) => {
    try {
        const messages = await ChatMessage.find({ _id: { $in: ids } });
       return messages;
    } catch (error) {
        console.error("Error fetching messages by IDs:", error);
        throw error;
    }
};


//Delete chat with all messages

const deleteChatPage= async (id)=>{
    try
    {
        if(!id) throw Error("Error Deleting The Chat Page [No ID given] : modules/ChatAI/chat.services")
        const page = await Chat.findByIdAndDelete(id)
        //deleting all pages
        console.log(page)
        await ChatMessage.deleteMany({_id:{$in:page.messages}})
    }
    catch (e)
    {
        console.log(e)
    }
}

export { aiResponse, aiChatResponse, getMessageByIds,deleteChatPage };
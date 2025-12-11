import Chat from "./chat.model.js";
import ChatMessage from "./chatMessage.model.js";
import { aiChatResponse, aiResponse, deleteChatPage } from "./chat.services.js";
const getChats = async (req, res) => {
    try{
        const {chatID} = req.params;
        console.log(`Fetching Chats for Chat ID : ${chatID}`)
        if(chatID){
            const chat = await Chat.findById(chatID).populate('messages');
            if(!chat){
                console.log(`Chat not found for ID : ${chatID}`)
                return res.status(404).json({ error: 'Chat not found' });
            }
            return res.json(chat);
        }
        res.json([]);
    } catch (error) {
        console.error("Error in getChats:", error);
        res.status(500).json({ error: 'Server error' });
    }
}

const createChat = async(req, res) => {
    try{
        // Create a new chat with current timestamp
        const { title } = req.body;
        console.log(`Creating new chat with title: ${title}`);
        const chat = new Chat({
            title,
            messages: []
        });
        const savedChat = await chat.save();
        console.log(`New chat created with ID: ${savedChat._id}`);
        res.status(201).json(savedChat);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error("Error in createChat:", error);
    }
}

const createMessage = async (req, res) => {
    try {
        const { chatID } = req.params;
        const {  message, systemInstructions, history } = req.body;
        if (!chatID || !message) {
            return res.status(400).json({ error: 'chatID and message are required' });
        }
        const chat = await Chat.findById(chatID).populate('messages');
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        // Save user message
        const userMessage = new ChatMessage({ text: message, role: 'user' });
        await userMessage.save();
        chat.messages.push(userMessage);
        // Get AI response
        const aiReplyText = await aiChatResponse(message, systemInstructions, "gemini-2.5-flash", history);
        // Save AI message
        console.log(aiReplyText)
        const aiMessage = new ChatMessage({ text: aiReplyText, role: 'model' });
        await aiMessage.save();
        chat.messages.push(aiMessage);
        await chat.save();
        res.status(201).json(aiMessage);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error("Error in createMessage:", error);
    }
}

const getAllChats=async(req,res)=>{
    try{
        const chats = await Chat.find({});
        res.status(200).json(chats)
    }
    catch(e)
    {
        console.log("Error getting chats",e)
    }
}

const createChatPage = async(req,res)=>{
    try{
        const {pageTitle} = req.body;
        console.log(`Creating Chat Page With Title : ${pageTitle}`);
        const chat = new Chat({title:pageTitle});
        const data = await chat.save()
        console.log(`Chat Page Created With ID : ${data._id}`)
        res.status(201).json(data)
    }
    catch(e)
    {
        console.log(e)
        res.status(404).json({message:"Error"})
    }
}

const deletePage = async (req,res) => {
    try {
        const {id} = req.params
        console.log(`Deleting Chat Page With ID : ${id}`)
        await deleteChatPage(id)
    } catch (e) {
        console.log(e);
    }
}

export {getChats, createChat,createMessage,getAllChats,createChatPage,deletePage}
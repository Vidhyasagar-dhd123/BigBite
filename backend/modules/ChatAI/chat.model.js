import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    title: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],
    //increment automatic unique chatID
}, { timestamps: true });

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    role: { type: String, enum: ['user', 'model'], required: true },
}, { timestamps: true });

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessage;
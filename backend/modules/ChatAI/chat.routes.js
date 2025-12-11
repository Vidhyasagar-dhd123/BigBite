import express from "express";
import {getChats, createChat,createMessage, getAllChats, createChatPage, deletePage} from "./chat.controller.js"

const router = express.Router();

router.get("/chats/:chatID", getChats);
router.post("/chats", createChat);
router.post("/chats/:chatID/messages", createMessage);
router.post("/chats/allChats",getAllChats)
router.post("/chats/createChat",createChatPage)
router.delete("/chats/deleteChat/:id",deletePage)

export default router;
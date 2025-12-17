import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import connectDB from './config/db.config.js';
import todoRoutes from './modules/Todo/todo.routes.js';
import aiChatRoutes from './modules/ChatAI/chat.routes.js';
import notesRoutes from './modules/Notes/notes.routes.js';
import tutorRoutes from './modules/EnglishTutor/tutor.route.js'

dotenv.config();
await connectDB();

const app = express()

const PORT = 3300

app.get("/",(req,res)=>
{
    res.send("PORT is working")
})

app.use(cors());

app.use(express.json());

app.use("/api",todoRoutes)

app.use("/api",aiChatRoutes)

app.use("/api", notesRoutes);

app.use('/api',tutorRoutes)

app.listen(PORT,()=>
{
    console.log("Server is running on 3300")
})
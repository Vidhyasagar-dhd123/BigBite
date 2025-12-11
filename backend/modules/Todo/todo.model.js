import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    page: { type: String, required: true },
    links:[{link:{type:String},name:{type:String}}]
},
{ timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
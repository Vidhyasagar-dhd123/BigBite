import Todo from "./todo.model.js";
import Page from "./page.model.js";
import { createLink } from "./todo.services.js";
const getTodos = async (req, res) => {
    try {
        //get page from req.params
        const page = req.params.page;
        console.log(`Fetching todos for page: ${page}`);
        const todos = await Todo.find({page}, "title completed _id links", { sort: { createdAt: -1 } });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
}

const createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({ title: req.body.title,page:req?.body?.page });
        console.log(`Creating new todo: ${newTodo.title}`);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Error creating todo" });
        console.log(`Error in createTodo: ${error.message}`);
    }
}

const updateTodo = async (req, res) => {
    try {
        const updateData = {};
        if (req?.body?.title !== undefined) updateData.title = req.body.title;
        if (req?.body?.completed !== undefined) updateData.completed = req.body.completed;
        console.log(`Updating todo ID: ${req.params.id} with data: ${JSON.stringify(updateData)}`);
        const updatedTodo = await Todo.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        console.log(`Updated todo ID: ${updatedTodo._id}`);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo" });
        console.log(`Error in updateTodo: ${error.message}`);
    }
}
const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo" });
    }
}

const addPage = async (req, res) => {
    try {
        const {name} = req.body;
        const newPage = new Page({ name });
        console.log("add page");
        await newPage.save();
        res.status(201).json(newPage);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating page" });
    }
}

const getPages = async (req, res) => {
    try {
        console.log("get pages");
        const pages = await Page.find({}, "name _id", { sort: { createdAt: -1 } });
        res.json(pages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pages" });
    }
}

const deletePage = async (req, res) => {
    try {
        if(!req?.params?.id || req.params.id.trim() === ""|| req.params.id==="all") return res.status(400).json({ message: "Page ID is required" });
        const deletedPage = await Page.findByIdAndDelete(req.params.id);
        console.log(`Deleting page with ID: ${req.params.id}`);
        if (!deletedPage) {
            return res.status(404).json({ message: "Page not found" });
        }
        //delete all todos with page name of deleted page
        console.log(`Also deleting todos with page name: ${deletedPage.name}`);
        await Todo.deleteMany({ page: deletedPage.name });
        res.json({ message: "Page deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting page" });
    }
}

const addLink  = async(req,res) =>{
    try
    {
        const link = req.body;
        if(!req.body && !req.params.id) throw Error("Invalid request in Add Link")
        const id = req.params.id;
        console.log(`Adding link to todo ID: ${id}`);
        const todo = await createLink(link,id)
        res.status(200).json(todo)
    }
    catch(e)
    {
        res.status(500).json({message:e.message})
    }
}
export { getTodos, createTodo, updateTodo, deleteTodo, addPage, getPages, deletePage,addLink };
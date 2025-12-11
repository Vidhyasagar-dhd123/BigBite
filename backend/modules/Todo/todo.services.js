import Todo from "./todo.model.js"

const createLink = async(link,id)=>{
    try
    {
        if(!link||!id)
        {
            console.log(link,id)
            throw Error("Link or Id Not Provided!!")
        }
        if(!link.service|| !link.id||!link.name)
        {
            console.log(link)
            throw Error("No Such Service Available")
        }
        if(!(["chat","notes"].includes(link.service.toLowerCase())))
        {
            throw Error("Invalid Service Request")
        }

        const todo = await Todo.findOne({_id:id})
        if(!todo) throw Error("todo has been deleted")
        todo.links.push({link:`/${link.service}/${link.id}`,name:link.name})
        const new_todo = await todo.save();
        return new_todo;
    }
    catch(e)
    {
        console.log("Error in creating Link",e)
    }
}

export {createLink}
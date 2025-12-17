import { useEffect, useState } from "react";
import { TodoDeleteButton, TodoEditButton, TodoCompleteButton } from "../components/TodoBoard"
import { 
    TodoBoard, 
    TodoCards , 
    TodoInputContainer, 
    TodoInput, 
    TodoButton,
    TodoInPlaceInput,
    TodoPageSelector,
    TodoPageOption,
    TodoAddPagePromptBox,
    TodoMoreOptionsButton,
    TodoMoreOptionsCard
} from "../components/TodoBoard"

import { Link } from "react-router-dom";

import { Plus, Trash } from "lucide-react"

export const Todo = ()=>{
    const [todos, setTodos] = useState([
        { _id: 1, title: "Learn React", completed: false },
        { _id: 2, title: "Build a Todo App", completed: true },
        { _id: 3, title: "Master JavaScript", completed: false },
    ]);

    const baseURL = "http://localhost:3300/api/todos"

    const [editableTodo, setEditableTodo] = useState(null);

    const [title, setTitle] = useState("");

    const [editTitle, setEditTitle] = useState("");

    const [page, setPage] = useState("all");

    const [prompt,setPrompt] = useState(false)

    const [newPage,setNewPage] = useState("")

    const [pages,setPages] = useState([])
    
    const [link,setLink] = useState("")

    const [items, setItems] = useState([])

    const [service, setService] = useState("")

    useEffect(() => {
        const fetchPages = async () => {
            const response = await fetch(`http://localhost:3300/api/pages`);
            const data = await response.json();
            setPages(data);
        };
        fetchPages();
    }, []);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch(`http://localhost:3300/api/todos${page ? `/${page}` : ""}`);
            const data = await response.json();
            setTodos(data);
        };
        fetchTodos();
    }, [page]);

    const removeTodo = async (id) => {
        const data = await fetch(`http://localhost:3300/api/todos/${id}`,{
            method:"DELETE"
        });
        const jsonData = await data.json();
        console.log(jsonData);
        if(data.status!==200)
        {
            alert("Error deleting todo")
            return;
        }
        else{
            setTodos(todos.filter(todo => todo._id !== id));
        }
    }

    const addTodo = async(title) => {
        const data = await fetch(`http://localhost:3300/api/todos${page ? `/${page}` : ""}`,{
            method:"POST",
            body:JSON.stringify({title:title,page:page}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const jsonData = await data.json();
        console.log(jsonData);
        if(data.status!==201)
        {
            alert("Error adding todo")
            return;
        }
        else{
            setTodos([jsonData,...todos]);
            setTitle("");
        }
    }
    const toggleComplete = async (id) => {
        const data = await fetch(`http://localhost:3300/api/todos/${id}`,{
            method:"PUT",
            body:JSON.stringify({completed:!todos.find(todo=>todo._id===id).completed}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const jsonData = await data.json();
        console.log(jsonData);
        if(data.status!==200)
        {
            alert("Error updating todo")
            return;
        }
        else{
            setTodos(todos.map(todo => 
                todo._id === id ? {...todo, completed: !todo.completed} : todo
            ));
        }
    }

    const searchTodos = (query) => {
        return todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    const editTodo = async (id) =>{
        const data = await fetch(`http://localhost:3300/api/todos/${id}`,{
            method:"PUT",
            body:JSON.stringify({title:editTitle}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const jsonData = await data.json();
        console.log(jsonData);
        if(data.status!==200)
        {
            alert("Error updating todo")
            return;
        }
        else{
            setTodos(todos.map(todo => 
                todo._id === id ? {...todo, title: editTitle} : todo
            ));
        }
        setEditableTodo(null);
        setEditTitle("");
    }

    const addPage = async() =>{
        const data = await fetch(`http://localhost:3300/api/addpage`,{
            method:"POST",
            body:JSON.stringify({name:newPage}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const jsonData = await data.json();
        console.log(jsonData);
        if(data.status!==201)
        {
            alert("Error adding page")
            return;
        }
        else{
            setPages([jsonData,...pages]);
            setNewPage("");
            setPrompt(false);
        }
    }

    const deletePage = async() =>{
        //get Id from page name
        const pageId = pages.find(p => p.name === page)?._id;
        const data = await fetch(`http://localhost:3300/api/deletePage/${pageId}`,{
            method:"DELETE"
        });
        const jsonData = await data.json();
        console.log(jsonData);
        if(data.status!==200)
        {
            alert("Error deleting page")
            return;
        }
        else{
            setPages(pages.filter(p => p._id !== pageId));
            setPage("all");
        }
    }

    const handleMoreOptions = (todo,e) => {
        const card = e.currentTarget.nextSibling;
        if (card.classList.contains("hidden")) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    }

    const handleSetLink=async (id)=>{
            console.log(link)
        const data = await fetch(`http://localhost:3300/api/todos/${id}/addLink`,{
            method:"POST",
            body:JSON.stringify({service,id:link._id,name:link.title}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const jsonData = await data.json();
        console.log(jsonData)
    }

    useEffect(() => {
        if (editableTodo) {
            setEditTitle(editableTodo.title);
        }
    }, [editableTodo]);

    useEffect(() => {
        if(service==="chat")
        (async () => {
          try {
            const res = await fetch(`http://localhost:3300/api/chats/allChats`, {
              method: "POST",
              headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            console.log(data)
            setItems(data);
          } catch {
            console.log("Error")
          }
        })();

        if(service==="notes")
        (()=>{console.log("notes");setItems([])})();
      }, [service]);

    return (
        <>
            <div className="flex flex-col items-center bg-blue-400 min-h-screen">  
                <div className="w-full flex justify-start px-4 mt-10 items-center">
                    <TodoPageSelector onChange={(e) => setPage(e.target.value)} value={page}>
                        <TodoPageOption value="all">All</TodoPageOption>
                        {pages.map((p) => (
                            <TodoPageOption key={p._id} value={p.name}>{p.name}</TodoPageOption>
                        ))}
                    </TodoPageSelector>
                    <TodoButton onClick={() => {setEditableTodo(null); setEditTitle(""); deletePage()}}><Trash className="inline"/></TodoButton>
                    <TodoButton onClick={() => {setEditableTodo(null); setEditTitle(""); setPrompt(true);}}><Plus className="inline"/>Add Page</TodoButton>
                </div>
                {prompt&&<TodoAddPagePromptBox>
                    <div className="bg-white m-4 p-4 rounded w-full max-w-xl">
                        <h2 className="text-lg mb-2">Add New Page</h2>
                        <input onChange={(e) => setNewPage(e.target.value)} type="text" className="border-2 border-gray-300 p-2 rounded w-full outline-none mb-2" placeholder="Page Name"/>
                        <div className="flex justify-end">
                            <TodoButton onClick={() => { addPage()}}>Add</TodoButton>
                            <TodoButton onClick={() => {setPrompt(false)}}>Cancel</TodoButton>
                        </div>
                    </div>
                </TodoAddPagePromptBox>}
                <TodoInputContainer>
                    <TodoInput placeholder="Add a new task..." value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TodoButton onClick={() => addTodo(title)}>Add</TodoButton>
                </TodoInputContainer>
                <TodoBoard>
                    {todos.map(todo => (
                        <TodoCards key={todo._id}>
                            <TodoCompleteButton task={todo} onClick={() => toggleComplete(todo._id)} />
                            {editableTodo && editableTodo._id === todo._id ? (
                                <><TodoInPlaceInput 
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <TodoButton onClick={() => editTodo(editableTodo._id)}>Save</TodoButton></>
                            ) : (
                                <div className="flex-grow text-sm md:text-lg">{todo.title}</div>
                            )}
                            <TodoEditButton onClick={() => setEditableTodo(todo)} />
                            <TodoDeleteButton onClick={() => removeTodo(todo._id)} />
                            <TodoMoreOptionsButton onClick={(e) => handleMoreOptions(todo,e)} />
                            <TodoMoreOptionsCard >
                                <div className="flex flex-col">
                                    
                                    {
                                        todo.links && todo.links.map((link,key) => (
                                            <Link to={link.link} key={key} className="text-blue-500 hover:underline border rounded text-center p-2 m-1">{link.name}</Link>))

                                    }
                                    <select className="m-4" onChange={(e)=>{setService(e.target.value)}}>
                                        <option value="">==Select==</option>
                                        <option value={"notes"}>Notes</option>
                                        <option value={"chat"}>Chat</option>
                                    </select>
                                    <select className="m-4" onChange={(e)=>{setLink(JSON.parse(e.target.value))}}>
                                        <option value="">==Select==</option>
                                        {items && items.map((value,key)=>{
                                            return <option className="max-w-20 overflow-auto" value={JSON.stringify(value)} key={key}>{value.title}</option>
                                        })
                                        }
                                    </select>
                                    
                                    <TodoButton className="bg-blue-500 text-white w-auto p-2 rounded hover:bg-blue-600" onClick={() => handleSetLink(todo._id)}>Add Link</TodoButton>
                                </div>
                            </TodoMoreOptionsCard>
                        </TodoCards>
                    ))}
                </TodoBoard>
            </div>
        </>
    )
}



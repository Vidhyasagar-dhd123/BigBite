
import {useEditor,Editable} from "@wysimark/react";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../Examples/sidebar";
import NotesBreadCrumb from "../components/NotesBreadCrumb";
import { TrashIcon, Calendar } from "lucide-react";

const Notes = () => {
    const [markdown, setMarkdown] = useState("# Welcome to Notes\n\n---\n\n Start writing your note here...");
    const [title, setTitle] = useState("New Note");
    const {chapterID} = useParams();
    const [newNoteTitle,setNewNoteTitle]=useState("");
    const [notes,setNotes]=useState([]);
    const { id } = useParams();
    const baseURL = "http://localhost:3300/api";
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const res = await fetch(`${baseURL}/chapters/${chapterID}/notes`);
            const data = await res.json();
            setNotes(data);
            console.log("Fetched notes:", data);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [chapterID]);

    useEffect(() => {
        if (id && id !== "new") {
            fetchNote(id);
        }
    }, [id]);

    const handleSave = async () => {
        // Implement save functionality here
        if (id === "new") {
            await createNote();
            return;
        }
        try {
            const res = await fetch(`${baseURL}/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: markdown, title })
            });
            if (!res.ok) {
                throw new Error("Failed to save note");
            }
            const data = await res.json();
            setTitle(data.title);
            setMarkdown(data.content);
            console.log("Note saved successfully:", data);
        } catch (error) {
            console.error("Error saving note:", error);
        }
    }

    const createNote = async () => {
        if(!newNoteTitle || newNoteTitle.trim()==="")
            return;
        try {
            const res = await fetch(`${baseURL}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title:newNoteTitle, content: `# ${newNoteTitle}`, chapter: chapterID })
            });
            if (!res.ok) {
                throw new Error("Failed to create note");
            }
            const data = await res.json();
            setNotes((prev) => [data, ...prev]);
            console.log("Note created successfully:", data);
            navigate(`/notes/${chapterID}/${data._id}`);
        }
        catch (error) {
            console.error("Error creating note:", error);
        }
    }

    const fetchNote = async (noteId) => {
        try {
            const res = await fetch(`${baseURL}/notes/${noteId}`);
            const data = await res.json();
            setMarkdown(data.content);
            setTitle(data.title);
        } catch (error) {
            console.error("Failed to fetch note:", error);
        }
    }

    const renderNotesList = useMemo(() => {
        return notes.map((note) => (
            <div key={note._id} className="p-2 border-b border-gray-200 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                <Link to={`/notes/${chapterID}/${note._id}`}><h3>{note.title}</h3></Link>
                <button onClick={async (e)=>{
                    e.stopPropagation();
                    try {
                        await fetch(`${baseURL}/notes/${note._id}`, {
                            method: "DELETE"
                        });
                        setNotes((prev)=>prev.filter((n)=>n._id!==note._id));
                    } catch {
                        console.log("Failed to delete note");
                    }
                }}> <TrashIcon className="w-5 h-5 text-gray-300 hover:text-red-500" /> </button>
            </div>
        ));
    }
    , [notes]);

    return (
        <div className=" flex flex-col items-center relative">
            <div className="min-h-[100svh] h-full max-w-6xl w-full">
                <div className="flex justify-between p-4">
                <Sidebar title={notes[0]?.chapter?.title}>
                    {renderNotesList}
                    <input type="text" placeholder="New Note Title" value={newNoteTitle} onChange={(e)=>setNewNoteTitle(e.target.value)} className="w-full p-2 rounded mt-4" />
                    <button onClick={async ()=>{
                        setTitle(newNoteTitle);
                        await createNote();
                    }} className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700">Create Note</button>
                </Sidebar>
                <h1 className="text-2xl font-bold mb-4">
                    <NotesBreadCrumb chapterId={chapterID} data={[{_id:notes[0]?.chapter?.subject, chapters: [{_id: chapterID, title:notes[0]?.chapter?.title}]}]} />
                </h1>
                </div>
                <WysimarkExample value={markdown} setValue={setMarkdown} className="mt-4 ! h-full" />
                <div>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleSave}>Save Note</button>
                </div>
            </div>
        </div>
    );
}

export default Notes;


function WysimarkExample({value,setValue}) {
  const editor = useEditor({
    initialMarkdown: value,
    onChange: (markdown) => {
      setValue(markdown);
    },
    // other options
  });


  return <>
  <Editable className="h-full max-h-[100svh] min-h-[80svh] " editor={editor} value={value} onChange={setValue}/>
  </>;
}
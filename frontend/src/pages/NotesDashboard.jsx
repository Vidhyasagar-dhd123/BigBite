
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrashIcon, Calendar } from "lucide-react";
import Sidebar from "../Examples/sidebar";
import NoteCard from "../components/NoteCard";
import Breadcrumb from "../components/NotesBreadCrumb";

const NotesDashboard = () => {
    const [chapters, setChapters] = useState([]);
    const [newChapterTitle, setNewChapterTitle] = useState("");
    const [subject, setSubject] = useState("General");
    const [notes,setNotes]=useState([]);
    const { id } = useParams();
    const baseURL = "http://localhost:3300/api";
    const navigate = useNavigate();

    const handleCreateChapter = async (e) => {
        if (e.key === "Enter" && newChapterTitle.trim() !== "") {
            try {
                const res = await fetch(baseURL + "/chapters", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title: newChapterTitle, subject })
                });
                if (!res.ok) {
                    throw new Error("Failed to create chapter");
                }
                const data = await res.json();
                if(chapters.length===0 || !chapters.some(group=>group._id===data.subject)){
                    setChapters((prev)=>[...prev,{_id:data.subject, chapters:[data]}])
                }
                else
                setChapters((prev) => prev.map((group,idx) => {
                    if (group._id === data.subject) {
                        return { ...group, chapters: [...group.chapters, data] };
                    }
                    return group;
                }));
                setNewChapterTitle("");
                console.log("Chapter created successfully:", data);
            } catch (error) {
                console.error("Error creating chapter:", error);
            }
        }
    }

    

    const fetchChapters = async () => {
        try {
            const res = await fetch(`${baseURL}/chapters`);
            const data = await res.json();
            setChapters(data);
            console.log("Fetched chapters:", data.flat());
        } catch (error) {
            console.error("Failed to fetch chapters:", error);
        }
    }

    const fetchRecentNotes = async () => {
        try
        {
            const res = await fetch(`${baseURL}/notes/service/recent`);
            if(!res.ok)
            {
                throw new Error("Failed to fetch recent Notes")
            }
            const data = await res.json()
            setNotes(data)
            console.log("Fetched Recent Notes : ",data)
        }
        catch(e)
        {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchChapters();
    }, []);

    useEffect(()=>{
        if(id==="new"){
            fetchRecentNotes()
        }
        else fetchNotesByChapter(id)
    }, [id]);

    const fetchNotesByChapter = async (chapterID) => {
        try {
            const res = await fetch(`${baseURL}/chapters/${chapterID}/notes`);
            if (!res.ok) {
                throw new Error("Failed to fetch notes");
            }
            const data = await res.json();
            setNotes(data);
            console.log("Fetched notes:", data);
            // Handle the fetched notes as needed
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    const renderChapterList = useMemo(() => {
        console.log("Rendering chapter list:", chapters);
        return chapters.map((group) => (
          <div key={group._id} className="">
            <div className={`text-sm font-bold p-2 text-blue-600 bg-blue-50 ${subject === group._id ? "bg-gray-200" : ""}`} onClick={()=>setSubject(group._id)}>
                {group._id}</div>
            {group.chapters.map((chapter) => (
                <div
                      key={chapter._id}
                      onClick={() => navigate(`/notes/${chapter._id}`)}
                      className="p-2 border-b text-md cursor-pointer hover:bg-gray-100 flex justify-between pl-4"
                    >
                      {chapter.title}
                      <button>
                        <TrashIcon
                          className="ml-2 hover:text-red-500 text-gray-300"
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              await fetch(`${baseURL}/chapters/${chapter._id}`, {
                                method: "DELETE"
                              });
                              setChapters((prev) => prev.filter((p) => p._id !== chapter._id));
                            } catch {
                              console.log("Failed to delete chapter");
                            }
                          }}
                        />
                      </button>
                    </div>
            ))}
          </div>
        ));
    }, [chapters,subject]);

  return (
    <div className="w-full flex flex-col min-h-screen items-center relative gap-4">
        <div className="max-w-6xl w-full">
            <div className="flex items-center justify-between mx-4">
            
            <Sidebar title="Your Chapters">
                {renderChapterList}
                        
                <input
                        type="text"
                        value={newChapterTitle}
                        onChange={(e) => setNewChapterTitle(e.target.value)}
                        onKeyDown={handleCreateChapter}
                        placeholder="Add a chat page..."
                        className="w-full p-2 border-b border-gray-300 text-sm outline-none"
                        />
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className="w-full p-2 border-b border-gray-300 text-sm outline-none"
                />
            </Sidebar>
            <h1 className="text-2xl font-bold mb-4 ml-4 mt-4">
                <Breadcrumb data={chapters} chapterId={id} />
            </h1>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8 pt-4 max-h-screen overflow-y-auto">
                    {/* Create New Card */}
                    {id!=="new" && <div onClick={()=>{navigate(`/notes/${id}/new`)}} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden w-full max-w-sm mx-4 my-4 cursor-pointer flex items-center justify-center h-64">
                        {/* Subtle gradient accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="p-6 text-center">
                            <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
                                <Calendar className="w-3.5 h-3.5" />
                                Create New Note
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                + New Note
                            </h3>
                        </div>
                    </div>}
                        {
                        notes.map((value,idx)=>
                        (
                            <NoteCard key={idx} note={value} />
                        ))
                    }
                </div>
        </div>
    </div>
    );
}

export default NotesDashboard;
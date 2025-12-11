import { createNote,createChapter,getNoteById, getNotesByChapter, getAllChapters, updateNote, getNRecentNotes,deleteChapter, deleteNote } from "./notes.services.js";

const createNoteRequest = async (req,res) => {
    try {
        const noteData = req.body;
        const newNote = await createNote(noteData);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createChapterRequest = async (req,res) => {
    try {
        const { title, subject } = req.body;
        const newChapter = await createChapter({ title, subject });
        res.status(201).json(newChapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNotesByChapterRequest = async (req,res) => {
    try {
        const { chapterId } = req.params;
        const notes = await getNotesByChapter(chapterId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNoteByIdRequest = async (req,res) => {
    try {
        const { noteId } = req.params;
        const note = await getNoteById(noteId);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllChaptersRequest = async (req,res) => {
    try {
        console.log("Fetching all chapters");
        const chapters = await getAllChapters();
        res.status(200).json(chapters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateNoteRequest = async (req, res) => {
    try {
        const { noteId } = req.params;
        const noteData = req.body;
        const updatedNote = await updateNote(noteId, noteData);
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNRecentNotesRequest = async (req, res) => {
    try
    {
        const notes = await getNRecentNotes(5)
        res.status(200).json(notes)
    }
    catch(e)
    {
        console.log(e)
        res.status(401).json({"message":"Invalid Request"})
    }
}

const deleteChapterRequest = async (req, res) => {
    try {
        const { chapterId } = req.params;
        const deletedChapter = await deleteChapter(chapterId);
        res.status(200).json(deletedChapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteNoteRequest = async (req, res) => {
    try {
        const { noteId } = req.params;
        const deletedNote = await deleteNote(noteId);
        res.status(200).json(deletedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {createNoteRequest, createChapterRequest, getNotesByChapterRequest, getNoteByIdRequest, getAllChaptersRequest, updateNoteRequest, getNRecentNotesRequest, deleteChapterRequest, deleteNoteRequest};
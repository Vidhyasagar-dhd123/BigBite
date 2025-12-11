import Note from "./notes.model.js";
import Chapter from "./chapters.model.js";

const createNote = async (noteData) => {
    try {
        const chapter = await Chapter.findById(noteData.chapter);
        if (!chapter) {
            throw new Error("Chapter not found");
        }
        const note = new Note({
            title: noteData.title,
            content: noteData.content,
            chapter: chapter._id
        });
        await note.save();
        return note;
    } catch (error) {
        throw new Error(`Error creating note: ${error.message}`);
    }
};


const createChapter = async (chapterData) => {
    try {
        const chapter = new Chapter({ title: chapterData.title, subject: chapterData.subject });
        await chapter.save();
        return chapter;
    } catch (error) {
        throw new Error(`Error creating chapter: ${error.message}`);
    }
};

const getNotesByChapter = async (chapterId) => {
    try {
        const notes = await Note.find({ chapter: chapterId }, "title chapter createdAt updatedAt").populate("chapter").sort({ createdAt: -1 });
        return notes;
    } catch (error) {
        throw new Error(`Error fetching notes: ${error.message}`);
    }
};

const getNoteById = async (noteId) => {
    try {
        const note = await Note.findById(noteId);
        return note;
    } catch (error) {
        throw new Error(`Error fetching note: ${error.message}`);
    }
};


const getAllChapters = async () => {
    try {
        const chapters = await Chapter.aggregate([
            {
                $group: {
                    _id: "$subject",
                    chapters: { $push: "$$ROOT" },
                }
            }
        ]);
        return chapters;
    } catch (error) {
        throw new Error(`Error fetching chapters: ${error.message}`);
    }
};


const deleteChapter = async (chapterId) => {
    try {
        const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
        if (!deletedChapter) {
            throw new Error("Chapter not found");
        }
        await Note.deleteMany({ chapter: chapterId });
        return deletedChapter;
    } catch (error) {
        throw new Error(`Error deleting chapter: ${error.message}`);
    }
};


const deleteNote = async (noteId) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        return deletedNote;
    } catch (error) {
        throw new Error(`Error deleting note: ${error.message}`);
    }
};


const updateNote = async (noteId, updateData) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(noteId, updateData, { new: true });
        return updatedNote;
    } catch (error) {
        throw new Error(`Error updating note: ${error.message}`);
    }
};

const getNRecentNotes = async (n) => {
    try
    {
        const notes = await Note.find({},'_id title chapter createdAt updatedAt').populate("chapter").sort({updatedAt:-1}).limit(n)
        return notes;
    }
    catch(err)
    {
        throw new Error(`Error fetching recent notes : ${err.message}`)
    }
}

export { createNote, getNotesByChapter, getNoteById, getAllChapters, createChapter, deleteChapter, deleteNote, updateNote, getNRecentNotes };
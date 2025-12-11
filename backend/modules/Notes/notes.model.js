import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;

import express from "express";
import {createChapterRequest, createNoteRequest, getAllChaptersRequest, getNoteByIdRequest, getNotesByChapterRequest,getNRecentNotesRequest,updateNoteRequest,deleteChapterRequest,deleteNoteRequest} from "./notes.controller.js"

const router = express.Router();

router.post("/notes", createNoteRequest);
router.post("/chapters", createChapterRequest);
router.get("/chapters/:chapterId/notes", getNotesByChapterRequest);
router.get("/notes/:noteId", getNoteByIdRequest);
router.get("/chapters", getAllChaptersRequest);
router.put("/notes/:noteId", updateNoteRequest);
router.get("/notes/service/recent",getNRecentNotesRequest)
router.delete("/chapters/:chapterId", deleteChapterRequest);
router.delete("/notes/:noteId", deleteNoteRequest);

export default router;

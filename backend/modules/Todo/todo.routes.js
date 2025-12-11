import express from 'express';
const router = express.Router();

import { getTodos, createTodo, updateTodo, deleteTodo, addPage, getPages, deletePage, addLink } from './todo.controller.js';

router.get('/todos/:page', getTodos);
router.get('/pages', getPages);
router.delete('/deletePage/:id', deletePage);
router.post('/addpage', addPage);
router.post('/todos/:page', createTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);
router.post('/todos/:id/addLink',addLink)
export default router;
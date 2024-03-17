import express from 'express';
import { exportImportNoteController } from '../controller/exportImportNote.controller.js';

const exportImportNoteRouter = express.Router();

exportImportNoteRouter.post('/getNoteFromShop', exportImportNoteController.getNoteFromShop);
exportImportNoteRouter.post('/createNote', exportImportNoteController.createNote);


export default exportImportNoteRouter;
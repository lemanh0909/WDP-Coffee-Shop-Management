import express from 'express';
import { exportImportNoteController } from '../controller/exportImportNote.controller.js';

const exportImportNoteRouter = express.Router();

exportImportNoteRouter.get('/:shopId/getNoteFromShop', exportImportNoteController.getNoteFromShop);
exportImportNoteRouter.post('/createNote', exportImportNoteController.createNote);


export default exportImportNoteRouter;
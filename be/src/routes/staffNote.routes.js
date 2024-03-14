// ** Express
import express from "express";

// ** Controllers
import { staffNoteController } from "../controller/staffNote.controller";

// ** Middleware
import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";

const staffNoteRouter = express.Router();

staffNoteRouter.get('/getAll', verifyAccessToken, staffNoteController.getAllStaffNotes);
staffNoteRouter.get(':id//getDetail', verifyAccessToken, staffNoteController.getStaffNoteDetail);
staffNoteRouter.get('/:shopId/getAllStaffNotesInShop', staffNoteController.getAllStaffNotesInShop);
staffNoteRouter.put('/update', verifyAdminOrHigherToken, staffNoteController.updateStaffNote);
staffNoteRouter.post('/create', verifyAdminOrHigherToken, staffNoteController.createStaffNote);
staffNoteRouter.delete('/delete', verifyAdminOrHigherToken, staffNoteController.deleteStaffNote);

export default staffNoteRouter;

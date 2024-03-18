import { exportImportNoteService } from "../services/exportImportNote.service.js";

export const exportImportNoteController = {
    getNoteFromShop: async (req, res) => {
        const shopId = req.params.shopId;
        try {
            const note = await exportImportNoteService.getNoteFromShop(shopId);
      
            res.status(200).json({
                message: 'Success',
                data: note,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    createNote: async (req, res) => {
        const data = req.body;
        try {
            // Gọi service để tạo ghi chú mới
            const newNote = await exportImportNoteService.createNote(data);
      
            res.status(201).json({
              message: 'Note created successfully',
              data: newNote,
          });
          } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
          }
    }
}

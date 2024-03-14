import { staffNoteService } from "../services/index.js";
import { response } from "../utils/baseResponse.js";
import { httpConstant } from "../constant/index.js";
import { validation } from "../utils/validation.js";

export const staffNoteController = {
    createStaffNote: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const data = req.body;
    try {
      const staffNote = await staffNoteService.createStaffNote(data);
      res.status(200).json(
        response.success({
          data: { staffNote },
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  updateStaffNote: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;
    const data = req.body;

    try {
      const result = await staffNoteService.updateStaffNote(id, data);

      res.status(200).json(
        response.success({
          data: result,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  getStaffNoteDetail: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;

    try {
      const staffNote = await staffNoteService.getStaffNoteDetail(id);

      res.status(200).json(
        response.success({
          data: staffNote,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  getAllStaffNotes: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    try {
      const result = await staffNoteService.getAllStaffNotes();

      res.status(200).json(
        response.success({
          data: result,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  getAllStaffNotesInShop: async (req, res) => {
    try {
        const shopId = req.params.shopId;
        const staffnotes = await staffNoteService.getAllStaffNotesInShop(shopId);
        res.status(200).json({
            message: 'Success',
            data: staffnotes,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
},

  deleteStaffNote: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;

    try {
      const result = await staffNoteService.deleteStaffNote(id);

      res.status(200).json(
        response.success({
          data: result,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },
};

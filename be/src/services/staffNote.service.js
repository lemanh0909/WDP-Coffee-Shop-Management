import StaffNote from '../models/staffNote';
import Shop from '../models/shop';
export const staffNoteService = {
  createStaffNote: async (data) => {
    try {
      const { managerId, staffId, note, money, type } = data;

      // Create a new staff note
      const createdStaffNote = await StaffNote.create({ managerId, staffId, note, money, type });
      const shop = await Shop.findOne({ managerId });
      if (shop) {
          // Thêm userId vào array trong shop
          shop.staffNoteId.push(newUser._id);
          // Lưu lại thông tin shop
          await shop.save();
      } else {
          throw new Error("Shop not found with managerId: " + managerId);
      }
      return {
        status: 'OK',
        message: 'Staff note created successfully',
        data: createdStaffNote,
      };
    } catch (err) {
      throw new Error('Failed to create staff note: ' + err.message);
    }
  },

  updateStaffNote: async (id, data) => {
    try {
      const updatedStaffNote = await StaffNote.findByIdAndUpdate(id, data, { new: true });

      if (!updatedStaffNote) {
        return {
          status: 'ERR',
          message: 'Staff note not found',
        };
      }

      return {
        status: 'OK',
        message: 'Staff note updated successfully',
        data: updatedStaffNote,
      };
    } catch (err) {
      throw new Error('Failed to update staff note: ' + err.message);
    }
  },

  getStaffNoteDetail: async (staffNoteId) => {
    try {
      const staffNote = await StaffNote.findById(staffNoteId);

      if (!staffNote) {
        return {
          status: 'ERR',
          message: 'Staff note not found',
        };
      }

      return {
        status: 'OK',
        message: 'Staff note retrieved successfully',
        data: staffNote,
      };
    } catch (err) {
      throw new Error('Failed to retrieve staff note: ' + err.message);
    }
  },

  getAllStaffNotes: async () => {
    try {
      const allStaffNotes = await StaffNote.find();

      return {
        status: 'OK',
        message: 'All staff notes retrieved successfully',
        data: allStaffNotes,
      };
    } catch (err) {
      throw new Error('Failed to retrieve all staff notes: ' + err.message);
    }
  },

  deleteStaffNote: async (staffNoteId) => {
    try {
      const deletedStaffNote = await StaffNote.findByIdAndDelete(staffNoteId);

      if (!deletedStaffNote) {
        return {
          status: 'ERR',
          message: 'Staff note not found',
        };
      }

      return {
        status: 'OK',
        message: 'Staff note deleted successfully',
        data: deletedStaffNote,
      };
    } catch (err) {
      throw new Error('Failed to delete staff note: ' + err.message);
    }
  },
};

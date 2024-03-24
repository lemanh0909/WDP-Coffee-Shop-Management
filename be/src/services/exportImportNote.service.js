import Shop from "../models/shop.js";
import Warehouse from "../models/warehouse.js";
import ExportImportNote from "../models/exportimportNote.js";
import User from "../models/user.js";

export const exportImportNoteService = {
    getNoteFromShop: async (shopId) => {
        try {
            const shop = await Shop.findById(shopId);
            if (!shop) throw new Error(`Shop not found with Id ${shopId}`);
    
            const listNoteId = shop.exportImportNoteId;
    
            // Tìm danh sách ghi chú với các ID đã chỉ định
            const listNote = await ExportImportNote.find({ _id: { $in: listNoteId } });
            const listNoteWithUserEmail = [];
            // Lặp qua danh sách ghi chú để lấy thông tin người dùng và thêm email vào mỗi ghi chú
            for (let note of listNote) {
                const user = await User.findById(note.userId);
                if (user) {
                    const noteWithUserEmail = {
                        ...note.toObject(), // Chuyển đổi đối tượng mongoose thành đối tượng JS plain
                        userEmail: user.email
                    };
                    listNoteWithUserEmail.push(noteWithUserEmail);
                }
            }
    
            // Trả về danh sách ghi chú đã được cập nhật với email
            return listNoteWithUserEmail;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    createNote: async ({ shopId, warehouseId, userId, quantity, price, status, description }) => {
        try {
            // Tìm cửa hàng dựa trên shopId và bắt đầu một phiên giao dịch
            const shop = await Shop.findById(shopId);
            if (!shop) throw new Error(`Shop not found with Id ${shopId}`);

            // Tìm kho hàng dựa trên warehouseId
            const warehouse = await Warehouse.findById(warehouseId);
            if (!warehouse) throw new Error(`Warehouse not found with Id ${warehouseId}`);

            // Tăng hoặc giảm quantity của warehouse tùy thuộc vào status
            if (status === "Imported") {
                warehouse.quantity += quantity;
            } else if (status === "Exported") {
                if (warehouse.quantity < quantity) {
                    throw new Error("Not enough quantity in the warehouse to export");
                }
                warehouse.quantity -= quantity;
                price = 0;
            } else {
                throw new Error(`Invalid status: ${status}`);
            }
            // Tạo ghi chú xuất nhập mới
            const newNote = new ExportImportNote({
                warehouse: { _id: warehouseId, name: warehouse.name },
                userId,
                quantity,
                price,
                status,
                description
            });
            // Lưu cả ghi chú xuất nhập và thay đổi quantity vào cơ sở dữ liệu
            await newNote.save();
            await warehouse.save();
            // Lưu ghi chú xuất nhập vào cửa hàng
            shop.exportImportNoteId.push(newNote);
            await shop.save();

            // Trả về ghi chú xuất nhập mới đã tạo
            return newNote;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


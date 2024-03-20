import Shop from "../models/shop.js";
import Warehouse from "../models/warehouse.js";
import ExportImportNote from "../models/exportimportNote.js";


export const exportImportNoteService = {
    getNoteFromShop: async (shopId) => {
        try {
            const shop = await Shop.findById(shopId);
            if (!shop) throw new Error(`Shop not found Id ${shopId}`);
            const listNote = shop.exportImportNoteId;

            // Trả về mảng kết quả
            return listNote;
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

            // Tạo ghi chú xuất nhập mới
            const newNote = new ExportImportNote({
                warehouse: { _id: warehouseId, name: warehouse.name },
                userId,
                quantity,
                price,
                status,
                description
            });

            // Tăng hoặc giảm quantity của warehouse tùy thuộc vào status
            if (status === "Imported") {
                warehouse.quantity += quantity;
            } else if (status === "Exported") {
                if (warehouse.quantity < quantity) {
                    throw new Error("Not enough quantity in the warehouse to export");
                }
                warehouse.quantity -= quantity;
            } else {
                throw new Error(`Invalid status: ${status}`);
            }

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


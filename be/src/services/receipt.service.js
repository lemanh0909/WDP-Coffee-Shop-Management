import Receipt from '../models/receipt.js';
import Shop from '../models/shop.js';
export const receiptService = {
 

  createReceipt: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {managerId, name, date, price, status, description} = data;

        const checkReceiptExists = await Receipt.findOne({ name });

        if (checkReceiptExists) {
          resolve({
            status: 'ERR',
            message: 'Receipt already exists!',
          });
        }

        const createdReceipt = await Receipt.create({ name, date, price, status, description });
        const shop = await Shop.findOne({ managerId });
        if (shop) {
            // Thêm userId vào array trong shop
            shop.receiptId.push(createdReceipt._id);
            // Lưu lại thông tin shop
            await shop.save();
        } else {
            throw new Error("Shop not found with managerID: " + managerId);
        }
        resolve({
          status: 'OK',
          message: 'Receipt created successfully',
          data: createdReceipt,
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  getAllReceipts: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allReceipts = await Receipt.find();

        resolve({
          status: 'OK',
          message: 'Receipts retrieved successfully',
          data: allReceipts,
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  getAllReceiptsInShop: async (shopId) => {
    const shop = await Shop.findById(shopId);
    if (shop) {
        const receipts = await Receipt.find({ _id: { $in: shop.receiptId } });
        return receipts;
    } else {
        throw new Error("Shop not found with id: " + shopId);
    }
},
};


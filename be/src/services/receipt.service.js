import Receipt from '../models/receipt';

export const receiptService = {
  createReceipt: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createdReceipt = await Receipt.create(data);
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

};

import Paycheck from '../models/paycheck.js';
import Shop from '../models/shop.js';
export const paycheckService = {
  createPaycheck: async (data) => {
    try {
      const { managerId, staffEmail, month, price, status, extra } = data;
      const shop = await Shop.findOne({ managerId });
      const listPaycheck = await Paycheck.find({ _id: { $in: shop.paycheckId } });
      let paycheckExist;
      listPaycheck.forEach((paycheck) => {
        console.log(paycheck, staffEmail, month);
        if (paycheck.month === month && paycheck.staffEmail === staffEmail) {
          paycheckExist = paycheck;
        }
      });
      if (paycheckExist != null && !extra) {
        throw new Error
          ('This staff already been paid this month. If you want to continue please select extra status.');
      }
      const createdPaycheck = new Paycheck({ managerId, staffEmail, month, price, status, extra });
      await createdPaycheck.save();
      if (shop) {
        shop.paycheckId.push(createdPaycheck._id);
        await shop.save();
      } else {
        throw new Error("Shop not found with managerID: " + managerId);
      }

      return createdPaycheck;
    } catch (error) {
      console.error("Error creating paycheck:", error);
      throw error;
    }
  },
  getAllPayCheckInShop: async (managerId) => {
    try {
      const shop = await Shop.findOne({ managerId });
      const paycheck = await Paycheck.find({ _id: { $in: shop.paycheckId } }).sort({ createdAt: -1 });

      return paycheck;
    } catch (error) {
      console.error("Error getting paycheck:", error);
      throw error;
    }
  }, changePaycheckState: async ({ paycheckId, status }) => {
    const paycheck = await Paycheck.findById(paycheckId);
    if (!paycheck) {
      throw new Error(`Paycheck not found with id: ${paycheckId}`);
    }
    paycheck.status = status || paycheck.status;

    await paycheck.save();

    return paycheck;
  }
};


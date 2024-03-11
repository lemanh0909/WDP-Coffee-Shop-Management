import Order from "../models/order.js";
import Receipt from "../models/receipt.js";
import StaffNote from "../models/staffNote.js";
import User from "../models/user.js";

export const financeService = {
  async calculateMonthlyFinance(year, month) {
    try {
      
      const orders = await Order.find({
        createdAt: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) }
      });
      const orderTotal = orders.reduce((total, order) => total + order.totalPrice, 0);

      
      const receipts = await Receipt.find({
        date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) }
      });
      const receiptTotal = receipts.reduce((total, receipt) => {
        if (receipt.status === "Income") {
          return total + receipt.price;
        } else if (receipt.status === "Expense") {
          return total - receipt.price;
        } else {
          return total;
        }
      }, 0);

    
      const staffNotes = await StaffNote.find({
        createdAt: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) }
      });
      const staffNoteTotal = staffNotes.reduce((total, staffNote) => {
        if (staffNote.type === "Increase") {
          return total + staffNote.money;
        } else if (staffNote.type === "Decrease") {
          return total - staffNote.money;
        } else {
          return total;
        }
      }, 0);

    
      const users = await User.find({ status: "Active" });
      const salaryTotal = users.reduce((total, user) => total - (user.salary || 0), 0);


     
      const total = orderTotal + receiptTotal + staffNoteTotal+ salaryTotal;
      return {
        status: "OK",
        message: "Monthly finance calculated successfully",
        data: {
          year,
          month,
          orderTotal,
          receiptTotal,
          staffNoteTotal,
          salaryTotal,
          total
        }
      };
    } catch (error) {
      throw new Error("Failed to calculate monthly finance: " + error.message);
    }
  }
};

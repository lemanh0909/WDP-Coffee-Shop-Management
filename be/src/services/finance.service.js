import Shop from "../models/shop";

export const financeService = {
  async calculateMonthlyFinance(year, month) {
    try {
      // Lấy danh sách các đơn hàng trong tháng
      const shop = await Shop.findOne({});
      const orders = await Order.find({
        _id: { $in: shop.orderId },
        createdAt: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) }
      });
      const orderTotal = orders.reduce((total, order) => total + order.totalPrice, 0);

      // Lấy danh sách các biên lai thu chi trong tháng
      const receipts = await Receipt.find({
        _id: { $in: shop.receiptId },
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

      // Lấy danh sách các ghi chú nhân viên trong tháng
      const staffNotes = await StaffNote.find({
        _id: { $in: shop.staffNoteId },
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

      // Lấy danh sách các nhân viên hoạt động
      const users = await User.find({ status: "Active" });
      const salaryTotal = users.reduce((total, user) => total - (user.salary || 0), 0);

      // Tính toán tổng tài chính của cửa hàng trong tháng
      const total = orderTotal + receiptTotal + staffNoteTotal + salaryTotal;

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

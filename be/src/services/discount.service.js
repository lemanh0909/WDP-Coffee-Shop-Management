import Discount from "../models/discount.js";
import Shop from "../models/shop.js";

export const discountService = {
  createDiscount: async ({shopId, name, startDate, endDate, percent, categories, products }) => {
    try {
      const newDiscount = new Discount({
        name,
        startDate,
        endDate,
        percent,
        categories,
        products,
      });
      const shop = await Shop.findById(shopId);
      if (shop) {
          // Thêm userId vào array trong shop
          shop.discountId.push(newDiscount._id);
          // Lưu lại thông tin shop
          await shop.save();
      } else {
          throw new Error("Shop not found with shopId: " + managerId);
      }
      await newDiscount.save();

      return newDiscount;
    } catch (error) {
      console.error("Error creating discount:", error);
      throw error;
    }
  },
  getAllDiscounts: async () => {
    try {
      const allDiscounts = await Discount.find();
      return allDiscounts;
    } catch (error) {
      console.error("Error getting all discounts:", error);
      throw error;
    }
  },
  getAllDiscountsInShop: async (shopId) => {
    const shop = await Shop.findById(shopId);
    if (shop) {
        const discounts = await Discount.find({ _id: { $in: shop.discountId } });
        return discounts;
    } else {
        throw new Error("Shop not found with id: " + shopId);
    }
},
  getDiscountById: async (discountId) => {
    try {
      const discount = await Discount.findById(discountId);
      if (!discount) {
        throw new Error("Discount not found with id: " + discountId);
      }
      return discount;
    } catch (error) {
      console.error("Error getting discount by ID:", error);
      throw error;
    }
  },
  updateDiscount: async ({discountId, name, startDate, endDate, percent, categories, products }) => {
    try {
      const discount = await Discount.findById(discountId);
      if (!discount) {
        throw new Error("Discount not found with id: " + discountId);
      }

      discount.name = name || discount.name;
      discount.startDate = startDate || discount.startDate;
      discount.endDate = endDate || discount.endDate;
      discount.percent = percent || discount.percent;
      discount.categories = categories || discount.categories;
      discount.products = products || discount.products;

      await discount.save();

      return discount;
    } catch (error) {
      console.error("Error updating discount:", error);
      throw error;
    }
  },
  deleteDiscount: async ({discountId}) => {
    try {
      const deletedDiscount = await Discount.findByIdAndDelete(discountId);
      if (!deletedDiscount) {
        throw new Error("Discount not found with id: " + discountId);
      }
      return deletedDiscount;
    } catch (error) {
      console.error("Error deleting discount:", error);
      throw error;
    }
  },
};

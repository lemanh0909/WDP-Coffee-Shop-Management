import Discount from "../models/discount";

export const discountService = {
  createDiscount: async ({ name, startDate, endDate, percent, categories, products }) => {
    try {
      const newDiscount = new Discount({
        name,
        startDate,
        endDate,
        percent,
        categories,
        products,
      });

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

import Shop from "../models/shop.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import { productService } from "./product.service.js";

export const statisticService = {
    getSellStatistics: async ({ managerId, startDate, endDate }) => {
        try {
            const shop = await Shop.findOne({ managerId: managerId });
            if (!shop) throw new Error(`Shop not found with managerId ${managerId}`);
            const order = shop.orderId;
            const orderList = await Order.find({
                _id: shop.orderId,
                createdAt: { $gte: startDate, $lte: endDate }
            });

            // Tạo một mảng để lưu trữ thông tin về số lượng và tổng giá của mỗi sản phẩm
            const productList = [];
            // Duyệt qua từng đơn hàng trong danh sách đơn hàng
            for (const order of orderList) {
                for (const product of order.products) {
                    // Tạo biến để kiểm tra xem sản phẩm đã tồn tại trong mảng hay chưa
                    let existingProductIndex = -1;

                    // Duyệt qua mảng sản phẩm đã có để kiểm tra xem sản phẩm hiện tại đã tồn tại hay chưa
                    for (let i = 0; i < productList.length; i++) {
                        if (productList[i]._id.equals(product._id)) {
                            existingProductIndex = i;
                            break;
                        }
                    }
                    // Nếu sản phẩm đã tồn tại trong mảng, cập nhật thông tin số lượng và tổng giá
                    if (existingProductIndex !== -1) {
                        const existingProduct = productList[existingProductIndex];
                        existingProduct.quantity += product.quantity;
                        existingProduct.totalPrice += product.price * product.quantity;
                    } else {
                        // Nếu sản phẩm chưa tồn tại trong mảng, thêm mới vào mảng
                        productList.push({
                            _id: product._id,
                            name: product.name,
                            quantity: product.quantity,
                            totalPrice: product.price * product.quantity
                        });
                    }
                }
            }

            const products = await productService.getAllProductsWithCategoryInShop(shop._id)
            const allProductOrders = [];
            for (const product of products) {
                allProductOrders.push({
                    _id: product._id,
                    name: product.name,
                    quantity: 0,
                    totalPrice: 0,
                    category: product.category
                });
            }
            // So sánh và thay thế thông tin sản phẩm trong allProductOrders bằng productList
            for (let i = 0; i < allProductOrders.length; i++) {
                const productInList = productList.find(product => product._id.equals(allProductOrders[i]._id));
                if (productInList) {
                    allProductOrders[i].quantity = productInList.quantity;
                    allProductOrders[i].totalPrice = productInList.totalPrice;
                }
            }

            // Trả về mảng kết quả
            return allProductOrders;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getOrderSummaryByUser: async ({ managerId, startDate, endDate }) => {
        try {
            // Tìm kiếm shop dựa trên managerId
            const shop = await Shop.findOne({ managerId: managerId });
            if (!shop) {
                throw new Error(`Shop not found with managerId ${managerId}`);
            }

            // Lấy danh sách các orderId từ shop
            const orderIds = shop.orderId.map(orderId => orderId);

            // Truy vấn danh sách các đơn hàng dựa trên các orderId và khoảng thời gian
            const orderSummary = await Order.aggregate([
                {
                    $match: {
                        _id: { $in: orderIds },
                        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                    }
                },
                {
                    $group: {
                        _id: "$userId", // Nhóm các đơn hàng theo userId
                        totalOrders: { $sum: 1 }, // Tính tổng số đơn hàng
                        totalPrice: { $sum: "$totalPrice" } // Tính tổng giá trị của các đơn hàng
                    }
                }
            ]);

            // Nối thông tin của người dùng vào mỗi đơn hàng
            for (const order of orderSummary) {
                const user = await User.findById(order._id); // Tìm người dùng dựa trên userId
                if (user) {
                    order.fullName = user.fullName;
                    order.email = user.email;
                } else {
                    order.fullName = "Unknown";
                    order.email = "unknown@example.com";
                }
            }

            // Trả về kết quả
            return orderSummary;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getCategoryStatistics: async ({ managerId, startDate, endDate }) => {
        try {
            const shop = await Shop.findOne({ managerId: managerId });
            if (!shop) throw new Error(`Shop not found with managerId ${managerId}`);

            // Lấy danh sách sản phẩm bán được từ hàm getSellStatistics
            const allProductOrders = await statisticService.getSellStatistics({ managerId, startDate, endDate });

            // Khởi tạo mảng để lưu trữ thống kê danh mục
            const categoryStatistics = [];

            // Duyệt qua từng sản phẩm để thống kê
            allProductOrders.forEach(product => {
                const categoryIndex = categoryStatistics.findIndex(category => category.name === product.category.name);
                if (categoryIndex !== -1) {
                    // Nếu danh mục đã tồn tại, cập nhật tổng số lượng và doanh thu
                    categoryStatistics[categoryIndex].totalQuantity += product.quantity;
                    categoryStatistics[categoryIndex].totalRevenue += product.totalPrice;
                } else {
                    // Nếu danh mục chưa tồn tại, thêm mới vào mảng
                    categoryStatistics.push({
                        _id: product.category._id,
                        name: product.category.name,
                        totalQuantity: product.quantity,
                        totalRevenue: product.totalPrice
                    });
                }
            });

            // Trả về mảng kết quả
            return categoryStatistics;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


import Shop from "../models/shop.js";
import Order from "../models/order.js";

export const statisticService = {
    getSellStatistics: async ({managerId, startDate, endDate}) =>{
        try {
            const shop = await Shop.findOne({managerId: managerId});
            if(!shop) throw new Error(`Shop not found with managerId ${managerId}`);
            const order = shop.orderId;
            const orderList = await Order.find({
                _id: shop.orderId,
                createdAt: { $gte: startDate, $lte: endDate }
            });
            
            // Tạo một mảng để lưu trữ thông tin về số lượng và tổng giá của mỗi sản phẩm
            const productList = [];
            
            // Duyệt qua từng đơn hàng trong danh sách đơn hàng
            for(const order of orderList) {
                for(const product of order.products) {
                    // Tạo biến để kiểm tra xem sản phẩm đã tồn tại trong mảng hay chưa
                    let existingProductIndex = -1;
                    
                    // Duyệt qua mảng sản phẩm đã có để kiểm tra xem sản phẩm hiện tại đã tồn tại hay chưa
                    for(let i = 0; i < productList.length; i++) {
                        if(productList[i]._id.equals(product._id)) {
                            existingProductIndex = i;
                            break;
                        }
                    }
                    // Nếu sản phẩm đã tồn tại trong mảng, cập nhật thông tin số lượng và tổng giá
                    if(existingProductIndex !== -1) {
                        const existingProduct = productList[existingProductIndex];
                        existingProduct.quantity += product.quantity;
                        existingProduct.totalPrice += product.price * product.quantity;
                        console.log("hello");
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
            
            // Trả về mảng kết quả
            return productList;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}


import Order from "../models/order.js";
import Product from "../models/product.js";
import Warehouse from "../models/warehouse.js";
import Shop from "../models/shop.js";

export const orderService = {
    createOrder: async ({shopId, products, userId, paymentMethod, customerPay, refund }) => {
        try {
            
            // Lấy thông tin đầy đủ của sản phẩm từ database
            const populatedProducts = await Promise.all(products.map(async ({ productId, quantity }) => {
                const product = await Product.findById(productId);
                if (!product) {
                    throw new Error(`Product not found with id: ${productId}`);
                }
                return {
                    _id: product._id,
                    name: product.name,
                    size: product.size,
                    price: product.price,
                    quantity: quantity,
                };
            }));

            const listWarehouseItems = await Promise.all(populatedProducts.map(async (product) => {
                const productVariant = await Product.findById(product._id);
                // const recipeList = await Warehouse.findByProductId(product._id) 
                const recipeList = productVariant.recipe;
                const recipeList1 = recipeList.map((recipe) =>{
                    const requireQuantity = recipe.require * product.quantity
                    return {
                    warehouseId: recipe.warehouse._id,
                    name: recipe.warehouse.name,
                    require: requireQuantity,
                };
                })
                return recipeList1;
            }))
            
            for (const warehouseItem of listWarehouseItems) {
                for (const warehouseItem2 of warehouseItem) {
                    const warehouse = await Warehouse.findById(warehouseItem2.warehouseId);
                    warehouse.quantity = warehouse.quantity - warehouseItem2.require;
                    if(warehouse.quantity < 0){
                        throw new Error(`Not enough warehouse items for ${warehouse.name}`); 
                    }
                    await warehouse.save();
                }
            }
            // Tính tổng số lượng và tổng giá của sản phẩm trong đơn hàng
            const totalProducts = populatedProducts.reduce((total, product) => total + product.quantity, 0);
            const totalPrice = populatedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

            // Tạo đối tượng Order mới
            const newOrder = new Order({
                products: populatedProducts,
                totalProducts,
                totalPrice,
                userId,
                paymentMethod,
                customerPay,
                refund,
                state: 'Pending', // Mặc định trạng thái là 'Pending'
            });
            const shop = await Shop.findById(shopId);
            if (shop) {
                // Thêm userId vào array trong shop
                shop.orderId.push(newOrder._id);
                // Lưu lại thông tin shop
                await shop.save();
            } else {
                throw new Error("Shop not found with shopId: " + shopId);
            }
            // Lưu Order vào database
            await newOrder.save();

            return newOrder;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },
    getOrderById: async (orderId) => {
        return await Order.findById(orderId);
    },

    getAllOrders: async () => {
        return await Order.find();
    },
    getAllOrdersInShop: async (shopId) => {
        const shop = await Shop.findById(shopId);
        if (shop) {
            const orders = await Order.find({ _id: { $in: shop.orderId } });
            return orders;
        } else {
            throw new Error("Shop not found with id: " + shopId);
        }
    },
    changeOrderState: async ({orderId, state}) => {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error(`Order not found with id: ${orderId}`);
        }
        order.state = state || order.state;

        await order.save();
        
        return order;
    }
};

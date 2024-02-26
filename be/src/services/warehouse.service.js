
import Warehouse from "../models/warehouse.js"
import Shop from '../models/shop.js'
import ImportExportNote from '../models/exportimportNote';
const LIMIT_WAREHOUSE = 10;

export const warehouseService = {
    createWarehouse: async (data) => {
        return new Promise(async (resolve, reject) => {
            const { name, quantity, image, unit } = data;
            try {
                const checkWarehouseExists = await Warehouse.findOne({
                    name: name
                });

                if (checkWarehouseExists !== null) {
                    resolve({
                        status: 'ERR',
                        message: 'Warehouse already exists!'
                    });
                }

                const createdWarehouse = await Warehouse.create({
                    name,
                    quantity,
                    image,
                    unit
                });
                const shop = await Shop.findOne({ managerId });
                if (shop) {
                    // Thêm userId vào array trong shop
                    shop.warehouseId.push(newUser._id);
                    // Lưu lại thông tin shop
                    await shop.save();
                } else {
                    throw new Error("Shop not found with managerId: " + managerId);
                }

                resolve({
                    status: 'OK',
                    message: 'Warehouse created successfully',
                    data: createdWarehouse
                });
            } catch (err) {
                reject(err);
            }
        });
    },

    updateWarehouse: async (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkWarehouseExists = await Warehouse.findOne({
                    _id: id
                });

                if (checkWarehouseExists === null) {
                    resolve({
                        status: 'ERR',
                        message: 'Warehouse is not defined!'
                    });
                }

                const currentQuantity = checkWarehouseExists.quantity;

                const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, data, { new: true });

                if (currentQuantity !== updatedWarehouse.quantity) {

                    const newNote = new ImportExportNote({
                        userId: updatedWarehouse.userId,
                        quantity: updatedWarehouse.quantity - currentQuantity,
                        price: updatedWarehouse.price,
                        status: 'Imported',
                        description: `Quantity change for warehouse ${updatedWarehouse.name}`,
                        image: updatedWarehouse.image,
                        unit: updatedWarehouse.unit
                    });

                    // Save the new ImportExportNote
                    await newNote.save();
                }

                resolve({
                    status: 'OK',
                    message: 'Warehouse updated successfully',
                    data: updatedWarehouse
                });
            } catch (err) {
                reject(err);
            }
        });
    },

    getDetailWarehouse: async (warehouseId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const warehouse = await Warehouse.findOne({
                    _id: warehouseId
                });

                if (warehouse === null) {
                    resolve({
                        status: 'ERR',
                        message: 'The warehouse is not defined'
                    });
                }

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: warehouse
                });
            } catch (err) {
                reject(err);
            }
        });
    },
    getAllWarehouses: async (page = 1, limit = LIMIT_WAREHOUSE, search) => {
        try {
            const skipNumber = (page - 1) * limit;
            const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

            const totalWarehouses = await Warehouse.countDocuments(searchQuery);
            const allWarehouses = await Warehouse.find(searchQuery)
                .skip(skipNumber)
                .limit(limit);

            return {
                status: 'OK',
                data: allWarehouses,
                totalWarehouses,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            };
        } catch (err) {
            throw new Error(`Error in getAllWarehouses: ${err.message}`);
        }
    },


    deleteWarehouse: async (warehouseId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const warehouse = await Warehouse.findByIdAndDelete(warehouseId);

                if (!warehouse) {
                    resolve({
                        status: 'ERR',
                        message: 'Warehouse not found',
                    });
                }

                resolve({
                    status: 'OK',
                    message: 'Warehouse deleted successfully',
                    data: warehouse,
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}




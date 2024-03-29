
import Warehouse from "../models/warehouse.js"
import Shop from '../models/shop.js'
import ImportExportNote from '../models/exportimportNote.js';
const LIMIT_WAREHOUSE = 10;
import moment from 'moment';

export const warehouseService = {
    createWarehouse: async (data) => {
        return new Promise(async (resolve, reject) => {
            const { managerId, name, quantity, image, unit, expiry } = data;
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
                    unit,
                    expiry,

                });
                const shop = await Shop.findOne({ managerId });
                if (shop) {
                    // Thêm userId vào array trong shop
                    shop.warehouseId.push(createdWarehouse._id);
                    // Lưu lại thông tin shop
                    await shop.save();
                } else {
                    throw new Error("Shop not found with managerId: " + managerId);
                }
                console.log(createdWarehouse);
                await createdWarehouse.save();
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

    calculateNotification: async (expiryDate) => {
        const today = moment();
        const expiry = moment(expiryDate);
        const daysUntilExpiry = expiry.diff(today, 'days');
        if (daysUntilExpiry <= 7) {
            return `Expiry in ${daysUntilExpiry} days`;
        } else {
            return null;
        }
    },


    updateWarehouse: async ( {_id, name, image, unit }) => {
        try {
            const warehouse = await Warehouse.findById(_id);
            console.log(_id, name, image, unit);
            if (!warehouse) {
                throw new Error(`Warehouse not found with id: ${_id}`);
            }

            warehouse.name = name !== undefined ? name : warehouse.name;
            warehouse.unit = unit !== undefined ? unit : warehouse.unit;
            warehouse.image = image !== undefined ? image : warehouse.image;


            await warehouse.save();
            return warehouse;
        } catch (error) {
            throw new Error(`Error updating warehouse basis: ${error.message}`);
        }
    },

    updateWarehouseBasis: async (id, data) => {
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
                data: allWarehouses.map(warehouse => ({
                    ...warehouse.toObject(),
                    notification: calculateNotification(warehouse.expiry) // Tính toán thông báo cho mỗi mặt hàng
                })),
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
                console.log(warehouseId);
                if (!warehouse) {
                    resolve({
                        status: 'ERR',
                        message: 'Warehouse not found',
                    });
                }
                const shop = await Shop.find({ warehouseId: warehouseId });

                shop.forEach(async (s) => {
                    const index = s.warehouseId.indexOf(warehouseId);
                    if (index !== -1) {
                        s.warehouseId.splice(index, 1);
                        await s.save();
                    }
                });
                resolve({
                    status: 'OK',
                    message: 'Warehouse deleted successfully',
                    data: warehouse,
                });
            } catch (err) {
                reject(err);
            }
        });
    },

    getAllWarehousesInShop: async (shopId) => {
        const shop = await Shop.findById(shopId);
        if (shop) {
            const warehouse = await Warehouse.find({ _id: { $in: shop.warehouseId } });
            return warehouse;
        } else {
            throw new Error("Shop not found with id: " + shopId);
        }
    }
}




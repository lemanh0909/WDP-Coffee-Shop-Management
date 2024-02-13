<<<<<<< HEAD
import Warehouse from "../models/warehouse.js"
=======
>>>>>>> 5856e60e9cd686a7a73492a6fb2e86a81142f1b5

import Warehouse from "../models/warehouse.js"

import ImportExportNote from '../models/exportimportNote';
const LIMIT_WAREHOUSE = 10;

export const warehouseService = {
 createWarehouse :async (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, quantity, image } = data;
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
                image
            });

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
                    status: 'Pending', 
                    description: `Quantity change for warehouse ${updatedWarehouse.name}`,
                    image: updatedWarehouse.image,
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

 getDetailWarehouse :async (warehouseId) => {
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
 getAllWarehouses :async (page = 1, limit = LIMIT_WAREHOUSE, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : null;

            const totalWarehouses = await Warehouse.count(searchQuery);
            const allWarehouses = await Warehouse.find(searchQuery)
                .skip(skipNumber)
                .limit(limit);

            resolve({
                status: 'OK',
                data: allWarehouses,
                totalWarehouses,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            });
        } catch (err) {
            reject(err);
        }
    });
},

 deleteWarehouse :async (warehouseId) => {
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




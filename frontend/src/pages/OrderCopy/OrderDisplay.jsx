// OrderDisplay.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const OrderDisplay = ({ totalQuantity, selectedProducts, handleChangeQuantity, handleRemove, handleCreateOrder, orderMessage }) => {
  // Hàm tính tổng giá
  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  return (
    <Card className='w-1/2 flex flex-col items-center'>
      <h3 className='mt-4'>Selected Products</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.size}</td>
              <td>
                <input
                  className='text-center'
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => handleChangeQuantity(index, e.target.value)}
                />
              </td>
              <td>{product.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Quantity:</td>
            <td colSpan="2">{totalQuantity}</td>
          </tr>
          <tr>
            <td colSpan="3">Total Price:</td>
            <td colSpan="2">{calculateTotalPrice()}</td>
          </tr>
        </tfoot>
      </table>
      <Button className='w-44' variant="success" onClick={handleCreateOrder}>
        Create Order
      </Button>
      {orderMessage && (
        <div className="mt-3">
          <p>{orderMessage}</p>
        </div>
      )}
      <div className='mb-4'></div>
    </Card>
  );
};

export default OrderDisplay;

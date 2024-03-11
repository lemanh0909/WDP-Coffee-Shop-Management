// OrderSummary.js
import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

// Import các thư viện và biểu tượng cần thiết

const OrderSummary = ({handleGoBack, totalQuantity, calculateTotalPrice, paymentMethod, setPaymentMethod, customerPayment, refundAmount, handlePaymentChange, handleConfirmOrder, orderErrorVisible, creatOrderError }) => {
  return (
    <Card className='w-1/2'>
      <Button variant="link" onClick={handleGoBack}>
        <ArrowLeft size={20} />
      </Button>
      <h3>Thông tin đơn hàng</h3>
      <table className="table">
        <tbody>
          <tr>
            <td colSpan="3">Total Quantity:</td>
            <td colSpan="2">{totalQuantity}</td>
          </tr>
          <tr>
            <td colSpan="3">Total Price:</td>
            <td colSpan="2">{calculateTotalPrice()}</td>
          </tr>
          <tr>
            <td colSpan="3">Phương thức thanh toán:</td>
            <td colSpan="2">
              <Form.Control
                className='text-center'
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option className='text-center' value="Cash">Cash</option>
                <option className='text-center' value="Card">Card</option>
              </Form.Control>
            </td>
          </tr>
          <tr>
            <td colSpan="3">Customer Pay:</td>
            <td colSpan="2">
              <input
                className='text-center'
                type="text"
                value={customerPayment}
                onChange={handlePaymentChange}
                inputMode="numeric"
                pattern="[0-9]*"
              /></td>
          </tr>
          <tr>
            <td colSpan="3">Trả lại:</td>
            <td colSpan="2">{refundAmount}</td>
          </tr>
        </tbody>
      </table>
      <div className='flex justify-center'>
        <Button variant="success" onClick={handleConfirmOrder}>
          Xác nhận Đơn hàng
        </Button>
      </div>
      {orderErrorVisible && (
        <div className="mt-2">
          <p>{creatOrderError}</p>
        </div>
      )}
      <div className='mb-4'></div>
    </Card>
  );
};

export default OrderSummary;


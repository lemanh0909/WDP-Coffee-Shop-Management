// OrderSummary.js
import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

// Import các thư viện và biểu tượng cần thiết

const OrderSummary = ({ totalQuantity, calculateTotalPrice, paymentMethod, setPaymentMethod, customerPayment, refundAmount, handlePaymentChange, handleConfirmOrder, orderErrorVisible, creatOrderError }) => {
    return (
      <Card className='w-1/2'>
        {/* Các phần khác của component */}
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
        {/* Các phần khác của component */}
      </Card>
    );
  };
  
  export default OrderSummary;
  

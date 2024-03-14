import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import CommonNavbar from '../Common/navbar';
import CloseButton from 'react-bootstrap/CloseButton';
import OrderSummary from './OrderSummary';
import OrderDisplay from './OrderDisplay';
import ProductVariantDisplay from './ProductVariantDisplay';

const Order = () => {
  const [productVariant, setProductVariant] = useState([]);
  const [shopId, setShopId] = useState('');
  const [userId, setUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [warehouse, setWarehouse] = useState([]);
  const [orderMessage, setOrderMessage] = useState(null);
  const [lowQuantityItems, setLowQuantityItems] = useState([]);
  const [isLowQuantityNotificationVisible, setIsLowQuantityNotificationVisible] = useState(true);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [customerPayment, setCustomerPayment] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [refundAmountChange, setRefundAmountChange] = useState(false);
  const [creatOrderError, setCreatOrderError] = useState(null);
  const [orderErrorVisible, setOrderErrorVisible] = useState(false);

  useEffect(() => {
    // Lấy userId và shopId từ local storage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data not found in localStorage.');
    }
    const userData = JSON.parse(userDataString);
    const storedUserId = userData.userID;
    const storedShopId = userData.shopId;
    console.log(storedUserId, storedShopId);
    if (storedUserId && storedShopId) {
      setUserId(storedUserId);
      setShopId(storedShopId);
    }
  }, []);

  useEffect(() => {
  // Lấy userId và shopId từ local storage
  const userDataString = localStorage.getItem('userData');
  if (!userDataString) {
    throw new Error('User data not found in localStorage.');
  }
  const userData = JSON.parse(userDataString);
  const shopId = userData.shopId;
  const userId = userData.userID;
    axios.get(`http://localhost:5000/api/v1/productVariant/${shopId}/getAllProductVariantsInShop`)
      .then(response => {
        setProductVariant(response.data.data.allProductVariants);
      })
      .catch(error => console.error('Error fetching categories:', error));

    axios.get(`http://localhost:5000/api/v1/warehouse/${shopId}/getAllWarehousesInShop`)
      .then(response => {
        setWarehouse(response.data.data);
        const lowQuantityItems = response.data.data.filter(item => item.quantity < 10);
        setLowQuantityItems(lowQuantityItems);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    // Tính tổng số lượng sản phẩm khi danh sách thay đổi
    const newTotalQuantity = selectedProducts.reduce((total, product) => total + product.quantity, 0);
    setTotalQuantity(newTotalQuantity);
  }, [selectedProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSelect = (selectedProduct) => {
    const existingProductIndex = selectedProducts.findIndex(
      (product) => product._id === selectedProduct._id
    );

    if (existingProductIndex !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex].quantity += 1;
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { ...selectedProduct, quantity: 1 }]);
    }
  };

  const handleCancel = (selectedProduct) => {
    setOrderMessage(null)
    const existingProductIndex = selectedProducts.findIndex(
      (product) => product._id === selectedProduct._id
    );

    if (existingProductIndex !== -1) {
      const updatedProducts = [...selectedProducts];
      const currentQuantity = updatedProducts[existingProductIndex].quantity;

      if (currentQuantity > 1) {
        updatedProducts[existingProductIndex].quantity -= 1;
      } else {
        updatedProducts.splice(existingProductIndex, 1);
      }

      setSelectedProducts(updatedProducts);
    }
  };

  const handleChangeQuantity = (index, newQuantity) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = parseInt(newQuantity, 10) || 1;
    setSelectedProducts(updatedProducts);
  };

  const handleCloseLowQuantityNotification = () => {
    setIsLowQuantityNotificationVisible(false);
  };

  const handleRemove = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
    setOrderMessage(null);
  };

  const handleCreateOrder = () => {
    const warehouseCopy = warehouse.map(item => ({ ...item }));
    setOrderMessage(null)
    if (selectedProducts.length === 0) {
      setOrderMessage('Hóa đơn trống!');
      return;
    }
    for (const product of selectedProducts) {
      for (const item of product.recipe) {
        // Tìm phần tử trong warehouse giống với item
        const matchingWarehouseItem = warehouseCopy.find(
          warehouseItem => warehouseItem._id === item.warehouse._id);

        if (matchingWarehouseItem) {
          matchingWarehouseItem.quantity = matchingWarehouseItem.quantity - item.require * product.quantity;
          if (matchingWarehouseItem.quantity < 0) {
            console.log(matchingWarehouseItem.name, 'not enough:');
            setOrderMessage(`Không đủ nguyên liệu để tạo ${product.quantity} ${product.name}.`)
            return;
          }
        }
      }
    }
    setShowOrderSummary(true);
  };

  const handleGoBack = () => {
    setShowOrderSummary(false);
  };

  const calculateRefundAmount = () => {
    const paidAmount = parseFloat(customerPayment) || 0;
    const totalAmount = calculateTotalPrice();

    // Đảm bảo paidAmount là một số hợp lệ
    if (!isNaN(paidAmount) && paidAmount !== 0) {
      return Math.max(0, paidAmount - totalAmount);
    }

    return 0;
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  const handlePaymentChange = (e) => {
    const paidAmount = e.target.value;
    setCustomerPayment(paidAmount);
    setRefundAmountChange(true);
  };

  useEffect(() => {
    if (refundAmountChange) {
      const refund = calculateRefundAmount();
      setRefundAmount(refund);
      setRefundAmountChange(false);
    }
  }, [refundAmountChange, calculateRefundAmount]);

  const handleConfirmOrder = () => {
    const customerPayInt = parseInt(customerPayment);
    const totalPrice = calculateTotalPrice();
    if (customerPayInt >= totalPrice) {
      const order = {
        shopId: shopId,
        products: selectedProducts.map(product => ({
          productId: product._id,
          quantity: parseInt(product.quantity),
        })),
        userId: userId,
        paymentMethod: paymentMethod,
        customerPay: customerPayInt,
        refund: refundAmount,
      };
      console.log(order);
      axios.post('http://localhost:5000/api/v1/order/create', order)
        .then(response => {
          console.log("Order created");
          setOrderErrorVisible(false);
          setCustomerPayment(0);
          setPaymentMethod('Cash');
          alert('Đơn hàng đã được tạo thành công!');
          window.location.reload();
        })
        .catch(error => {
          console.error('Error creating order:', error);
        });
    } else {
      setOrderErrorVisible(true);
      setCreatOrderError(`Tiền khách trả ít hơn tổng giá!`);
    }
  };

  return (
    <>
      <CommonNavbar />
      {isLowQuantityNotificationVisible && lowQuantityItems.length > 0 && (
        <div className="alert alert-warning position-relative">
          <CloseButton onClick={handleCloseLowQuantityNotification} className="position-absolute top-0 end-0 m-2" />
          Nguyên liệu có số lượng thấp:
          <ul className='flex gap-2'>
            {lowQuantityItems.map(item => (
              <li key={item._id}>{item.name}: {item.quantity} {item.unit}</li>
            ))}
          </ul>
        </div>
      )}
      <Container className="flex justify-center gap-2 mt-4">
        {showOrderSummary ? (
          <OrderSummary
            handleGoBack={handleGoBack}
            totalQuantity={totalQuantity}
            calculateTotalPrice={calculateTotalPrice}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            customerPayment={customerPayment}
            handlePaymentChange={handlePaymentChange}
            refundAmount={refundAmount}
            handleConfirmOrder={handleConfirmOrder}
            orderErrorVisible={orderErrorVisible}
            creatOrderError={creatOrderError}
          />
        ) : (
          <>
            <OrderDisplay
              totalQuantity={totalQuantity}
              selectedProducts={selectedProducts}
              handleChangeQuantity={handleChangeQuantity}
              handleRemove={handleRemove}
              handleCreateOrder={handleCreateOrder}
              orderMessage={orderMessage}
            />
            <ProductVariantDisplay
              productVariant={productVariant}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              handleSelect={handleSelect}
              handleCancel={handleCancel}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Order;

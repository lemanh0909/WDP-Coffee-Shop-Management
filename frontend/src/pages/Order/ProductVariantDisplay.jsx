import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const ProductVariantDisplay = ({
  productVariant,
  handleSelect,
  handleCancel,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Lọc danh sách sản phẩm dựa trên giá trị tìm kiếm và kích thước
  const filteredProductVariant = productVariant.filter(pv =>
    pv.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSize === '' || pv.size === selectedSize)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  // Lấy danh sách kích thước duy nhất từ danh sách sản phẩm
  const uniqueSizes = Array.from(new Set(productVariant.map(pv => pv.size)));

  return (
    <Card className="w-1/2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <div className='ml-4 mr-2'>
        <h3 className='mt-4'>Products</h3>
        <div className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
        <div className="mb-3 flex flex-grow items-center gap-3">
        <label className="mr-2">Search by Size:</label>
          <Form.Control className="w-auto" as="select" onChange={handleSizeChange}>
            <option value="">All Sizes</option>
            {uniqueSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </Form.Control>
        </div>
        <div className='flex flex-wrap justify-start gap-2'>
          {filteredProductVariant.map(pv => (
            <Card key={pv._id} className="w-48 mb-4 flex flex-col">
              <div className="flex-grow mt-2">
                <img src={pv.image[0]} alt={pv.name} className="mb-2 h-1/2 w-full" />
                <p>Name: {pv.name}</p>
                <p>Size: {pv.size}</p>
                <p>Price: {pv.price}</p>
              </div>
              <div className="mb-2">
                <Button variant="primary" onClick={() => handleSelect(pv)}>
                  Select
                </Button>
                <Button variant="danger" onClick={() => handleCancel(pv)}>
                  Cancel
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className='mb-4'></div>
    </Card>
  );
};

export default ProductVariantDisplay;

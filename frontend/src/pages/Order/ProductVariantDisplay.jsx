import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const ProductVariantDisplay = ({
  productVariant,
  handleSelect,
  handleCancel,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách sản phẩm dựa trên giá trị tìm kiếm
  const filteredProductVariant = productVariant.filter(pv =>
    pv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Card className="w-1/2">
      <div className='mx-4'>
        <h3 className='mt-4'>Products</h3>
        <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name"
          onChange={handleSearch}
          value={searchTerm}
        />
        </div>

        <div className='flex flex-wrap justify-between'>
          {filteredProductVariant.map(pv => (
            <Card key={pv._id} className="w-48 mb-4 flex flex-col">
              <div className="flex-grow mt-2">
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

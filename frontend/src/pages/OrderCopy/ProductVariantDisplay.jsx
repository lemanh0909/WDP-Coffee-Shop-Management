import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const ProductVariantDisplay = ({
  productVariant,
  handleSearch,
  searchTerm,
  handleSelect,
  handleCancel,
}) => {
  return (
    <Card className="w-1/2">
      <div>
        <h3>Products</h3>
        <Form.Control
          type="text"
          placeholder="Search by name"
          onChange={handleSearch}
          value={searchTerm}
          className="mb-3"
        />
        <div className='flex flex-wrap justify-around'>
          {productVariant.map(pv => (
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

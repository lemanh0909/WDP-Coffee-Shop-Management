import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Button, Form } from 'react-bootstrap';
import CommonNavbar from '../Common/navbar';

const Order = () => {
  const [productVariant, setProductVariant] = useState([]);
  const [shopId, setShopId] = useState('65d749ea36f223b9f7040016');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState();

  useEffect(() => {
    // Gọi API để lấy danh sách category khi component được mount
    axios.get(`http://localhost:5000/api/v1/productVariant/${shopId}/getAllProductVariantsInShop`)
      .then(response => {
        setProductVariant(response.data.data.allProductVariants);
        console.log(response.data.data.allProductVariants);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value);
  };

  const filteredProductVariants = productVariant.filter(pv =>
    pv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductVariantDisplay = () => {
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
          <input placeholder='Hello'/>
          <div className='flex flex-wrap justify-around'>
            {filteredProductVariants.map(pv => (
              <Card key={pv._id} className="w-48 mb-4 flex flex-col">
                <div className="flex-grow mt-2">
                  <p>Name: {pv.name}</p>
                  <p>Size: {pv.size}</p>
                  <p>Price: {pv.price}</p>
                </div>
                <div className="mb-2">
                  <Button variant="primary">
                    Select
                  </Button>
                  <Button variant="danger">
                    Cancel
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <CommonNavbar />
      <Container className="mt-4 flex">
        <Card className='w-1/2'>
          Hello
        </Card>
        <ProductVariantDisplay />
      </Container>
    </>
  );
};

export default Order;

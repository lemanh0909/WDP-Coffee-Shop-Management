import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Button } from 'react-bootstrap';
// import { StyledTable, StyledPagination } from './managerOrderStyles';
import CommonNavbar from '../Common/navbar';

const Order = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    // Gọi API để lấy danh sách category khi component được mount
    axios.get('http://localhost:5000/api/v1/category/getAll')
      .then(response => {
        setCategories(response.data.data.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Gọi API để lấy danh sách category khi component được mount
    setProducts(null)
    axios.get(`http://localhost:5000/api/v1/category/${categoryId}/getDetail`)
      .then(response => {
        const productPromises = response.data.data.data.products.map((productId) => {
          // Return the promise for each product request
          return axios.get(`http://localhost:5000/api/v1/product/${productId}/getProductById`)
            .then(response => response.data.data);
        });

        // Use Promise.all to wait for all product requests to complete
        Promise.all(productPromises)
          .then(productsData => {
            // Update state with both the selected category and the associated products
            setSelectedCategory({
              ...response.data.data.data,
              products: productsData,
            });
          })
          .catch(error => console.error('Error fetching products:', error));
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleProductClick = (productId) => {
    // Gọi API để lấy danh sách category khi component được mount
    axios.get(`http://localhost:5000/api/v1/product/${productId}/getProductById`)
      .then(response => {
        const sortedProductVariants = response.data.data.productVariant.sort((a, b) => {
          // Sắp xếp theo giá từ thấp đến cao, bạn có thể điều chỉnh nếu cần
          return a.price - b.price;
        });

        const productPromises = sortedProductVariants.map((productVariant) => {
          // Return the promise for each product request
          return axios.get(`http://localhost:5000/api/v1/productVariant/${productVariant._id}/getProductVariant`)
            .then(response => response.data.data);
        });

        // Use Promise.all to wait for all product requests to complete
        Promise.all(productPromises)
          .then(productsData => {
            // Update state with both the selected category and the associated products
            setProducts({
              ...response.data.data,
              productsData,
            });
          })
          .catch(error => console.error('Error fetching products:', error));
      })
      .catch(error => console.error('Error fetching categories:', error));
  };


  const ProductVariantDisplay = () => {
    return (
      <div className="">
        <p>Selected Product Variant: {products.name}</p>
        <h4>Products:</h4>
        <ul className='flex justify-around'>
          {console.log(products?.productVariant)}
          {products?.productVariant.map(productVariant => (
            <li key={productVariant._id}>
              <div>
                <p>Name: {productVariant.name}</p>
                <p>Size: {productVariant.size}</p>
                <p>Price: {productVariant.price}</p>
                <Button
                  variant="primary"
                // onClick={() => handleProductVariantSelect(productVariant._id)}
                >
                  Select
                </Button>
                <Button
                  variant="danger"
                // onClick={() => handleProductVariantCancel(productVariant._id)}
                >
                  Cancel
                </Button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    );
  }

  const ProductDisplay = () => {
    return (
      <div className="">
        <p>Selected Product: {selectedCategory.name}</p>
        <h4>Products:</h4>
        <ul className='flex justify-around'>
          {selectedCategory?.products.map(product => (
            <li key={product._id}>
              <Button
                variant={products?._id === product._id ? 'primary' : 'success'}
                onClick={() => handleProductClick(product._id)}
              >
                {product.name}
              </Button>
            </li>
          ))}
        </ul>
        {products && <ProductVariantDisplay />}
      </div>
    );
  }

  const CategoryDisplay = () => {
    // Hiển thị danh sách category dưới dạng các button
    return (
      <Card className="w-1/2">
        <div>
          <h3>Categories</h3>
          <ul className='flex justify-around'>
            {categories.map(category => (
              <li key={category._id}>
                <Button
                  variant={selectedCategory?._id === category._id ? 'primary' : 'success'}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {selectedCategory && <ProductDisplay />}
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
        <CategoryDisplay />
      </Container>
    </>
  );
};

export default Order;

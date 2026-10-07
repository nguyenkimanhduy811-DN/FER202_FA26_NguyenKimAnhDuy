import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import ProductFilter from '../components/ProductFilter';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function ShopPage() {
  const { addToCart } = useCart();

  const [toastMessage, setToastMessage] =
    useState('');

  const handleAddToCart = (product) => {
    addToCart(product);

    setToastMessage(
      `Đã thêm ${product.name} vào giỏ`
    );
  };

  return (
    <>
      <ProductFilter
        products={products}
        onAddToCart={handleAddToCart}
      />

      <ToastContainer
        position="top-end"
        className="p-3"
      >
        <Toast
          show={Boolean(toastMessage)}
          onClose={() => setToastMessage('')}
          autohide
          delay={2000}
        >
          <Toast.Header>
            <strong className="me-auto">
              FPT Shop Mini
            </strong>
          </Toast.Header>

          <Toast.Body>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ShopPage;
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';

import ProductList from './ProductList';
import {
  getFinalPrice,
  isProductInStock
} from '../utils/productUtils';

const sorters = {
  default: () => 0,

  priceAsc: (a, b) =>
    getFinalPrice(a) - getFinalPrice(b),

  priceDesc: (a, b) =>
    getFinalPrice(b) - getFinalPrice(a),

  ratingDesc: (a, b) =>
    (b.rating?.rate ?? 0) -
    (a.rating?.rate ?? 0)
};

function ProductFilter({
  products,
  onAddToCart
}) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [onlyInStock, setOnlyInStock] =
    useState(false);
  const [sortBy, setSortBy] =
    useState('default');

  const categories = [
    'Tất cả',
    ...new Set(
      products.map(
        (product) =>
          product.category?.name ?? 'Khác'
      )
    )
  ];

  const searchKeyword = keyword.trim().toLowerCase();

  const visibleProducts = products
    .filter((product) => {
      if (!searchKeyword) {
        return true;
      }

      return product.name
        .toLowerCase()
        .includes(searchKeyword);
    })
    .filter((product) => {
      if (category === 'Tất cả') {
        return true;
      }

      return (
        product.category?.name ??
        'Khác'
      ) === category;
    })
    .filter((product) => {
      if (!onlyInStock) {
        return true;
      }

      return isProductInStock(product);
    })
    .sort(sorters[sortBy]);

  const clearFilters = () => {
    setKeyword('');
    setCategory('Tất cả');
    setOnlyInStock(false);
    setSortBy('default');
  };

  return (
    <div className="product-filter">
      <div className="filter-header">
        <div>
          <h2>Bộ lọc sản phẩm</h2>
          <p>
            Tìm kiếm, lọc và sắp xếp sản phẩm
          </p>
        </div>

        <Button
          variant="outline-secondary"
          onClick={clearFilters}
        >
          Xóa lọc
        </Button>
      </div>

      <div className="filter-controls">
        <div className="filter-search">
          <Form.Label>Tìm kiếm</Form.Label>

          <Form.Control
            type="text"
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            placeholder="Tìm theo tên sản phẩm..."
          />
        </div>

        <div>
          <Form.Label>Sắp xếp</Form.Label>

          <Form.Select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="default">
              Mặc định
            </option>

            <option value="priceAsc">
              Giá tăng dần
            </option>

            <option value="priceDesc">
              Giá giảm dần
            </option>

            <option value="ratingDesc">
              Đánh giá cao
            </option>
          </Form.Select>
        </div>

        <div className="stock-filter">
          <Form.Label>
            Tình trạng
          </Form.Label>

          <Form.Check
            type="switch"
            label="Còn hàng"
            checked={onlyInStock}
            onChange={(e) =>
              setOnlyInStock(
                e.target.checked
              )
            }
          />
        </div>
      </div>

      <div className="category-filter">
        <Form.Label>
          Danh mục
        </Form.Label>

        <ButtonGroup>
          {categories.map((name) => (
            <Button
              key={name}
              variant={
                category === name
                  ? 'primary'
                  : 'outline-primary'
              }
              onClick={() =>
                setCategory(name)
              }
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="filter-result">
        Tìm thấy{' '}
        <strong>
          {visibleProducts.length}
        </strong>
        /{products.length} sản phẩm
      </div>

      {visibleProducts.length === 0 ? (
        <Alert
          variant="warning"
          className="mt-3"
        >
          Không có sản phẩm phù hợp
        </Alert>
      ) : (
        <ProductList
          products={visibleProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}

export default ProductFilter;
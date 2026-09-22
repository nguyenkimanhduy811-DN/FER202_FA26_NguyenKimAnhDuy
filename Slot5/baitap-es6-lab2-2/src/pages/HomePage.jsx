import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

import {
  ProductList,
  AppButton,
  InputField
} from '../components';

import { products } from '../data/products';
import { APP_NAME } from '../data/menu';

const HomePage = ({ showDeals = true } = {}) => {
  // ES6: filter()
  const onSale = products.filter(
    ({ discount }) => discount > 0
  );

  // ES6: spread + sort() + slice()
  const deals = [...onSale]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  // ES6: map() + Set + spread
  const categories = [
    ...new Set(
      products.map(({ category }) => category.name)
    )
  ];

  // ES6: filter()
  const inStockCount = products.filter(
    ({ inStock }) => inStock
  ).length;

  // ES6: reduce() + Math.round()
  const avgPrice = Math.round(
    products.reduce(
      (sum, { price }) => sum + price,
      0
    ) / products.length
  );

  // ES6: object shorthand
  const total = products.length;

  const stats = {
    total,
    inStockCount,
    avgPrice
  };

  // ES6: destructuring
  const {
    total: totalProducts,
    inStockCount: stockProducts,
    avgPrice: averagePrice
  } = stats;

  // ES6: object shorthand
  const statCards = [
    {
      label: 'Tổng SP',
      value: totalProducts
    },
    {
      label: 'Còn hàng',
      value: stockProducts
    },
    {
      label: 'Giá TB',
      value: averagePrice
    }
  ];

  return (
    <div>
      {/* ES6: template literal */}
      <Card
        id="home"
        bg="primary"
        text="white"
        className="mb-4"
      >
        <Card.Body>
          <Card.Title>
            {`Chào mừng đến ${APP_NAME}`}
          </Card.Title>

          <Card.Text>
            {`Hôm nay có ${onSale.length} sản phẩm đang giảm giá`}
          </Card.Text>
        </Card.Body>
      </Card>

      <section className="mb-5">
        <h3 className="mb-3">Thống kê</h3>

        <Row>
          {statCards.map(({ label, value }) => (
            <Col md={4} key={label}>
              <Card className="text-center h-100">
                <Card.Body>
                  <Card.Title>{label}</Card.Title>

                  <Card.Text>
                    {label === 'Giá TB'
                      ? value.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        })
                      : value}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5">
        <h3 className="mb-3">Bộ lọc</h3>

        <InputGroup>
          <Form.Control
            placeholder="Tìm sản phẩm..."
          />

          <Form.Select>
            <option value="">
              -- Chọn danh mục --
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </Form.Select>

          <AppButton>
            Tìm
          </AppButton>
        </InputGroup>
      </section>

      {showDeals && (
        <section id="products" className="mb-5">
          <h3 className="mb-3">
            Đang giảm giá
          </h3>

          <ProductList products={deals} />
        </section>
      )}

      <section id="cart" className="mb-5">
        <h3 className="mb-3">
          Tất cả sản phẩm
        </h3>

        {products.length === 0 ? (
          <Alert variant="info">
            Chưa có sản phẩm
          </Alert>
        ) : (
          <ProductList products={products} />
        )}
      </section>

      <section id="register" className="mb-5">
        <Card>
          <Card.Body>
            <Card.Title>
              Nhận tin
            </Card.Title>

            <Form
              onSubmit={(event) =>
                event.preventDefault()
              }
            >
              <InputField
                id="newsletterEmail"
                label="Email"
                type="email"
                placeholder="Nhập email của bạn"
                required
              />

              <AppButton
                type="submit"
                className="w-100"
              >
                Đăng ký
              </AppButton>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
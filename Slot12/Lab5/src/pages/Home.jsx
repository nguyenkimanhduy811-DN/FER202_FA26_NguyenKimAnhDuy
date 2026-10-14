
import { Col, Container, Row } from "react-bootstrap";
import MyProduct from "../components/MyProduct";
import { products } from "../data/products";

function Home() {
  return (
    <Container>
      <h1 className="my-4">Home</h1>

      <h2 className="mb-4">Cửa hàng điện tử</h2>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
            <MyProduct product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;

import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="py-5">
      <section className="hero-section text-center">
        <p className="text-primary fw-semibold mb-2">
          XIN CHÀO, MÌNH LÀ
        </p>

        <h1 className="display-4 fw-bold">
          Nguyễn Kim Anh Duy
        </h1>

        <p className="lead text-muted mt-3">
          Sinh viên đang học lập trình Front-end với ReactJS.
          Đây là portfolio giới thiệu kỹ năng và các dự án của mình.
        </p>

        <Button
          as={Link}
          to="/projects"
          variant="primary"
          size="lg"
          className="mt-3"
        >
          Xem dự án của mình
        </Button>
      </section>
    </Container>
  );
}

export default Home;
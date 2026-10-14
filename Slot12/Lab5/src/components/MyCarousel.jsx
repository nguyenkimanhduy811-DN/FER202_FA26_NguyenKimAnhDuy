
import { Carousel, Container } from "react-bootstrap";
import { banners } from "../data/banners";

function MyCarousel() {
  return (
    <Container fluid className="my-4 px-3 px-lg-5">
      <div className="electronic-carousel">
        <Carousel interval={3000} pause="hover" indicators controls>
          {banners.map((banner) => (
            <Carousel.Item key={banner.id}>
              <img
                src={banner.image}
                alt={banner.title}
                className="main-banner-image"
              />

              <Carousel.Caption className="banner-caption">
                <h3>{banner.title}</h3>
                <p>{banner.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}

export default MyCarousel;

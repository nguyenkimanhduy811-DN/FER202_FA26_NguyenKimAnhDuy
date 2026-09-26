import Carousel from 'react-bootstrap/Carousel';

import pizza1 from '../assets/images/pizza1.jpg';
import pizza2 from '../assets/images/pizza2.jpg';
import pizza3 from '../assets/images/pizza3.jpg';
import pizza4 from '../assets/images/pizza4.jpg';
import pizza5 from '../assets/images/pizza5.jpg';

const slides = [
  {
    image: pizza1,
    title: 'Neapolitan Pizza',
    description:
      'If you are looking for traditional Italian pizza, the Neapolitan is the best option!'
  },
  {
    image: pizza2,
    title: 'Traditional Italian Pizza',
    description:
      'Enjoy the authentic taste of fresh Italian pizza.'
  },
  {
    image: pizza3,
    title: 'Delicious Pizza',
    description:
      'Fresh ingredients, great taste and perfect crust.'
  },
  {
    image: pizza4,
    title: 'Special Pizza',
    description:
      'Discover our delicious pizza selection.'
  },
  {
    image: pizza5,
    title: 'Pizza House',
    description:
      'The perfect place for pizza lovers.'
  }
];

function Hero() {
  return (
    <section className="hero-section">
      <Carousel
        controls
        indicators={false}
        interval={4000}
        pause="hover"
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.image}>
            <img
              src={slide.image}
              alt={slide.title}
              className="hero-image"
            />

            <Carousel.Caption className="hero-caption">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default Hero;
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import menu1 from '../assets/images/menu1.jpg';
import menu2 from '../assets/images/menu2.jpg';
import menu3 from '../assets/images/menu3.jpg';
import menu4 from '../assets/images/menu4.jpg';

const pizzas = [
  {
    name: 'Margherita Pizza',
    price: '$12.00',
    oldPrice: '$14.00',
    image: menu1,
    badge: 'SALE'
  },
  {
    name: 'Mushroom Pizza',
    price: '$25.00',
    image: menu2
  },
  {
    name: 'Hawaiian Pizza',
    price: '$30.00',
    image: menu3,
    badge: 'NEW'
  },
  {
    name: 'Pesto Pizza',
    price: '$60.00',
    oldPrice: '$65.00',
    image: menu4,
    badge: 'SALE'
  }
];

function PizzaMenu() {
  return (
    <section className="menu-section">
      <h2 className="section-title">Our Menu</h2>

      <div className="row g-3">
        {pizzas.map((pizza) => (
          <div
            className="col-12 col-sm-6 col-lg-3"
            key={pizza.name}
          >
            <Card className="pizza-card h-100">
              <div className="pizza-image-wrapper">
                {pizza.badge && (
                  <span className="pizza-badge">
                    {pizza.badge}
                  </span>
                )}

                <Card.Img
                  src={pizza.image}
                  alt={pizza.name}
                  className="pizza-menu-image"
                />
              </div>

              <Card.Body className="pizza-card-body">
                <Card.Title>
                  {pizza.name}
                </Card.Title>

                <div className="price-box">
                  {pizza.oldPrice && (
                    <del>{pizza.oldPrice}</del>
                  )}

                  <span>{pizza.price}</span>
                </div>

                <Button
                  variant="dark"
                  className="buy-button"
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PizzaMenu;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function BookingForm() {
  return (
    <section className="booking-section" id="contact">
      <div className="container">
        <h2 className="section-title">
          Book Your Table
        </h2>

        <Form>
          <div className="row g-3">
            <div className="col-md-4">
              <Form.Control
                type="text"
                placeholder="Your Name *"
              />
            </div>

            <div className="col-md-4">
              <Form.Control
                type="email"
                placeholder="Your Email *"
              />
            </div>

            <div className="col-md-4">
              <Form.Select>
                <option>Select a Service</option>
                <option>Dining In</option>
                <option>Take Away</option>
                <option>Delivery</option>
              </Form.Select>
            </div>

            <div className="col-12">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Please write your comment"
              />
            </div>

            <div className="col-12">
              <Button variant="warning" type="submit">
                Send Message
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default BookingForm;
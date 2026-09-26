import Header from './components/Header';
import Hero from './components/Hero';
import PizzaMenu from './components/PizzaMenu';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="pizza-page">
      <Header />
      <Hero />
      <PizzaMenu />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;
import ProductInfo from "./ProductInfo";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Pizza Products</h1>

      <div className="product-list">
        <ProductInfo
          title="Margherita Pizza"
          price={12.99}
          description="Classic Italian pizza with tomato, mozzarella and fresh basil."
          tags={["Pizza", "Italian", "Cheese"]}
          avatar="/images/1.jpg"
        />

        <ProductInfo
          title="Pepperoni Pizza"
          price={15.99}
          description="Delicious pizza topped with pepperoni and melted cheese."
          tags={["Pizza", "Pepperoni", "Cheese"]}
          avatar="/images/2.jpg"
        />
      </div>
    </div>
  );
}

export default App;
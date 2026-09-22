import {
  Layout,
  WelcomeCard,
  ProductList,
  CartTable,
  RegisterForm
} from './components';

import { products } from './data/products';

function App() {
  return (
    <Layout title="Cửa hàng">
      <div id="home" className="mb-5">
        <WelcomeCard />
      </div>

      <div id="products" className="mb-5">
        <ProductList products={products} />
      </div>

      <div id="cart" className="mb-5">
        <CartTable />
      </div>

      <div id="register" className="mb-5">
        <RegisterForm />
      </div>
    </Layout>
  );
}

export default App;
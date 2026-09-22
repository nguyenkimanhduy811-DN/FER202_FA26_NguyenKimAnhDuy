import Container from 'react-bootstrap/Container';

import Header from './Header';
import Footer from './Footer';

const Layout = ({
  children,
  title = 'Trang chủ'
}) => {
  return (
    <>
      <Header />

      <Container>
        <h2 className="my-4">{title}</h2>

        {children}
      </Container>

      <Footer />
    </>
  );
};

export default Layout;
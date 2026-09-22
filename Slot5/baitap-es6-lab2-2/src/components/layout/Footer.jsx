import { APP_NAME } from '../../data/menu';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5">
      {`© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`}
    </footer>
  );
};

export default Footer;
import { Link } from 'react-router-dom';
import { Flex } from 'antd';

function Navigation() {
  return (
    <Flex gap={30} className="mb-4 md:mb-0 md:flex hidden">
      <Link
        className="text-basicColor text-base hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition"
        to={'/'}
      >
        Home
      </Link>
      <Link
        className="text-basicColor text-base hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition"
        to={'/our-products'}
      >
        Our products
      </Link>
    </Flex>
  );
}

export default Navigation;

import { NavLink } from 'react-router-dom';
import { Flex } from 'antd';

function Navigation() {
  return (
    <Flex className='mb-4 md:mb-0 md:flex hidden'>
      <NavLink
        className='text-basicColor md:mr-md mr-4 hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition'
        to={'/'}
      >
        Home
      </NavLink>
      <NavLink
        className='text-basicColor md:mr-md mr-4 hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition'
        to={'/our-products'}
      >
        Our products
      </NavLink>
      <NavLink
        className='text-basicColor hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition'
        to={'/about-us'}
      >
        About us
      </NavLink>
    </Flex>
  );
}

export default Navigation;

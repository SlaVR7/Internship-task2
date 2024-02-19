import { NavLink } from 'react-router-dom';
import { Flex, Layout, Row } from 'antd';
import { Logo } from './index.ts';
import Navigation from './Navigation.tsx';
import SocialMediaLinks from './SocialMediaLinks.tsx';

function Footer() {
  return (
    <Layout.Footer className='bg-secondaryColor dark:bg-grayLColor transition'>
      <Flex justify={'space-between'} align={'center'} className='max-w-[1440px] mx-auto px-4 lg:px-big py-4'>
        <Row className='hidden md:block'>
          <NavLink
            to={'/'}
            className='text-basicColor dark:text-primaryColor drop-shadow-sm hover:text-accentColor dark:hover:text-accentColor active:scale-95 transition'
          >
            <Logo />
          </NavLink>
        </Row>
        <Navigation />
        <SocialMediaLinks />
      </Flex>
    </Layout.Footer>
  );
}

export default Footer;

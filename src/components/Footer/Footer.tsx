import { NavLink } from 'react-router-dom';
import { Flex, Layout, Row } from 'antd';
import { Logo } from '../index.ts';
import Navigation from '../Header/Navigation.tsx';
import SocialMediaLinks from './SocialMediaLinks.tsx';

function Footer() {
  return (
    <Layout.Footer className="py-[33px] md:py-[12px] bg-secondaryColor dark:bg-grayLColor transition">
      <Flex
        align={'center'}
        className="justify-center md:justify-between max-w-[1440px] mx-auto px-4 lg:px-big"
      >
        <Row className="hidden md:block">
          <NavLink
            to={'/'}
            className="text-basicColor dark:text-primaryColor drop-shadow-sm hover:text-accentColor dark:hover:text-accentColor active:scale-95 transition"
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

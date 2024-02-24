import { FC, useState } from 'react';
import { Flex, Layout, Row, Space } from 'antd';
import { Logo } from '../index.ts';
import { CartIcon, Logout } from '../icons';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { authorizedUser, store } from '../../store/store.ts';
import { onSnapshot } from 'mobx-state-tree';
import Navigation from './Navigation.tsx';
import { DarkModeButton } from './DarkModeButton.tsx';
import CartDark from '../icons/CartDark.tsx';
import BurgerMenu from './BurgerMenu.tsx';
import { observer } from 'mobx-react-lite';
import LogOutDark from '../icons/LogOutDark.tsx';

const Header: FC = observer(() => {
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const cartItems = store.products.filter((product) => product.quantityInCart).length;

  function logout() {
    authorizedUser.setAuthorizedUser(null);
  }

  onSnapshot(authorizedUser, (snapshot) => {
    setIsUserAuthorized(!!snapshot.authorizedUserId);
  });

  return (
    <Layout.Header
      className={'bg-primaryColor dark:bg-grayLColor transition relative h-[100px] px-0'}
    >
      <Flex
        justify={'space-between'}
        align={'center'}
        className={'max-w-[1440px] mx-auto px-4 h-24 lg:px-big'}
      >
        <Link
          className="text-basicColor dark:text-primaryColor drop-shadow-sm hover:text-accentColor dark:hover:text-accentColor active:scale-95 transition active"
          to="/"
        >
          <Logo />
        </Link>
        <Navigation />
        <Space>
          <DarkModeButton onChange={() => document.body.classList.toggle('dark')} />
          <Link
            className="block text-basicColor mr-4 hover:scale-110 transition dark:text-primaryColor"
            to={'/cart'}
          >
            <Row className="relative">
              <CartIcon />
              <CartDark />
              <Flex
                justify={'center'}
                align={'center'}
                className="opacity-75 rounded-full w-[20px] h-[20px] bg-accentColor border-2 border-primaryColor text-primaryColor text-[10px] absolute z-10 top-[-15px] right-[-15px]"
              >
                {cartItems}
              </Flex>
            </Row>
          </Link>
          {isUserAuthorized ? (
            <div className={'hidden md:flex md:items-center'}>
              <Link to="/account">
                <UserOutlined
                  className={
                    'mt-[25px] mr-[15px] text-[20px] text-grayLColor dark:text-primaryColor'
                  }
                />
              </Link>
              <Link to="/" onClick={logout}>
                <Logout />
                <LogOutDark />
              </Link>
            </div>
          ) : (
            <Flex className={'hidden md:flex'} vertical={true} justify={'center'}>
              <Link
                className={
                  'text-basicColor hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition text-base leading-normal'
                }
                to="/sign-up"
              >
                Sign Up
              </Link>
              <Link
                className={
                  'text-basicColor hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition text-base leading-normal'
                }
                to="/sign-in"
              >
                Sign In
              </Link>
            </Flex>
          )}
          <BurgerMenu isUserAuthorized={isUserAuthorized} logout={logout} />
        </Space>
      </Flex>
    </Layout.Header>
  );
});

export default Header;

import { Button, Drawer, Flex, Row } from 'antd';
import { Link } from 'react-router-dom';
import { IBurgerMenu } from '../../lib/interfaces.ts';
import { useState } from 'react';

function BurgerMenu({ isUserAuthorized, logout }: IBurgerMenu) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        type="text"
        size={'large'}
        onClick={() => setVisible(true)}
        className={'flex md:hidden flex-col justify-around'}
      >
        <Row className="w-[30px] h-[2px] bg-grayLColor dark:bg-primaryColor"></Row>
        <Row className="w-[30px] h-[2px] bg-grayLColor dark:bg-primaryColor"></Row>
        <Row className="w-[30px] h-[2px] bg-grayLColor dark:bg-primaryColor"></Row>
      </Button>
      <Drawer
        className={'block md:hidden dark:bg-gray-300 '}
        title="Menu"
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Flex className={'dark:bg-gray-300'} vertical>
          <Link
            className={'text-[16px] leading-[2] hover:text-accentColor'}
            to={'/'}
            onClick={() => setVisible(false)}
          >
            Home
          </Link>
          <Link
            className={'text-[16px] leading-[2] hover:text-accentColor'}
            to={'/our-products'}
            onClick={() => setVisible(false)}
          >
            Our products
          </Link>
          {isUserAuthorized ? (
            <>
              <Link
                className={'text-[16px] leading-[2] hover:text-accentColor'}
                to={'/account'}
                onClick={() => setVisible(false)}
              >
                Account
              </Link>
              <Row
                className={'text-[16px] leading-[2] hover:text-accentColor cursor-pointer'}
                onClick={() => {
                  setVisible(false);
                  logout();
                }}
              >
                Logout
              </Row>
            </>
          ) : (
            <>
              <Link
                className={'text-[16px] leading-[2] hover:text-accentColor'}
                to={'/sign-in'}
                onClick={() => setVisible(false)}
              >
                Sign in
              </Link>
              <Link
                className={'text-[16px] leading-[2] hover:text-accentColor'}
                to={'/sign-up'}
                onClick={() => setVisible(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </Flex>
      </Drawer>
    </>
  );
}

export default BurgerMenu;

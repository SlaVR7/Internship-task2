import { Button, Drawer, Menu, Row } from 'antd';
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
        <Menu className={'dark:bg-gray-300'} mode="vertical">
          <Menu.Item key="1" onClick={() => setVisible(false)}>
            <Link to={'/'}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => setVisible(false)}>
            <Link to={'/our-products'}>Our products</Link>
          </Menu.Item>
          {isUserAuthorized ? (
            <>
              <Menu.Item key="3" onClick={() => setVisible(false)}>
                <Link to={'/account'}>Account</Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  setVisible(false);
                  logout();
                }}
              >
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="5" onClick={() => setVisible(false)}>
                <Link to={'/sign-in'}>Sign in</Link>
              </Menu.Item>
              <Menu.Item key="6" onClick={() => setVisible(false)}>
                <Link to={'/sign-up'}>Sign up</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Drawer>
    </>
  );
}

export default BurgerMenu;

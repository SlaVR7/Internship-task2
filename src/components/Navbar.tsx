import { FC, useState } from 'react';
import { Layout, Space } from 'antd';
import { Logo } from './index.ts';
import { Logout } from './icons';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { authorizedUser } from '../store/store.ts';
import { onSnapshot } from 'mobx-state-tree';

  const Navbar: FC = () => {
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    function logout() {
      authorizedUser.setAuthorizedUser(null);
    }

    onSnapshot(authorizedUser, (snapshot) => {
      setIsUserAuthorized(!!snapshot.authorizedUserId);
    })

  return (
    <Layout.Header onClick={() => console.log(authorizedUser.authorizedUserId)} style={{ display: 'flex', justifyContent: "space-between", background: 'white' }}>
      <Link to="/">
        <Logo />
      </Link>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/our-products">Our products</Link>
        <Link to="/about">About</Link>
      </Space>
      <Space>
        {isUserAuthorized ?
        <>
          <Link to="/account">{<UserOutlined />}</Link>
          <Link to="/" onClick={logout}>Logout <Logout /></Link>
        </>
          :
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        }
        <Link to="/cart">{<ShoppingCartOutlined />}</Link>
      </Space>
    </Layout.Header>

  )
};

export default Navbar;

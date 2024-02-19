import { FC } from 'react';
import { Layout, Space } from 'antd';
import { Logo } from './index.ts';
import { Logout } from './icons';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

  const Navbar: FC = () => {
  return (
    <Layout.Header style={{ display: 'flex', justifyContent: "space-between", background: 'white' }}>
      <Link to="/">
        <Logo />
      </Link>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/our-products">Our products</Link>
        <Link to="/about">About</Link>
      </Space>
      <Space>
        <Link to="/">theme</Link>
        <Link to="/our-products">{<ShoppingCartOutlined />}</Link>
        <Link to="/about">{<UserOutlined />}</Link>
        <Link to="/about">{<Logout />}</Link>
      </Space>
    </Layout.Header>

  )
};

export default Navbar;

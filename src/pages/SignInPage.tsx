import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { UserData } from '../lib/interfaces.ts';
import { authorizedUser, store } from '../store/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import { FieldType } from '../lib/types.ts';
import Title from 'antd/es/typography/Title';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.error({
      message: 'Failed',
      description: 'You have entered an incorrect username or password. Please, try again.',
    });
  };

  const successfulSignIn = (user: UserData) => {
    authorizedUser.setAuthorizedUser(user);
    navigate('/our-products');
  };

  const onFinish = (values: UserData) => {
    const users = store.users;
    console.log('users', users);
    const authorizedUser = users.find((user) => {
      console.log('AAuZZ', user, values);
      return user.username === values.username && user.password === values.password;
    });
    console.log('auth', authorizedUser);
    authorizedUser ? successfulSignIn(authorizedUser) : openNotificationWithIcon();
  };

  return (
    <>
      {contextHolder}
      <h3 className={'text-accentColor dark:text-primaryColor text-h3 font-bold pb-bigY'}>
        Sign In form:
      </h3>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Title level={2}>Don't have an account yet?</Title>
          <Link to={'/sign-up'} type="primary">
            <Button>Create an account</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInPage;

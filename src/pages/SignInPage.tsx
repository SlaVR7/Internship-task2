import React from 'react';
import { Button, Flex, Form, Input, notification } from 'antd';
import { UserData } from '../lib/interfaces.ts';
import { authorizedUser, store } from '../store/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import { FieldType } from '../lib/types.ts';
import classNames from 'classnames';

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
    const authorizedUser = users.find((user) => {
      return user.username === values.username && user.password === values.password;
    });
    authorizedUser ? successfulSignIn(authorizedUser) : openNotificationWithIcon();
  };

  return (
    <Flex vertical align={'center'} className={'min-h-[84.8vh] px-[20px] pt-[50px] pb-[auto] md:py-[100px] bg-gray-300 dark:bg-grayMColor overflow-x-hidden'}>
      {contextHolder}
      <h3 className={'mb-[20px] text-accentColor dark:text-primaryColor text-h3 font-bold'}>
        Sign In form:
      </h3>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder={'Your username'}/>
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder={'Your password'} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary"
                  htmlType="submit"
                  className={classNames(
                    'text-accentColor dark:text-secondaryColor',
                    'transition border-2 border-accentColor dark:border-secondaryColor',
                    'font-bold bg-none rounded-normal',
                    'h-[36px] px-6 active:scale-95 w-min whitespace-nowrap'
                  )}>
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <Form.Item>
        <Flex className={'mt-[50px] text-center text-accentColor dark:text-primaryColor text-h3 font-bold pb-[32px]'}>Don't have an account yet?</Flex>
        <Link className={'flex justify-center'} to={'/sign-up'} type="primary">
          <Button className={classNames(
            'text-accentColor dark:text-secondaryColor',
            'transition border-2 border-accentColor dark:border-secondaryColor',
            'font-bold bg-none rounded-normal',
            'h-[36px] px-6 active:scale-95 w-min whitespace-nowrap'
          )}>Create an account</Button>
        </Link>
      </Form.Item>
    </Flex>
  );
};

export default SignInPage;

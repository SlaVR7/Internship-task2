import React, { useState } from 'react';
import { Button, ConfigProvider, Flex, Form, Modal } from 'antd';
import { UserData } from '../lib/interfaces.ts';
import { store } from '../store/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import UserDataForm from '../components/Forms/UserDataForm.tsx';
import classNames from 'classnames';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/sign-in');
  };

  const onFinish = (values: UserData) => {
    store.addUser(values);
    setIsModalOpen(true);
  };

  return (
    <Flex
      vertical
      align={'center'}
      className={
        'min-h-[84.8vh] px-[20px] pt-[50px] pb-[auto] md:py-[100px] bg-gray-300 dark:bg-grayMColor'
      }
    >
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: '#626D58',
            },
          },
        }}
      >
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          okText={'Sign in'}
          onCancel={handleCancel}
          cancelText={'to Home page'}
        >
          <Title level={3}>You have successfully registered</Title>
          <p>You can sign in to your account</p>
        </Modal>
      </ConfigProvider>
      <Flex className={'text-accentColor dark:text-primaryColor text-h3 font-bold pb-[48px]'}>
        Registration form:
      </Flex>
      <UserDataForm onFinish={onFinish} />
      <Form.Item className={'mt-[51px] pt:w-[450px]'}>
        <Flex
          className={
            'text-center text-accentColor dark:text-primaryColor text-h3 font-bold pb-[48px]'
          }
        >
          Do you already have an account?
        </Flex>
        <Link to={'/sign-in'} className={'flex justify-center'} type="primary">
          <Button
            className={classNames(
              'text-accentColor dark:text-secondaryColor',
              'transition border-2 border-accentColor dark:border-secondaryColor',
              'font-bold bg-none rounded-normal',
              'h-[36px] px-6 active:scale-95 w-min whitespace-nowrap'
            )}
          >
            Sign in
          </Button>
        </Link>
      </Form.Item>
    </Flex>
  );
};

export default SignUpPage;

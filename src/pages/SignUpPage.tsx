import React, { useState } from 'react';
import { Button, ConfigProvider, Form, Modal } from 'antd';
import { UserData } from '../lib/interfaces.ts';
import { store } from '../store/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import UserDataForm from '../components/Forms/UserDataForm.tsx';

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
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: 'grey',
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
      <h3
        onClick={() => console.log(store.users)}
        className={'text-accentColor dark:text-primaryColor text-h3 font-bold pb-bigY'}
      >
        Registration form:
      </h3>
      <UserDataForm onFinish={onFinish} />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Title level={2}>Do you already have an account?</Title>
        <Link to={'/sign-in'} type="primary">
          <Button>Sign in</Button>
        </Link>
      </Form.Item>
    </>
  );
};

export default SignUpPage;

import { FC } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { IUserDataForm } from '../../lib/interfaces.ts';
import classNames from 'classnames';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UserDataForm: FC<IUserDataForm> = ({ userData, onFinish }) => {
  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select disabled style={{ width: 60 }}>
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      className={'pt:w-[450px]'}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={(data) => {
        onFinish(data);
        form.resetFields();
      }}
      initialValues={{ prefix: '7' }}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Your username', whitespace: true }]}
      >
        <Input placeholder={userData ? userData.username : 'Your name'} />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder={userData ? userData.email : 'Your email'} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder={userData ? userData.password : 'Your password'} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm your password" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder={userData ? userData.gender : 'Your gender '}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input
          type={'text'}
          addonBefore={prefixSelector}
          placeholder={userData ? userData.phone : 'Your phone number '}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
          }}
        />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please input your address' }]}
      >
        <Input.TextArea
          showCount
          maxLength={100}
          placeholder={userData ? userData.address : 'Your address '}
        />
      </Form.Item>

      {!userData && (
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="#">agreement</a>
          </Checkbox>
        </Form.Item>
      )}
      <Form.Item className={'flex justify-center'}>
        <Button
          type="primary"
          htmlType="submit"
          className={classNames(
            'text-accentColor dark:text-secondaryColor',
            'transition border-2 border-accentColor dark:border-secondaryColor',
            'font-bold bg-none rounded-normal',
            'h-[36px] px-6 active:scale-95 w-min whitespace-nowrap'
          )}
        >
          {userData ? 'Update' : 'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserDataForm;

import { FC, useState } from 'react';
import { authorizedUser, store } from '../store/store.ts';
import { IOrder, UserData } from '../lib/interfaces.ts';
import { Button, Flex, Popconfirm, Row, Table } from 'antd';
import UserDataForm from '../components/Forms/UserDataForm.tsx';
import { observer } from 'mobx-react-lite';

const AccountPageComponent: FC = () => {
  const user: UserData | undefined = store.users.find(
    (user) => user.id === authorizedUser.authorizedUserId
  );
  const [orders, setOrders] = useState<Array<IOrder>>(store.orders);

  const handleCancelOrder = (orderId: string) => {
    store.removeOrder(orderId);
    setOrders([...store.orders]);
  };

  const dataSource = orders.map((order, index) => {
    return {
      key: index.toString(),
      date: order.date?.toLocaleString(),
      products: order.productsData?.join(', '),
      address: user?.address,
      cost: Number(order.totalPrice).toFixed(2) + ' $',
      cancel: (
        <Popconfirm
          title="Cancel the order"
          description="Are you sure to cancel this order?"
          okText={<span style={{ color: 'red'}}>Yes</span>}
          cancelText="No"
          onConfirm={() => handleCancelOrder(order.orderId)}
        >
          <Button danger>Cancel order</Button>
        </Popconfirm>
      ),
    };
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: string) => (
        <>
          {products.split(', ').map((product, index) => (
            <div key={index}>{product}</div>
          ))}
        </>
      ),
    },
    {
      title: 'Shipping address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Total cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Cancel order',
      dataIndex: 'cancel',
      key: 'cancel',
    },
  ];

  const onFinish = (userData: UserData) => {
    user?.changeUserData(userData);
    console.log('updated');
  };

  return (
    <Flex className={'grow bg-gray-300 dark:bg-grayMColor'}>
      <Flex vertical className={'max-w-[1440px] mx-auto px-[100px] py-[50px]'}>
        <Row className={'text-accentColor dark:text-primaryColor text-h3 font-bold pb-[48px]'}>Hi, {user?.username}</Row>
        <Row className={'text-accentColor dark:text-primaryColor text-h4 font-bold pb-[22px]'}>Here you can view and change your credentials:</Row>
        <UserDataForm userData={user} onFinish={onFinish} />
        <Row className={'text-accentColor dark:text-primaryColor text-h4 font-bold mt-[22px] pb-[22px]'}>Here you can review your orders or cancel them:</Row>
        <Flex>
          <Table pagination={false} dataSource={dataSource} columns={columns} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const AccountPage = observer(AccountPageComponent);

export default AccountPage;

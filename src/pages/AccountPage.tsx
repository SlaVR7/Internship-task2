import { FC, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { authorizedUser, store } from '../store/store.ts';
import { IOrder, UserData } from '../lib/interfaces.ts';
import { Button, Flex, Popconfirm, Table } from 'antd';
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
      cost: order.totalPrice,
      cancel: (
        <Popconfirm
          title="Cancel the order"
          description="Are you sure to cancel this order?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleCancelOrder(order.orderId)}
        >
          <Button>Cancel order</Button>
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
    <>
      <Title level={1}>Hi, {user?.username}</Title>
      <Title level={2}>Here you can view and change your credentials</Title>
      <UserDataForm userData={user} onFinish={onFinish} />
      <Title level={2}>Here you can review your orders or cancel them</Title>
      <Flex>
        <Table dataSource={dataSource} columns={columns} />
      </Flex>
    </>
  );
};

const AccountPage = observer(AccountPageComponent);

export default AccountPage;

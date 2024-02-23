import { FC, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { authorizedUser, store } from '../store/store.ts';
import { IOrder, UserData } from '../lib/interfaces.ts';
import { Button, Flex, Popconfirm, Table } from 'antd';

const AccountPage: FC = () => {
  const userData: UserData | undefined = store.users.find(user => user.id === authorizedUser.authorizedUserId);
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
      address: userData?.address,
      cost: order.totalPrice,
      cancel: <Popconfirm
        title="Cancel the order"
        description="Are you sure to cancel this order?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => handleCancelOrder(order.orderId)}
      >
        <Button>Cancel order</Button>
      </Popconfirm>
    }
  })

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

  return (
    <>
      <Title level={1}>Hi, {userData?.username}</Title>
      <Title level={2}>Here you can review your orders or cancel them</Title>
      <Flex>
        <Table dataSource={dataSource} columns={columns} />
      </Flex>
    </>

  )
};

export default AccountPage;

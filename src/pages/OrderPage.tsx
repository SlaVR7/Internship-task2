import { useState } from 'react';
import { Button, Divider, Flex, Input, notification } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { PromoCode } from '../lib/enums.ts';
import { NotificationType } from '../lib/types.ts';
import CartList from '../components/Cart/CartList.tsx';
import { authorizedUser, store } from '../store/store.ts';
import { UserData } from '../lib/interfaces.ts';
import { countPrice } from '../lib/utils/countPrice.ts';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const productsInCart = store.products.filter((product) => product.quantityInCart);
  const totalSailedPrice = countPrice(productsInCart, true);
  const userData: UserData | undefined = store.users.find(
    (user) => user.id === authorizedUser.authorizedUserId
  );
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');
  const [isPromoCodeActive, setIsPromoCodeActive] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: type === 'success' ? PromoCode.Success : PromoCode.Fail,
    });
  };

  const handlePromoCode = () => {
    if (isPromoCodeActive) {
      setPromoCodeInputValue('');
      setIsPromoCodeActive(false);
    } else {
      if (promoCodeInputValue === PromoCode.Nature) {
        openNotificationWithIcon('success');
        setIsPromoCodeActive(true);
      } else {
        openNotificationWithIcon('error');
        setPromoCodeInputValue('');
      }
    }
  };

  const placeOrder = () => {
    const productsOrderData = productsInCart.map(
      (product) => `${product.name} (quantity: ${product.quantityInCart})`
    );
    store.addOrder(productsOrderData, new Date(), totalSailedPrice.toString());
    navigate('/account');
  };

  return (
    <>
      {contextHolder}
      <Title level={1}>Please check your order details</Title>
      <CartList isPromoCodeActive={isPromoCodeActive} isOrderPage={true} />
      <Flex>
        <Title>Do you have a promo code? Enter it here:</Title>
        <Flex vertical={true}>
          <Input
            value={promoCodeInputValue}
            disabled={isPromoCodeActive}
            placeholder={'Enter a promo code'}
            onChange={(e) => setPromoCodeInputValue(e.target.value)}
          />
          <Paragraph>{isPromoCodeActive && 'Promo code applied'}</Paragraph>
        </Flex>
        <Button onClick={handlePromoCode}>{isPromoCodeActive ? 'Reset' : 'Apply'}</Button>
      </Flex>
      <Divider />
      <Title level={2}>Shipping details:</Title>
      <p>Name: {userData?.username}</p>
      <p>Address: {userData?.address}</p>
      <p>Tel: {userData?.phone}</p>
      <Divider />
      <Button onClick={placeOrder}>Place an order</Button>
    </>
  );
};

export default OrderPage;

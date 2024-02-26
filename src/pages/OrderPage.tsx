import { useState } from 'react';
import { Button, Divider, Flex, Input, notification, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { PromoCode } from '../lib/enums.ts';
import { NotificationType } from '../lib/types.ts';
import CartList from '../components/Cart/CartList.tsx';
import { authorizedUser, store } from '../store/store.ts';
import { UserData } from '../lib/interfaces.ts';
import { countPrice } from '../lib/utils/countPrice.ts';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

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
  const currentDate = new Date();
  const deliveryDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

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
    <Flex className={'grow bg-gray-300 dark:bg-grayMColor'}>
      <Flex
        vertical
        className={'max-w-[1440px] mx-auto px-[25px] md:px-[100px] py-[50px] w-[100%]'}
      >
        {contextHolder}
        <Row
          className={'text-accentColor dark:text-accentDarkColor text-[36px] font-bold pb-[48px]'}
        >
          Please, check your order details:
        </Row>
        <CartList isPromoCodeActive={isPromoCodeActive} isOrderPage={true} />
        <Flex justify={'space-between'} className={'mt-[30px] flex-col lg:flex-row'}>
          <Row
            className={'text-accentColor dark:text-accentDarkColor text-[24px] font-bold pb-[48px]'}
          >
            Do you have a promo code? Enter it here:
          </Row>
          <Flex gap={10}>
            <Flex vertical={true}>
              <Input
                onPressEnter={handlePromoCode}
                value={promoCodeInputValue}
                disabled={isPromoCodeActive}
                placeholder={'Enter a promo code'}
                onChange={(e) => setPromoCodeInputValue(e.target.value)}
              />
              <Paragraph>{isPromoCodeActive && 'Promo code applied'}</Paragraph>
            </Flex>
            <Button
              className={classNames(
                'text-accentColor dark:text-secondaryColor',
                'transition border-2 border-accentColor dark:border-secondaryColor',
                'font-bold bg-none rounded-normal',
                'px-6 active:scale-95 w-min whitespace-nowrap'
              )}
              onClick={handlePromoCode}
            >
              {isPromoCodeActive ? 'Reset' : 'Apply'}
            </Button>
          </Flex>
        </Flex>
        <Divider className={'bg-accentColor dark:bg-black h-[2px] my-[12px]'} />
        <Row className="text-h3 text-accentColor dark:text-basicColor font-bold md:text-start">
          Shipping details:
        </Row>
        <Row className={'text-grayMColor dark:text-black text-[22px] font-bold '}>
          Name:&nbsp;
          <Row className={'text-black dark:text-accentDarkColor text-[22px] font-bold '}>
            {userData?.username}
          </Row>
        </Row>
        <Row className={'text-grayMColor dark:text-black text-[22px] font-bold '}>
          Address:&nbsp;
          <Row className={'text-black dark:text-accentDarkColor text-[22px] font-bold '}>
            {userData?.address}
          </Row>
        </Row>
        <Row className={'text-grayMColor dark:text-black text-[22px] font-bold '}>
          Tel:&nbsp;
          <Row className={'text-black dark:text-accentDarkColor text-[22px] font-bold '}>
            {userData?.phone}
          </Row>
        </Row>
        <Row className={'text-grayMColor dark:text-black text-[22px] font-bold '}>
          Email:&nbsp;
          <Row className={'text-black dark:text-accentDarkColor text-[22px] font-bold '}>
            {userData?.email}
          </Row>
        </Row>
        <Row className={'text-grayMColor dark:text-black text-[22px] font-bold '}>
          Estimated delivery date:&nbsp;
          <Row className={'text-black dark:text-accentDarkColor text-[22px] font-bold '}>
            {deliveryDate.toDateString()}
          </Row>
        </Row>
        <Divider />
        <Button
          type={'primary'}
          className={classNames(
            'transition text-secondaryColor text-[16px] font-bold',
            'bg-accentColor dark:bg-accentDarkColor',
            'rounded-normal h-[74px] px-12 w-min whitespace-nowrap'
          )}
          onClick={placeOrder}
        >
          Place an order
        </Button>
      </Flex>
    </Flex>
  );
};

export default OrderPage;

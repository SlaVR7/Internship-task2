import { FC, useState } from 'react';
import { EmptyCart } from '../components/Cart/EmptyCart.tsx';
import { store } from '../store/store.ts';
import { Button, Divider, Flex, Input, Modal, notification, Popconfirm } from 'antd';
import NamedBanner from '../components/NamedBanner.tsx';
import { CartListItem } from '../components/Cart/CartListItem.tsx';
import { onSnapshot } from 'mobx-state-tree';
import { ProductCardProps } from '../lib/interfaces.ts';
import Title from 'antd/es/typography/Title';
import { PromoCode } from '../lib/enums.ts';
import { NotificationType } from '../lib/types.ts';
import Paragraph from 'antd/es/typography/Paragraph';
import { countPrice } from '../lib/utils/countPrice.ts';
import { useNavigate } from 'react-router-dom';

const CartPage: FC = () => {
  const productsInCart= store.products.filter(product => product.quantityInCart)
  const [currentCartProducts, setProductsIdInCart] = useState<Array<ProductCardProps>>(productsInCart);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');
  const [isPromoCodeActive, setIsPromoCodeActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState(countPrice(productsInCart, false));
  const [totalSailedPrice, setTotalSailedPrice] = useState(countPrice(productsInCart, true));
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: type === 'success' ? PromoCode.Success : PromoCode.Fail,
  })};

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
  }

  onSnapshot(store, (snapshot) => {
    const productsInCart = snapshot.products.filter(product => product.quantityInCart);
    setProductsIdInCart(productsInCart);

    const totalSailedPrice = countPrice(productsInCart, true);
    const totalPrice = countPrice(productsInCart, false);

    setTotalSailedPrice(totalSailedPrice);
    setTotalPrice(totalPrice);
  })

  const confirm = () => {
    productsInCart.forEach(product => product.removeFromCart());
    setProductsIdInCart([]);
  }

  const addOrder = () => {
    const productsOrderData = productsInCart.map(product => `${product.name} (quantity: ${product.quantityInCart})`)
    store.addOrder(productsOrderData, new Date(), totalSailedPrice.toString());
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/account');
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/our-products');
  }

  return (
    <>
      {contextHolder}
      <NamedBanner title={'MY CART'} />
      <Modal title="Basic Modal" open={isModalOpen} okText={'To my account'} cancelText={'Continue shopping'} onOk={handleOk} onCancel={handleCancel}>
        <p>The order has been placed. We have already started to assemble it. You can view the list of your orders in your personal account or continue shopping.</p>
      </Modal>
      {currentCartProducts.length ? (
        <>
          <Flex vertical={true} className='border-b-2 border-accentColor dark:border-basicColor'>
            <div className='border-b-2 border-accentColor dark:border-basicColor p-4 flex justify-between items-center mb-4'>
              <h3 className='text-h3 text-accentColor dark:text-basicColor font-bold md:text-start'>
                My list of products
              </h3>
              <Popconfirm
                title="Clean the cart"
                description="Are you sure to clean the cart?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Clean</Button>
              </Popconfirm>
            </div>
            {currentCartProducts.map((product) =>
              <CartListItem productId={product.id} key={product.id} />
            )}
          </Flex>
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
          <div>
            <div className='flex justify-between text-grayMColor dark:accent-accentColor text-h3 font-bold line-through'>
              {totalPrice}
            </div>
            {isPromoCodeActive ? (
              <div className="flex justify-between text-h3 font-bold">
                <h3>Total price:</h3>
                <p>{totalSailedPrice && totalSailedPrice * PromoCode.SaleRatio}</p>
              </div>
            ) : (
              <div className="flex text-h3 font-bold">
                <h3>Total price:</h3>
                <p>{totalSailedPrice}</p>
              </div>
            )}
          </div>
          <Divider />
          <Button onClick={addOrder}>Place an order</Button>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default CartPage;

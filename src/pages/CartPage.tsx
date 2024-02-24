import { FC, useState } from 'react';
import { EmptyCart } from '../components/Cart/EmptyCart.tsx';
import { authorizedUser, store } from '../store/store.ts';
import { Button, Flex, Modal, Popconfirm } from 'antd';
import NamedBanner from '../components/NamedBanner.tsx';
import { ProductCardProps } from '../lib/interfaces.ts';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CartList from '../components/Cart/CartList.tsx';

const CartPageComponent: FC = () => {
  const productsInCart = store.products.filter((product) => product.quantityInCart);
  const [currentCartProducts, setProductsIdInCart] =
    useState<Array<ProductCardProps>>(productsInCart);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const navigate = useNavigate();

  const confirm = () => {
    productsInCart.forEach((product) => product.removeFromCart());
    setProductsIdInCart([]);
  };

  const goToCheckout = () => {
    const isUserAuthorized = !!authorizedUser.authorizedUserId;
    isUserAuthorized ? navigate('/order') : setIsFailModalOpen(true);
  };

  return (
    <>
      <NamedBanner title={'MY CART'} />
      <Modal
        title="You need to sign in"
        open={isFailModalOpen}
        okText={'Sign in'}
        cancelText={'Sign up'}
        onOk={() => navigate('/sign-in')}
        onCancel={() => navigate('/sign-up')}
      >
        <p>Please sign in to your account or create a new one to place an order</p>
      </Modal>
      {currentCartProducts.length ? (
        <>
          <Flex vertical={true} className="border-b-2 border-accentColor dark:border-basicColor">
            <Popconfirm
              title="Clean the cart"
              description="Are you sure to clean the cart?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Clean cart</Button>
            </Popconfirm>
          </Flex>
          <CartList isPromoCodeActive={false} isOrderPage={false} />
          <Button onClick={goToCheckout}>Go to checkout</Button>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const CartPage = observer(CartPageComponent);

export default CartPage;

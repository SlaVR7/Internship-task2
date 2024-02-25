import { FC, useState } from 'react';
import { EmptyCart } from '../components/Cart/EmptyCart.tsx';
import { authorizedUser, store } from '../store/store.ts';
import { Button, Flex, Modal, Popconfirm } from 'antd';
import NamedBanner from '../components/NamedBanner.tsx';
import { ProductCardProps } from '../lib/interfaces.ts';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CartList from '../components/Cart/CartList.tsx';
import classNames from 'classnames';

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
        okText={<span className={'text-black'}>Sign in</span>}
        cancelText={'Sign up'}
        onOk={() => navigate('/sign-in')}
        onCancel={() => navigate('/sign-up')}
      >
        <p>Please sign in to your account or create a new one to place an order</p>
      </Modal>
      {currentCartProducts.length ? (
        <Flex vertical align={'center'} className={'max-w-[1240px] mx-[auto] py-[50px] px-[25px] md:px-[100px]'}>
          <CartList isPromoCodeActive={false} isOrderPage={false} />
          <Flex justify={'space-between'} className={'w-[100%] mt-[30px]'}>
            <Flex vertical={true} className="border-accentColor dark:border-basicColor">
              <Popconfirm
                title="Clean the cart"
                description="Are you sure to clean the cart?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button className={classNames(
                  'dark:text-secondaryColor',
                  'transition border-2 dark:border-secondaryColor',
                  'font-bold bg-none rounded-normal',
                  'h-[32px] md:px-12 active:scale-95 ml-[auto] md:w-[200px] whitespace-nowrap'
                )} danger>Clean cart</Button>
              </Popconfirm>
            </Flex>
            <Button onClick={goToCheckout}>Go to checkout</Button>
          </Flex>
        </Flex>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const CartPage = observer(CartPageComponent);

export default CartPage;

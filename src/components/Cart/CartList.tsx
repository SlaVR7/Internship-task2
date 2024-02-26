import { FC, useState } from 'react';
import { Divider, Flex, Row } from 'antd';
import { ICartList, ProductCardProps } from '../../lib/interfaces.ts';
import { store } from '../../store/store.ts';
import { countPrice } from '../../lib/utils/countPrice.ts';
import { onSnapshot } from 'mobx-state-tree';
import { PromoCode } from '../../lib/enums.ts';
import { CartListItem } from './../../components';

const CartList: FC<ICartList> = ({ isPromoCodeActive, isOrderPage }) => {
  const productsInCart = store.products.filter((product) => product.quantityInCart);
  const [currentCartProducts, setProductsIdInCart] =
    useState<Array<ProductCardProps>>(productsInCart);
  const [totalPrice, setTotalPrice] = useState(countPrice(productsInCart, false));
  const [totalSailedPrice, setTotalSailedPrice] = useState(countPrice(productsInCart, true));

  onSnapshot(store, (snapshot) => {
    const productsInCart = snapshot.products.filter((product) => product.quantityInCart);
    setProductsIdInCart(productsInCart);

    const totalSailedPrice = countPrice(productsInCart, true);
    const totalPrice = countPrice(productsInCart, false);

    setTotalSailedPrice(totalSailedPrice);
    setTotalPrice(totalPrice);
  });

  return (
    <>
      {currentCartProducts.length && (
        <>
          <Flex
            vertical={true}
            className="border-b-2 border-accentColor dark:border-basicColor w-full"
          >
            <Row className="text-h3 text-accentColor dark:text-basicColor font-bold md:text-start">
              My list of products
            </Row>
            <Divider className={'bg-accentColor dark:bg-black h-[2px] my-[12px]'} />
            {currentCartProducts.map((product) => (
              <CartListItem productId={product.id} key={product.id} readOnly={isOrderPage} />
            ))}
          </Flex>
          <Divider className={'bg-accentColor dark:bg-black h-[2px] my-[12px]'} />
          {totalPrice !== totalSailedPrice && (
            <Flex className="text-grayMColor dark:text-black text-[20px] md:text-h3 font-bold flex justify-between">
              <Row className={'text-[24px]'}>Price without discounts:&nbsp;</Row>
              <Row className={'text-[24px] line-through text-nowrap'}>
                {totalPrice.toFixed(2)} $
              </Row>
            </Flex>
          )}
          {isPromoCodeActive ? (
            <Flex className="flex justify-between text-[24px] md:text-h3 font-bold">
              <Row className={'text-[24px]'}>Total price:&nbsp;</Row>
              <Row className={'text-[24px]'}>
                {totalSailedPrice && (totalSailedPrice * PromoCode.SaleRatio).toFixed(2)} $
              </Row>
            </Flex>
          ) : (
            <Flex className="justify-between text-[24px] md:text-h3 font-bold">
              <Row className={'text-[24px]'}>Total price:&nbsp;</Row>
              <Row className={'text-[24px]'}>{totalSailedPrice.toFixed(2)} $</Row>
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default CartList;

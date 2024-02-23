import { FC, useState } from 'react';
import {  Divider, Flex } from 'antd';
import { CartListItem } from './CartListItem.tsx';
import {  ICartList, ProductCardProps } from '../../lib/interfaces.ts';
import { store } from '../../store/store.ts';

import { countPrice } from '../../lib/utils/countPrice.ts';
import { onSnapshot } from 'mobx-state-tree';
import { PromoCode } from '../../lib/enums.ts';

const CartList: FC<ICartList> = ({ isPromoCodeActive, isOrderPage }) => {
  const productsInCart= store.products.filter(product => product.quantityInCart);
  const [currentCartProducts, setProductsIdInCart] = useState<Array<ProductCardProps>>(productsInCart);
  const [totalPrice, setTotalPrice] = useState(countPrice(productsInCart, false));
  const [totalSailedPrice, setTotalSailedPrice] = useState(countPrice(productsInCart, true));

  onSnapshot(store, (snapshot) => {
    const productsInCart = snapshot.products.filter(product => product.quantityInCart);
    setProductsIdInCart(productsInCart);

    const totalSailedPrice = countPrice(productsInCart, true);
    const totalPrice = countPrice(productsInCart, false);

    setTotalSailedPrice(totalSailedPrice);
    setTotalPrice(totalPrice);
  })

  return (
    <>
      {currentCartProducts.length && (
        <>
          <Flex vertical={true} className='border-b-2 border-accentColor dark:border-basicColor'>
            <h3 className='text-h3 text-accentColor dark:text-basicColor font-bold md:text-start'>
              My list of products
            </h3>
            {currentCartProducts.map((product) =>
              <CartListItem productId={product.id}
                            key={product.id}
                            readOnly={isOrderPage}
              />
            )}
          </Flex>
          <Divider />
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
        </>
      )}
    </>

  );
};

export default CartList;

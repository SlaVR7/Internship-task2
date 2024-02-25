import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { store } from '../../store/store.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { CartItem } from '../../lib/interfaces.ts';
import { Button, Flex } from 'antd';

export function CartListItem({ productId, readOnly }: CartItem) {
  const cartProduct = store.products.find((product) => product.id === productId);
  const [quantityInCart, setQuantityInCart] = useState(cartProduct?.quantityInCart);

  const handleAddToCart = (quantity: number) => {
    cartProduct?.addToCart(quantity);
    setQuantityInCart(cartProduct?.quantityInCart);
  };

  return (
    <div className="p-4 border-2 border-dotted border-accentColor dark:border-basicColor rounded-normal w-full mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
      <div className="flex items-center justify-start mb-4 md:mb-0">
        <div className="border-2 border-accentColor dark:border-basicColor rounded-normal overflow-hidden flex justify-center items-center w-[100px] h-[100px] shrink-0 mr-4">
          <img className="w-full h-full object-cover" src={cartProduct?.imageSrc[0]} alt=""></img>
        </div>
        <NavLink to={`/${cartProduct?.link}` || '/'}>
          <h3 className="text-[16px] text-accentColor dark:text-basicColor font-bold mr-2 text-center md:text-start hover:text-accentDarkColor dark:hover:text-accentDarkColor">
            {cartProduct?.name}
          </h3>
          {cartProduct?.salePrice && (
            <div
              className={
                'mt-2 px-2 py-1 h-min bg-red-500/90 text-primaryColor font-bold inline-block'
              }
            >
              SALE
            </div>
          )}
        </NavLink>
      </div>
      <Flex align={'center'} vertical={readOnly} wrap={'wrap'}>
        <div>
          {cartProduct?.salePrice ? (
            <>
              <p className="text-[16px] line-through text-red-500 dark:accent-accentColor mr-4">
                {readOnly && cartProduct.salePrice
                  ? `Price per 1: ${cartProduct.price.toFixed(2)}`
                  : cartProduct.price.toFixed(2)}{' '}
                $
              </p>
              <p className="text-[16px] mr-4 text-accentColor dark:text-black">
                {readOnly ? `Price per 1: ${cartProduct.salePrice.toFixed(2)}` : cartProduct.salePrice.toFixed(2)} $
              </p>
            </>
          ) : (
            <p className="text-[16px] mr-4 text-accentColor dark:text-black">
              {readOnly ? `Price per 1: ${cartProduct?.price.toFixed(2)}` : cartProduct?.price.toFixed(2)} $
            </p>
          )}
        </div>
        <div className="flex mr-4">
          {!readOnly && (
            <Button
              disabled={cartProduct?.quantityInCart === 1}
              onClick={() => handleAddToCart(-1)}
              className="cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-graySColor hover:bg-grayMColor transition"
            >
              -
            </Button>
          )}
          <p className={'text-[16px] px-[10px] py-[5px]'}>{readOnly ? `Quantity: ${quantityInCart} peaces` : quantityInCart}</p>

          {!readOnly && (
            <Button
              onClick={() => handleAddToCart(1)}
              className="cursor-pointer flex justify-center items-center  w-[30px] h-[30px] bg-graySColor hover:bg-grayMColor transition"
            >
              +
            </Button>
          )}
        </div>
        <p className="text-[16px] font-bold mr-2">
          {readOnly && 'Total price: '}
          {cartProduct?.salePrice
            ? cartProduct?.salePrice && (cartProduct.salePrice * cartProduct.quantityInCart).toFixed(2)
            : cartProduct?.price && (cartProduct.price * cartProduct.quantityInCart).toFixed(2)}{' '}
          $
        </p>

        {!readOnly && (
          <button onClick={() => cartProduct?.removeFromCart()}>
            <DeleteOutlined className={'text-[24px]'} />
          </button>
        )}
      </Flex>
    </div>
  );
}

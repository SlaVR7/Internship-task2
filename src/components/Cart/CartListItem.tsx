import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { store } from '../../store/store.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { CartItem } from '../../lib/interfaces.ts';
import { Flex } from 'antd';

export function CartListItem({productId, readOnly}: CartItem) {
  const cartProduct = store.products.find(product => product.id === productId);
  const [quantityInCart, setQuantityInCart] = useState(cartProduct?.quantityInCart);

  const handleAddToCart = (quantity: number) => {
    cartProduct?.addToCart(quantity);
    setQuantityInCart(cartProduct?.quantityInCart);
  };

  return (
    <div className='p-4 border-2 border-dotted border-accentColor dark:border-basicColor rounded-normal w-full mb-4 flex flex-col md:flex-row items-start md:items-center justify-between'>
      <div className='flex items-center  justify-start mb-4 md:mb-0'>
        <div className='border-2 border-accentColor dark:border-basicColor rounded-normal overflow-hidden flex justify-center items-center w-[100px] h-[100px] shrink-0 mr-4'>
          <img className='w-full h-full object-cover' src={cartProduct?.imageSrc[0]} alt=''></img>
        </div>
        <NavLink to={`/${cartProduct?.link}` || '/'}>
          <h3 className='text-accentColor dark:text-basicColor font-bold mr-2 text-center md:text-start hover:text-accentDarkColor dark:hover:text-accentDarkColor'>
            {cartProduct?.name}
          </h3>
          {cartProduct?.salePrice && (
            <div className={'mt-2 px-2 py-1 h-min bg-red-500/90 text-primaryColor font-bold inline-block'}>SALE</div>
          )}
        </NavLink>
      </div>
      <Flex align={'center'} vertical={readOnly} wrap={'wrap'}>
        <div>
          {cartProduct?.salePrice ? (
            <>
              <p className='line-through text-grayMColor dark:accent-accentColor mr-4'>
                {readOnly && cartProduct.salePrice ? `Price per 1: ${cartProduct.price}` : cartProduct.price} $
              </p>
              <p className='mr-4'>
                {readOnly ? `Price per 1: ${cartProduct.salePrice}` : cartProduct.salePrice} $
              </p>
            </>
          ) : (
            <p className='mr-4'>{readOnly ? `Price per 1: ${cartProduct?.price}` : cartProduct?.price} $</p>
          )}
        </div>
        <div className='flex mr-4'>
          {!readOnly && <button
            disabled={cartProduct?.quantityInCart === 1}
            onClick={() => handleAddToCart(-1)}
            className="cursor-pointer flex justify-center items-center w-[20px] bg-graySColor hover:bg-grayMColor transition"
          >
            -
          </button>}
          <p>{readOnly ? `Quantity: ${quantityInCart} peaces` :  quantityInCart}</p>

          {!readOnly && <button
            onClick={() => handleAddToCart(1)}
            className="cursor-pointer flex justify-center items-center w-[20px] bg-graySColor hover:bg-grayMColor transition"
          >
            +
          </button>}
        </div>
        <p className='font-bold mr-2'>
          {readOnly && 'Total price: '}
          {cartProduct?.salePrice ? (
            cartProduct?.salePrice && cartProduct.salePrice * cartProduct.quantityInCart
          ) : (
            cartProduct?.price && cartProduct.price * cartProduct.quantityInCart
          )} $
        </p>

        {!readOnly && <button onClick={() => cartProduct?.removeFromCart()}>
          <DeleteOutlined />
        </button>}
      </Flex>
    </div>
  );
}

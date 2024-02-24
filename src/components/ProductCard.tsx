import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Flex, Image } from 'antd';
import { store } from '../store/store.ts';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ArrayIndex } from '../lib/enums.ts';

function ProductCardComponent({ productId }: { productId: string }) {
  const navigate = useNavigate();
  const storeProduct = store.products.find((storeProduct) => storeProduct.id === productId);

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
    storeProduct?.quantityInCart ? storeProduct.removeFromCart() : storeProduct?.addToCart(1);
  }

  return (
    <Flex
      vertical={true}
      onClick={() => storeProduct && navigate(`/${storeProduct.link}`)}
      className={classNames(
        'cursor-pointer relative transition w-[280px]',
        'hover:scale-[1.02] hover:drop-shadow-lg active:scale-100 active:drop-shadow-none'
      )}
    >
      <Image
        preview={false}
        height={'300px'}
        width={'280px'}
        className="object-cover"
        src={storeProduct?.imageSrc[0]}
        alt="product image"
      />
      <div className="z-20 w-full absolute bottom-[8rem]">
        <Button
          className={classNames(
            'rounded-none border-none transition',
            'text-secondaryColor font-bold bg-accentColor/80 hover:bg-accentDarkColor/80 dark:hover:bg-grayLColor',
            'h-[30px] w-full px-12'
          )}
          onClick={handleClick}
        >
          {storeProduct?.quantityInCart ? 'Already in Cart' : 'Add to Cart'}
        </Button>
      </div>
      <Flex
        vertical={true}
        justify={'space-between'}
        className="h-[130px] bg-additionalColor dark:bg-graySColor text-left p-4"
      >
        <Flex className="leading-5 text-[20px] text-center font-semibold text-grayLColor dark:text-secondaryColor">
          {storeProduct?.name}
        </Flex>
        <Flex vertical={true}>
          <Flex className={'m-0 text-[1rem]'}>
            Natural {storeProduct?.categories[ArrayIndex.FirstElement]}
          </Flex>
          <Flex justify={'space-between'} align={'end'}>
            {storeProduct?.salePrice ? (
              <>
                <Flex className="text-h5 font-semibold text-grayLColor">
                  {storeProduct?.salePrice} $
                </Flex>
                <Flex className="text-[1rem] line-through text-graySColor dark:text-grayMColor">
                  {storeProduct?.price} $
                </Flex>
                <Flex className="font-bold absolute z-10 top-[25px] right-0 bg-red-500/90 p-2 pr-sm align-middle text-primaryColor">
                  SALE
                </Flex>
              </>
            ) : (
              <>
                <Flex className="text-h5 font-semibold text-grayLColor">
                  {storeProduct?.price} $
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

const ProductCard = observer(ProductCardComponent);
export default ProductCard;

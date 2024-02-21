import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Flex, Image } from 'antd';
import { store } from '../store/store.ts';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { ArrayIndex } from '../lib/enums.ts';

function ProductCardComponent( {productId}: {productId: string}) {
  const navigate = useNavigate();
  const storeProduct = store.products.find(storeProduct=> storeProduct.id === productId);

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
    storeProduct && storeProduct.toggleIsInCart();
  }

  return (
    <Flex vertical={true}
      onClick={() => storeProduct && navigate(storeProduct.link)}
      className={classNames(
        'cursor-pointer relative transition w-[280px]',
        'hover:scale-[1.02] hover:drop-shadow-lg active:scale-100 active:drop-shadow-none'
      )}
    >
      <Image preview={false} height={'300px'} width={'280px'} className='object-cover' src={storeProduct?.imageSrc[0]} alt='product image' />
      <Button onClick={handleClick}>{storeProduct?.isInCart ? 'Already in Cart' : 'Add to Cart'}</Button>
      <Flex vertical={true} justify={'justify-between'} className='h-[130px] bg-additionalColor dark:bg-graySColor text-left p-4'>
        <Title level={4}  className='text-center font-semibold text-grayLColor dark:text-secondaryColor'>{storeProduct?.name}</Title>
        <Title style={{margin: 0}} level={5}>Natural {storeProduct?.categories[ArrayIndex.FirstElement]}</Title>
        <Flex justify={'space-between'} align={'end'}>
          {storeProduct?.salePrice ? (
            <>
              <Paragraph className='text-h5 font-semibold text-grayLColor'>{storeProduct?.salePrice} $</Paragraph>
              <Paragraph className='line-through text-graySColor dark:text-grayMColor'>{storeProduct?.price} $</Paragraph>
              <Paragraph className='font-bold absolute z-10 top-[25px] right-0 bg-red-500/90 p-2 pr-sm align-middle text-primaryColor'>
                SALE
              </Paragraph>
            </>
          ) : (
            <>
              <Paragraph className='text-h5 font-semibold text-grayLColor'>{storeProduct?.price} $</Paragraph>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

const ProductCard = observer(ProductCardComponent);
export default ProductCard;

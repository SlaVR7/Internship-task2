import { store } from '../../store/store.ts';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';
import ProductCard from '../ProductCard.tsx';
import shuffleCards from '../../lib/utils/shuffleCards.ts';
import classNames from 'classnames';

export default function RandomCardsSection() {
  const [productsId, setProductsId] = useState<string[] | null>(null);

  useEffect(() => {
    const shuffledProductsId: string[] = shuffleCards([...store.products])
      .slice(0, 6)
      .map((product) => product.id);
    setProductsId(shuffledProductsId);
  }, []);

  return (
    <Flex className="bg-primaryColor dark:bg-grayMColor h-auto p-sm text-center px-big flex flex-col items-center">
      <Flex className="m-0 text-basicColor dark:text-secondaryColor text-h3 text-center font-bold whitespace-nowrap">
        You may like it
      </Flex>
      <Flex
        gap={'50px'}
        wrap={'wrap'}
        justify={'space-around'}
        className="mt-sm max-w-[1245px] pb-bigY"
      >
        {productsId?.map(
          (productId): ReactNode => <ProductCard productId={productId} key={productId} />
        )}
      </Flex>
      <Link to={'./our-products'}>
        <Button
          className={classNames(
            'text-accentColor dark:text-secondaryColor',
            'transition border-2 border-accentColor dark:border-secondaryColor',
            'font-bold bg-none rounded-normal',
            'h-[74px] px-12 active:scale-95 w-min whitespace-nowrap'
          )}
        >
          Show More
        </Button>
      </Link>
    </Flex>
  );
}

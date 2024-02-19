import { store } from '../../store/store.ts';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Flex } from 'antd';
import ProductCard from '../ProductCard.tsx';
import shuffleCards from '../../lib/utils/shuffleCards.ts';
import Title from 'antd/es/typography/Title';

export default function RandomCardsSection() {
  const [productsId, setProductsId] = useState<string[] | null>(null);

  useEffect(() => {
    const shuffledProductsId: string[] = shuffleCards([...store.products]).slice(0, 6).map(product => product.id)
    setProductsId(shuffledProductsId);
  }, []);

  return (
    <Card className='bg-primaryColor dark:bg-grayMColor h-auto p-sm text-center px-big flex flex-col items-center'>
      <Title level={3} className='text-basicColor dark:text-secondaryColor text-h3 text-center font-bold whitespace-nowrap'>
        You may like it
      </Title>
      <Flex gap={'50px'} wrap={'wrap'} justify={'space-around'} className='mt-sm max-w-[1245px] pb-sm '>
        {productsId?.map((productId): ReactNode =>
          <ProductCard productId={productId} key={productId}/>)}
      </Flex>
      <Link to={'./our-products'}>
        <Button>Show More</Button>
      </Link>
    </Card>
  );
}

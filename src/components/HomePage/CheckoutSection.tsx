import Title from "antd/es/typography/Title";
import { Button, Card, Carousel, Flex, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef} from 'react';
import CategoryCard from './CategoryCard.tsx';
import { CarouselRef } from 'antd/lib/carousel';

export default function CheckoutSection() {
  const ref = useRef<CarouselRef>(null);

  return (
    <Card className='bg-secondaryColor dark:bg-grayLColor h-auto p-sm'>
      <Title level={3} className='text-basicColor dark:text-secondaryColor text-h3 text-center font-bold'>
        Check out our product categories
      </Title>
      <Flex className={'items-center justify-between'}>
        <Button onClick={() => ref.current && ref.current.prev()} shape="circle" size={'large'} icon={<LeftOutlined />} />
        <Carousel ref={ref} className={'max-w-[1200px]'}>
          <Space>
            <Flex>
              <CategoryCard path="./images/candle.png" name="Aroma sachet" link="/our-products/decor/candles" />
              <CategoryCard path="./images/soap.png" name="Soap" link="/our-products/decor/soap" />
              <CategoryCard path="./images/scrub.png" name="Scrubs" link="/our-products/decor/scrub" />
            </Flex>
          </Space>
          <Space>
            <Flex>
              <CategoryCard path='./images/sachet.png' name="Candle" link="/our-products/decor/sachet" />
              <CategoryCard path='./images/bombs.png' name="Bath bombs" link="/our-products/decor/bombs" />
              <CategoryCard path='./images/sales.png' name="Sales" link="/our-products/sale" />
            </Flex>
          </Space>
        </Carousel>
        <Button onClick={() => ref.current &&  ref.current.next()} shape="circle" size={'large'} icon={<RightOutlined />} />
      </Flex>
    </Card>
  );
}

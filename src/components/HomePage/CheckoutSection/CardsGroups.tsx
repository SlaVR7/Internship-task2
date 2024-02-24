import CategoryCard from '../CategoryCard.tsx';
import { Carousel, Flex, Space } from 'antd';
import { FC } from 'react';
import { ICarouselRef } from '../../../lib/interfaces.ts';

export const CarouselScreens: FC<ICarouselRef> = ({ carouselRef }) => {
  return (
    <Carousel autoplay ref={carouselRef} dots={false} className={'hidden lg:block max-w-[1000px]'}>
      <Space>
        <Flex justify={'space-between'}>
          <CategoryCard
            path="./images/candle.png"
            name="Aroma sachet"
            link="/our-products/decor/candles"
          />
          <CategoryCard path="./images/soap.png" name="Soap" link="/our-products/decor/soap" />
          <CategoryCard path="./images/scrub.png" name="Scrubs" link="/our-products/decor/scrub" />
        </Flex>
      </Space>
      <Space>
        <Flex justify={'space-between'}>
          <CategoryCard
            path="./images/sachet.png"
            name="Candle"
            link="/our-products/decor/sachet"
          />
          <CategoryCard
            path="./images/bombs.png"
            name="Bath bombs"
            link="/our-products/decor/bombs"
          />
          <CategoryCard path="./images/sales.png" name="Sales" link="/our-products/sale" />
        </Flex>
      </Space>
    </Carousel>
  );
};

export const CardsGroupMobile: FC<ICarouselRef> = ({ carouselRef }) => {
  return (
    <Carousel autoplay ref={carouselRef} dots={false} className={'max-w-[300px]'}>
      <CategoryCard
        path="./images/candle.png"
        name="Aroma sachet"
        link="/our-products/decor/candles"
      />
      <CategoryCard path="./images/soap.png" name="Soap" link="/our-products/decor/soap" />
      <CategoryCard path="./images/scrub.png" name="Scrubs" link="/our-products/decor/scrub" />
      <CategoryCard path="./images/sachet.png" name="Candle" link="/our-products/decor/sachet" />
      <CategoryCard path="./images/bombs.png" name="Bath bombs" link="/our-products/decor/bombs" />
      <CategoryCard path="./images/sales.png" name="Sales" link="/our-products/sale" />
    </Carousel>
  );
};

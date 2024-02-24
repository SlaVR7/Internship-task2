import { Button, Flex } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { CarouselRef } from 'antd/lib/carousel';
import Paragraph from 'antd/es/typography/Paragraph';
import { CarouselScreens, CardsGroupMobile } from './CardsGroups.tsx';

export default function CheckoutSection() {
  const carouselRef = useRef<CarouselRef>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1280);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Flex vertical={true} className="bg-secondaryColor dark:bg-grayLColor h-auto p-bigY">
      <Paragraph className="text-basicColor dark:text-secondaryColor text-h3 text-center font-bold">
        Check out our product categories
      </Paragraph>
      {isMobile ? (
        <Flex vertical={true} align={'center'}>
          <CardsGroupMobile carouselRef={carouselRef} />
          <Flex gap={50}>
            <Button
              onClick={() => carouselRef.current && carouselRef.current.prev()}
              shape="circle"
              size={'large'}
              icon={<LeftOutlined />}
            />
            <Button
              onClick={() => carouselRef.current && carouselRef.current.next()}
              shape="circle"
              size={'large'}
              icon={<RightOutlined />}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex className={'items-center justify-between'}>
          <Button
            onClick={() => carouselRef.current && carouselRef.current.prev()}
            shape="circle"
            size={'large'}
            icon={<LeftOutlined />}
          />
          <CarouselScreens carouselRef={carouselRef} />
          <Button
            onClick={() => carouselRef.current && carouselRef.current.next()}
            shape="circle"
            size={'large'}
            icon={<RightOutlined />}
          />
        </Flex>
      )}
    </Flex>
  );
}

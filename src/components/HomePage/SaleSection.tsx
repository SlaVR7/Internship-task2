import { Banner } from './Banner.tsx';
import { Flex } from 'antd';

export default function SaleSection() {
  return (
    <Flex className="bg-sale-section xxl:min-h-[746px] bg-no-repeat bg-left bg-cover p-sm md:p-big rounded-none">
      <Banner
        {...{
          label: 'Sale -20%',
          title: 'Take a Look at Our Big Sale',
          description: 'Massage soap with loofah and other products',
          buttonText: 'BUY NOW',
          linkAddress: '/our-products/sale',
        }}
      />
    </Flex>
  );
}

import classNames from 'classnames';
import { Banner } from './Banner.tsx';
import { Flex } from 'antd';

export default function NewCollectionSection() {
  return (
    <Flex
      className={classNames(
        'xxl:min-h-[746px] p-sm md:p-big relative',
        'bg-new-collection bg-no-repeat bg-left bg-cover',
        'flex flex-row-reverse rounded-none'
      )}
    >
      <Banner
        {...{
          label: 'New Arrival',
          title: 'Discover Our New Collection',
          description: 'Handmade soap in the form of flowers and food',
          buttonText: 'BUY NOW',
          linkAddress: '/our-products/new',
        }}
      />
    </Flex>
  );
}

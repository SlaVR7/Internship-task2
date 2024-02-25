import { PageNameProp } from '../lib/interfaces.ts';
import { Flex } from 'antd';

function NamedBanner({ title }: PageNameProp): JSX.Element {
  return (
    <Flex
      vertical={true}
      justify={'center'}
      align={'center'}
      className='h-[316px] bg-[url("/images/bg-title-banner.webp")] bg-no-repeat bg-cover'
    >
      <Flex className="px-4 text-h2 text-primaryColor font-bold opacity-75">
        {title}
      </Flex>
    </Flex>
  );
}

export default NamedBanner;

import { PageNameProp } from '../lib/interfaces.ts';
import { Flex } from 'antd';
import Title from 'antd/es/typography/Title';


function NamedBanner({ title }: PageNameProp): JSX.Element {
  return (
    <Flex vertical={true} justify={'center'} align={'center'} className='h-[316px] bg-[url("/images/bg-title-banner.webp")] bg-no-repeat bg-cover'>
      <Title level={2}  className='px-4 text-primaryColor font-bold opacity-75'>{title}</Title>
    </Flex>
  );
}

export default NamedBanner;

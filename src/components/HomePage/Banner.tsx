import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { BannerProps } from '../../lib/interfaces.ts';
import { Button } from 'antd';
import { Typography } from 'antd';

export function Banner(content: BannerProps) {
  const { label, title, description, buttonText, linkAddress } = content;
  const { Text, Title } = Typography;
  return (
    <div
      data-testid='banner'
      className={classNames(
        'bg-secondaryColor dark:bg-accentDarkColor bg-opacity-90 dark:bg-opacity-90',
        'rounded-normal p-sm h-min max-w-[550px]'
      )}
    >
      <Text className='text-grayLColor dark:text-secondaryColor text-base font-semibold my-5'>{label}</Text>
      <Title level={2} className='text-accentColor dark:text-secondaryColor text-h3 sm:text-4xl md:text-h2 font-bold md:leading-tight'>
        {title}
      </Title>
      <Title level={4} className='text-grayLColor dark:text-secondaryColor text-h4 font-semibold my-5'>{description}</Title>
      <Link to={linkAddress}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  );
}

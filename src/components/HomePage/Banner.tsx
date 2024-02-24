import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { BannerProps } from '../../lib/interfaces.ts';
import { Button, Row, Typography } from 'antd';

export function Banner(content: BannerProps) {
  const { label, title, description, buttonText, linkAddress } = content;
  const { Text, Paragraph } = Typography;
  return (
    <Row
      className={classNames(
        'bg-secondaryColor dark:bg-accentDarkColor bg-opacity-90 dark:bg-opacity-90',
        'rounded-normal p-sm h-min max-w-[550px]'
      )}
    >
      <Text className="text-grayLColor dark:text-secondaryColor text-base font-semibold my-5">
        {label}
      </Text>
      <Row className="mb-0 text-accentColor dark:text-secondaryColor text-h3 sm:text-4xl md:text-h2 font-bold md:leading-tight">
        {title}
      </Row>
      <Paragraph className="text-grayLColor dark:text-secondaryColor text-h4 font-semibold my-5">
        {description}
      </Paragraph>
      <Link to={linkAddress}>
        <Button
          type={'default'}
          className={classNames(
            'transition text-secondaryColor font-bold',
            'bg-accentColor',
            'rounded-normal h-[74px] px-12 w-min whitespace-nowrap'
          )}
        >
          {buttonText}
        </Button>
      </Link>
    </Row>
  );
}

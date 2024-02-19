import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Row } from 'antd';
import SaleIcon from '../icons/Sale.tsx';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function PromoCode() {
  return (
    <Link to={'/our-products'}>
      <Row
        className={classNames(
          'flex items-center justify-center p-sm text-center transition',
          ' bg-accentColor  text-greyLColor hover:text-secondaryColor',
          'dark:bg-accentDarkColor dark:text-basicColor dark:hover:text-secondaryColor'
        )}
      >
        <Row className='mr-sm'>
          <SaleIcon />
        </Row>
        <Row className='text-sm sm:text-base md:text-2xl lg:text-h3 font-bold'>
          Get a 5% discount on the promo code &quot;NATURE&quot;
        </Row>
        <ArrowRightOutlined />
      </Row>
    </Link>
  );
}

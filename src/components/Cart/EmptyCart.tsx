import { useNavigate } from 'react-router-dom';
import { Button, Flex, Row } from 'antd';
import classNames from 'classnames';

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Flex vertical justify={'center'} align={'center'}>
      <Row className="text-accentColor dark:text-basicColor font-bold text-h4 text-center my-10">
        Your Cart is currently empty!
      </Row>
      <img className="w-[200px] mb-10 dark:invert" src="/images/empty-cart.png" alt="empty-cart" />
      <Row className="text-center text-[16px]">
        Before proceed to checkout you should add some products to your shopping cart.
      </Row>
      <Row className="text-center mb-4 text-[16px]">
        You will find a lot of interesting products on Our products page
      </Row>
      <Button
        onClick={() => {
          navigate('/our-products');
        }}
        className={classNames(
          'text-accentColor dark:text-secondaryColor',
          'transition border-2 border-accentColor dark:border-secondaryColor',
          'font-bold bg-none rounded-normal',
          'h-[74px] px-12 active:scale-95 w-min whitespace-nowrap'
        )}
      >
        Go shopping
      </Button>
    </Flex>
  );
}

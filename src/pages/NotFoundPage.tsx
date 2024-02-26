import { FC } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const NotFoundPage: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={'/'}>
          <Button
            className={classNames(
              'transition text-secondaryColor text-[16px] font-bold',
              'bg-accentColor dark:bg-accentDarkColor',
              'rounded-normal h-[74px] px-12 w-min whitespace-nowrap'
            )}
            type="primary"
          >
            Back Home
          </Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;

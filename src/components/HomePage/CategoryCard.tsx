import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CategoryCardProps } from '../../lib/interfaces.ts';
import { Flex } from 'antd';

export default function CategoryCard(item: CategoryCardProps) {
  return (
    <Link
      to={item.link}
      className={classNames(
        'w-[300px] flex flex-col content-center',
        'text-basicColor dark:text-secondaryColor hover:text-accentColor dark:hover:text-accentColor'
      )}
    >
      <img
        className={classNames(
          'w-[300px] transition mb-esm',
          'brightness-110 dark:brightness-75 saturate-[0.9] hover:filter-none dark:hover:filter-none'
        )}
        src={item.path}
        alt=""
      />
      <Flex justify={'center'} className="text-h4 font-semibold">
        {item.name}
      </Flex>
    </Link>
  );
}

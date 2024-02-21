import { Breadcrumb, Flex, TreeSelect } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import SortingView from './SortingView.tsx';
import FilterView from './FilterView.tsx';
import { IProductsParameters, IProductsSetter } from '../../lib/interfaces.ts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function NavigationView({ setProductsParameters }: IProductsSetter) {
  const link = useParams();
  const [category, setCategory] = useState(link.category || '');
  const [subCategory, setSubCategory] = useState(link.subcategory || '');
  const navigate = useNavigate();

  useEffect(() => {
    setCategory(link.category || '');
    setSubCategory(link.subcategory || '');
  }, [link.category, link.subcategory]);

  const breadcrumbItems = [
    {
      title: <Link to={'/'}><HomeOutlined /></Link>,
    },
    {
      title: <Link to={'/our-products'}>our-products</Link>,
    },
    ...generateBreadcrumbItems(category, subCategory),
  ];

  function generateBreadcrumbItems(category: string, subCategory: string) {
    const items = [];
    if (category) {
      items.push({
        title: <Link to={`/our-products/${category}/`}>{category}</Link>,
      });
      if (subCategory) {
        items.push({
          title: <Link to={`/our-products/${category}/${subCategory}`}>{subCategory}</Link>,
        });
      }
    }
    return items;
  }

  const treeData = [
    {
      value: 'new',
      title: 'New',
    },
    {
      value: 'sale',
      title: 'Sale',
    },
    {
      value: 'self-care',
      title: 'Self-care',
      children: [
        {
          value: 'self-care/soap',
          title: 'Soap',
        },
        {
          value: 'self-care/scrub',
          title: 'Scrub',
        },
        {
          value: 'self-care/bath-bombs',
          title: 'Bath-bombs',
        }],
    },
    {
      value: 'decor',
      title: 'Decor',
      children: [
        {
          value: 'decor/aroma-sachet',
          title: 'Aroma-sachet',
        },
        {
          value: 'decor/candles',
          title: 'Candles',
        }],
    },
  ];

  useEffect(() => {
    if (subCategory) {
      setProductsParameters((prevState: IProductsParameters) => {
        return {...prevState, category: subCategory}
      });
    } else {
      setProductsParameters((prevState: IProductsParameters) => {
        return {...prevState, category: category}
      });
    }

  }, [category, setProductsParameters, subCategory]);

  function changeCategory(category: string) {
    category ? navigate(`/our-products/${category}`) : navigate(`/our-products/`);
  }


  return (
    <Flex justify={'space-between'} className='bg-accentColor dark:bg-accentDarkColor text-primaryColor '>
      <Flex wrap={'wrap'} justify={'space-between'} align={'center'} gap={'10px'} className='max-w-[1440px] py-4 px-4 mx-auto lg:px-big'>
        <Breadcrumb items={breadcrumbItems} />
        <Flex wrap={'wrap'} gap={'10px'}>
          <TreeSelect
            value={subCategory || category || undefined}
            showSearch
            style={{ width: 200 }}
            dropdownStyle={{width: 200, maxHeight: 400, overflow: 'auto' }}
            placeholder="Select category"
            allowClear
            treeDefaultExpandAll
            onChange={changeCategory}
            treeData={treeData}
          />
          <Search
            style={{width: '200px'}}
            placeholder="input search text"
            onSearch={(value: string) =>
              setProductsParameters((prevState: IProductsParameters) => {
                return {...prevState, searchQuery: value}
              })}
            enterButton
              />
          <Flex wrap={'wrap'} gap={10}>
            <SortingView setProductsParameters={setProductsParameters} />
            <FilterView setProductsParameters={setProductsParameters} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

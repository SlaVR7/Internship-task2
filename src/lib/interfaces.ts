import React from 'react';

export interface BannerProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  linkAddress: string;
}

export interface CategoryCardProps {
  name: string;
  path: string;
  link: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  imageSrc: string[];
  price: number;
  salePrice?: number;
  isInCart: boolean;
  link: string;
  type: 'All products' | 'Set of products' | 'Single products';
}

export interface PageNameProp {
  title: string;
}

export interface IFilterParameters {
  priceRange: [number, number];
  typeOfProducts: 'All products' | 'Set of products' | 'Single products';
}

export interface IProductsParameters {
  searchQuery: string;
  category: string;
  priceRange: [number, number];
  typeOfProducts: 'All products' | 'Set of products' | 'Single products';
  sortingParameters: {
    priceUp: boolean,
    priceDown: boolean,
    sortAbc: boolean,
    sortZyx: boolean,
  }
}

export interface IProductsSetter {
  setProductsParameters: React.Dispatch<React.SetStateAction<IProductsParameters>>;
}

export interface UserData {
  id: string;
  username: string;
  address: string;
  agreement: boolean;
  email: string;
  gender: string;
  password: string;
  phone: string;
}

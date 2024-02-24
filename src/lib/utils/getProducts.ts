import { IProductsParameters, ProductCardProps } from '../interfaces.ts';
import { store } from '../../store/store.ts';

export function getProducts(parameters: IProductsParameters): string[] {
  const storeProducts = store.products;
  const filteredProducts = storeProducts.filter((product) => {
    const searchQueryMatch =
      product.name.toLowerCase().includes(parameters.searchQuery) || parameters.searchQuery === '';
    const categoryMatch =
      !parameters?.category || product.categories.includes(parameters.category.toLowerCase());
    const priceRangeMatch =
      product.price >= parameters.priceRange[0] && product.price <= parameters.priceRange[1];
    const typeOfProductsMatch =
      parameters.typeOfProducts === 'All products' || product.type === parameters.typeOfProducts;

    return searchQueryMatch && categoryMatch && priceRangeMatch && typeOfProductsMatch;
  });

  const sortFunction = (a: ProductCardProps, b: ProductCardProps) => {
    if (parameters.sortingParameters.priceUp) {
      return a.price - b.price;
    }
    if (parameters.sortingParameters.priceDown) {
      return b.price - a.price;
    }
    if (parameters.sortingParameters.sortAbc) {
      return a.name.localeCompare(b.name);
    }
    if (parameters.sortingParameters.sortZyx) {
      return b.name.localeCompare(a.name);
    }
    return 0;
  };

  return filteredProducts.sort(sortFunction).map((product) => product.id);
}

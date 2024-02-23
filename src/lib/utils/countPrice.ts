import { ProductCardProps } from '../interfaces.ts';

export function countPrice(products: ProductCardProps[], withSales: boolean): number {
  if (!products.length) return 0;
  if (withSales) {
    return products.reduce((sum, product) => sum + (product.salePrice || product.price) * product.quantityInCart, 0);
  }
  return products.reduce((sum, product) => sum + product.price * product.quantityInCart, 0);
}

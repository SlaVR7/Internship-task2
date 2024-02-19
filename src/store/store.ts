import { types } from 'mobx-state-tree';

const Product = types.model({
  id: types.identifier,
  name: types.string,
  price: types.string,
  salePrice: types.maybe(types.string),
  description: types.string,
  imageSrc: types.array(types.string),
  category: types.string,
  isInCart: types.boolean,
  link: types.string,
}).actions(self => ({
  toggleIsInCart() {
    self.isInCart = !self.isInCart;
  },
}));

const User = types.model({
  id: types.identifier,
  username: types.string,
  email: types.string,
});

const CartItem = types.model({
  product: types.reference(Product),
  quantity: types.number,
});

const ShoppingCart = types.model({
  cartItems: types.array(CartItem),
}).actions(self => ({
  // Добавление товара в корзину
  addItem(product, quantity) {
    const existingItem = self.cartItems.find(item => item.product === product);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      self.cartItems.push({ product, quantity });
    }
  },
}));

const OnlineStore = types.model({
  products: types.array(Product),
  users: types.array(User),
  cart: ShoppingCart,
}).actions(self => ({
  // Добавление нового пользователя
  addUser(user) {
    self.users.push(user);
  },
}));

export const store = OnlineStore.create({
  products: [
    {
      id: '1',
      name: 'Candle "Witch" for rituals',
      price: '6.66',
      salePrice: '5.80',
      description: 'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      category: 'candles',
      imageSrc: ['../../public/images/products/candles/Candle-Witch-for-rituals-1.jpg', '../../public/images/products/candles/Candle-Witch-for-rituals-2.jpg'],
      isInCart: false,
      link: 'product/witch',
    },
    {
      id: '2',
      name: 'Pumpkin Candle',
      price: '7.00',
      description: 'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      category: 'candles',
      imageSrc: ['../../public/images/products/candles/Pumpkin-Candle-1.jpg', '../../public/images/products/candles/Pumpkin-Candle-2.jpg', '../../public/images/products/candles/Pumpkin-Candle-3.jpg'],
      isInCart: false,
      link: 'product/pumpkin',
    },
    {
      id: '3',
      name: 'Chocolate',
      price: '5.00',
      salePrice: '4.33',
      description: 'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      category: 'soap',
      imageSrc: ['../../public/images/products/soap/Chocolate-1.jpg', '../../public/images/products/soap/Chocolate-2.jpg', '../../public/images/products/soap/Chocolate-3.jpg'],
      isInCart: false,
      link: 'product/chocolate',
    },
  ],
  users: [],
  cart: { cartItems: [] },
});

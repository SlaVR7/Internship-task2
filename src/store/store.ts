import { types } from 'mobx-state-tree';
import { UserData } from '../lib/interfaces.ts';

const Product = types
  .model({
    id: types.identifier,
    name: types.string,
    price: types.number,
    salePrice: types.maybe(types.number),
    description: types.string,
    imageSrc: types.array(types.string),
    categories: types.array(types.string),
    quantityInCart: types.number,
    link: types.string,
    type: types.enumeration('ProductType', ['All products', 'Set of products', 'Single products']),
  })
  .actions((self) => ({
    addToCart(quantity: number) {
      self.quantityInCart += quantity;
    },
    removeFromCart() {
      self.quantityInCart = 0;
    },
  }));

const User = types
  .model('User', {
    id: types.identifier,
    username: types.string,
    email: types.string,
    address: types.string,
    agreement: types.boolean,
    gender: types.string,
    password: types.string,
    phone: types.string,
  })
  .actions((self) => ({
    changeUserData(user: UserData) {
      self.username = user.username;
      self.email = user.email;
      self.address = user.address;
      self.phone = user.phone;
      self.password = user.password;
      self.gender = user.gender;
    },
  }));

const Order = types.model('Order', {
  orderId: types.identifier,
  productsData: types.maybe(types.array(types.string)),
  date: types.maybe(types.Date),
  totalPrice: types.string,
});

const AuthorizedUserId = types
  .model({
    authorizedUserId: types.string,
  })
  .actions((self) => ({
    setAuthorizedUser(user: UserData | null) {
      self.authorizedUserId = user ? user.id : '';
    },
  }));

export const authorizedUser = AuthorizedUserId.create({
  authorizedUserId: '',
});

const OnlineStore = types
  .model({
    products: types.array(Product),
    orders: types.array(Order),
    users: types.array(User),
    authorizedUserId: AuthorizedUserId,
  })
  .actions((self) => ({
    addUser(user: UserData) {
      const userId = (self.users.length + 1).toString();
      const userWithId = { ...user, id: userId };
      self.users.push(userWithId);
    },
    addOrder(productsData: string[], date: Date, totalPrice: string) {
      const orderId = (self.orders.length + 1).toString();
      self.orders.push({ orderId, productsData, date, totalPrice });
    },
    removeOrder(id: string) {
      const targetOrder = self.orders.find((order) => order.orderId === id);
      targetOrder?.orderId && self.orders.splice(self.orders.indexOf(targetOrder), 1);
    },
  }));

export const store = OnlineStore.create({
  products: [
    {
      id: '1',
      name: 'Candle "Witch" for rituals',
      price: 6.66,
      salePrice: 5.8,
      description:
        'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      categories: ['candles', 'decor', 'decor/candles', 'sale'],
      imageSrc: [
        '/images/products/candles/Candle-Witch-for-rituals-1.jpg',
        '/images/products/candles/Candle-Witch-for-rituals-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/witch',
      type: 'Single products',
    },
    {
      id: '2',
      name: 'Pumpkin Candle',
      price: 8.00,
      description:
        'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      categories: ['candles', 'decor', 'decor/candles', 'new'],
      imageSrc: [
        '/images/products/candles/Pumpkin-Candle-1.jpg',
        '/images/products/candles/Pumpkin-Candle-2.jpg',
        '/images/products/candles/Pumpkin-Candle-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/pumpkin',
      type: 'Single products',
    },
    {
      id: '3',
      name: 'Chocolate',
      price: 5.00,
      salePrice: 4.33,
      description:
        'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      categories: ['soap', 'self-care', 'self-care/soap', 'sale'],
      imageSrc: [
        '/images/products/soap/Chocolate-1.jpg',
        '/images/products/soap/Chocolate-2.jpg',
        '/images/products/soap/Chocolate-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/chocolate',
      type: 'Set of products',
    },
    {
      id: '4',
      name: 'Lovers\' Candle with geranium',
      price: 11.00,
      description:
        'The candle "Lovers with geranium" is a magnificent handmade work created especially for those who want to give their loved ones a unique atmosphere of warmth, love and romance. This candle is perfect for various romantic events such as birthdays, anniversaries, weddings or just to express your feelings without words.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: [
        '/images/products/candles/Lovers\'-Candle-with-geranium-1.jpg',
        '/images/products/candles/Lovers\'-Candle-with-geranium-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/geranium',
      type: 'Single products',
    },
    {
      id: '5',
      name: 'Sunflower',
      price: 10.00,
      description:
        'The appearance of this soap is fascinating: it has the shape of a sunflower with carefully sculpted petals and is gently colored in lively shades of yellow and green. It attracts the eye and brings a piece of summer mood at any time of the year.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: [
        '/images/products/soap/Sunflower-1.jpg',
        '/images/products/soap/Sunflower-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/sunflower',
      type: 'Set of products',
    },
    {
      id: '6',
      name: 'BLUE LAPIS LAZULI',
      price: 5.00,
      description:
        'The Lavender Bath bomb is a fragrant and soothing remedy created to enrich your bath with lavender aromas and give you a moment of relaxation and peace. Lavender is known for its relaxing properties and ability to help relieve stress and tension.',
      categories: ['bath-bomb', 'self-care', 'self-care/bath-bomb'],
      imageSrc: [
        '/images/products/bath-bombs/BLUE-LAPIS-LAZULI-1.jpg',
        '/images/products/bath-bombs/BLUE-LAPIS-LAZULI-2.jpg',
        '/images/products/bath-bombs/BLUE-LAPIS-LAZULI-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/LAZULI',
      type: 'Set of products',
    },
  ],
  authorizedUserId: {
    authorizedUserId: '',
  },
  users: [],
  orders: [],
});

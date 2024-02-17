import React from "react";
import SignInPage from "../pages/SignInPage.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";
import AccountPage from "../pages/AccountPage.tsx";
import CartPage from "../pages/CartPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import ProductsPage from "../pages/ProductsPage.tsx";
import AboutPage from "../pages/AboutPage.tsx";

export interface IRoute {
  path: string;
  element: React.ElementType;
}

export const publicRoutes: IRoute[] = [
  { path: "/", element: HomePage },
  { path: "/sign-in", element: SignInPage },
  { path: "/sign-up", element: SignUpPage },
  { path: "/cart", element: CartPage },
  { path: "/about", element: AboutPage },
  { path: "/products", element: ProductsPage },
];

export const privateRoutes: IRoute[] = [
  { path: "/account", element: AccountPage },
];

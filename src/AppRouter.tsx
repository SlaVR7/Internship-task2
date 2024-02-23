import * as React from 'react';
import { authorizedUser } from './store/store.ts';
import { onSnapshot } from 'mobx-state-tree';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { App } from './App.tsx';
import {
  AboutPage,
  AccountPage,
  CartPage,
  HomePage,
  NotFoundPage,
  ProductsPage,
  SignInPage,
  SignUpPage,
} from './pages';
import DetailedProductPageComponent from './pages/DetailedProductPage.tsx';

const AppRouter: React.FC = () => {
  const [auth, setAuth] = React.useState(authorizedUser.authorizedUserId);

  React.useEffect(() => {
    const disposer = onSnapshot(authorizedUser, (snapshot) => {
      setAuth(snapshot.authorizedUserId);
    });

    return () => disposer();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <>
          <Route index element={<HomePage />} />
          <Route path={'/cart'} element={<CartPage />} />
          <Route path={'/about'} element={<AboutPage />} />
          <Route path={'/our-products'} element={<ProductsPage />} />
          <Route path={'/our-products/:category'} element={<ProductsPage />} />
          <Route path={'/our-products/:category/:subcategory'} element={<ProductsPage />} />
          <Route path={'/product/:productName'} element={<DetailedProductPageComponent />} />
          <Route
            path="/sign-in"
            element={
              auth ? (
                <Navigate to="/" />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              auth ? (
                <Navigate to="/" />
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route
            path="/account"
            element={
              auth ? (
                <AccountPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </>
        <Route path={'*'} element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default AppRouter;

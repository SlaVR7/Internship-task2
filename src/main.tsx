import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";
import {
  AboutPage,
  AccountPage,
  CartPage,
  HomePage,
  NotFoundPage,
  ProductsPage,
  SignInPage,
  SignUpPage,
} from "./pages";

const auth = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {auth ? (
        <>
          <Route path={"/"} element={<App />} />
          <Route index element={<HomePage />} />
          <Route path={"/sign-in"} element={<SignInPage />} />
          <Route path={"/sign-up"} element={<SignUpPage />} />
          <Route path={"/cart"} element={<CartPage />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/products"} element={<ProductsPage />} />
        </>
      ) : (
        <Route path={"/account"} element={<AccountPage />} />
      )}
      <Route path={"*"} element={<NotFoundPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

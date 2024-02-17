import { Route, Routes } from "react-router-dom";
import {
  AboutPage,
  AccountPage,
  CartPage,
  HomePage,
  ProductsPage,
  SignInPage,
  SignUpPage,
} from "../pages";

const AppRouter = () => {
  const auth = true;
  return (
    <Routes>
      {auth ? (
        <>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/sign-in"} element={<SignInPage />} />
          <Route path={"/sign-up"} element={<SignUpPage />} />
          <Route path={"/cart"} element={<CartPage />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/products"} element={<ProductsPage />} />
        </>
      ) : (
        <Route path={"/account"} element={<AccountPage />} />
      )}
    </Routes>
  );
};

export default AppRouter;

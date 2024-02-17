import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

export function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

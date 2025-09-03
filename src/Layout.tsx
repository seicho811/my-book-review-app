import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import style from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <div className={style.layout}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

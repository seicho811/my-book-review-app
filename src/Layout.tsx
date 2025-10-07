import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import style from "./Layout.module.css";

type LayoutProps = {
  variant: "auth" | "app";
};

export default function Layout({ variant = "app" }: LayoutProps) {
  const contentClass = variant === "auth" ? style.auth : style.app;
  return (
    <>
      <div className={style.layout}>
        <Header />
        <div className={contentClass}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

import EditBookDetail from "./components/EditBookDetail";
import style from "./EditBookDetailPage.module.css";
import Button from "../../components/Button/Button";

export default function EditBookDetailPage() {
  return (
    <>
      <section className={style.container}>
        <nav className={style.nav}>
          <Button onClick={() => window.history.back()}>&lt; Back</Button>
        </nav>
        <section className={style.card}>
          <div className={style.header}>
            <h2 className={style.title}>Edit Book Detail</h2>
          </div>
          <EditBookDetail />
        </section>
      </section>
    </>
  );
}

import NewPostForm from "./components/NewPostForm";
import style from "./NewPostPage.module.css";

export default function NewPostPage() {
  return (
    <>
      <section className={style.card}>
        <div className={style.header}>
          <h2 className={style.title}>New post</h2>
          <span>Let's share your review.</span>
        </div>
        <div className={style.content}>
          <NewPostForm />
        </div>
      </section>
    </>
  );
}

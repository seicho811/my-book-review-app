import ProfileForm from "./components/ProfileForm";
import style from "./ProfilePage.module.css";

export default function ProfilePage() {
  return (
    <>
      <main className={style.page}>
        <section className={style.card}>
          <header className={style.header}>
            <h2 className={style.title}>Edit profile</h2>
            <span className={style.subtitle}>最新の情報に更新しましょう</span>
          </header>
          <div className={style.content}>
            <ProfileForm />
          </div>
        </section>
      </main>
    </>
  );
}

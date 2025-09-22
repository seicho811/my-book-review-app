import { Link } from "react-router";
import LoginForm from "./components/LoginForm";
import style from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <>
      <main className={style.page}>
        <div className={style.card}>
          <div className={style.header}>
            <h2>Login</h2>
            <p>Enter your credentials to access your account.</p>
          </div>
          <div className={style.content}>
            <LoginForm />
          </div>
          <div className={style.footer}>
            <p>
              Don't have an accout? <Link to="/signup">Register</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

import SignUpForm from "./components/SignUpForm";
import { Link } from "react-router";
import style from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <>
      <main className={style.page}>
        <div className={style.card}>
          <div className={style.header}>
            <h2>Sign Up</h2>
            <p>Create your account to get started with our service.</p>
          </div>
          <div className="content">
            <SignUpForm />
          </div>
          <div className="footer">
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

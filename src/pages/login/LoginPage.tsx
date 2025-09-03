import { Link } from "react-router";
import LoginForm from "./components/LoginForm";
import style from "../Page.module.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/Card/Card";

export default function LoginPage() {
  return (
    <>
      <main className={style.page}>
        <Card>
          <CardHeader>
            <h2>Login</h2>
            <p>Enter your credentials to access your account.</p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <p>
              Don't have an accout? <Link to="/signup">Register</Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}

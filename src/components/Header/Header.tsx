import style from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header>
      <h1 className={style.heading}>Book Review</h1>
      {user && user.name}
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
}

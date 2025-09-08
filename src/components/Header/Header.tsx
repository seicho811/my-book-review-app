import style from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className={style.header}>
      <h1 className={style.heading}>Book Review</h1>
      <div className={style.userInfo}>
        {user && <div>{user.name}</div>}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </header>
  );
}

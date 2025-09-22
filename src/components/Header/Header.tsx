import style from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import PencilIcon from "../Icons/Pencil";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className={style.header}>
      <h1 className={style.heading}>Book Review</h1>
      <div className={style.userInfo}>
        {user && <div>{user.name}</div>}
        {user && (
          <button
            className="icon"
            onClick={() => navigate("/profile")}
          >
            <PencilIcon />
          </button>
        )}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </header>
  );
}

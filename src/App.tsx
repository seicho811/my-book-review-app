import { Routes, Route } from "react-router";
import Layout from "./Layout";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import LogoutPage from "./pages/LogoutPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import NewPostPage from "./pages/newPost/NewPostPage";
import BookDetailPage from "./pages/bookDetail/bookDetailPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/signup"
              element={<SignUpPage />}
            />
            <Route
              path="/logout"
              element={<LogoutPage />}
            />
            <Route element={<PrivateRoute />}>
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path="/home"
                element={<HomePage />}
              />
              <Route
                path="/profile"
                element={<ProfilePage />}
              />
              <Route
                path="/new"
                element={<NewPostPage />}
              />
              <Route
                path="/detail/:id"
                element={<BookDetailPage />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

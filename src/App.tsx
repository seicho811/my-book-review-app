import { Routes, Route } from "react-router";
import Layout from "./Layout";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

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
            <Route element={<PrivateRoute />}>
              <Route
                path="/home"
                element={<HomePage />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router";
import Layout from "./Layout";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";

function App() {
  return (
    <>
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
            path="/home"
            element={<HomePage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

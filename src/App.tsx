import { Routes, Route } from "react-router";
import Layout from "./Layout";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/home/Home";
import SignUpForm from "./pages/signup/components/SignUpForm";

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
            element={<SignUpForm />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

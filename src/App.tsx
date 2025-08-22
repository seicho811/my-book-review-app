import { Routes, Route } from "react-router";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";

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

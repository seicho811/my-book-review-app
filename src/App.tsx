import { Routes, Route } from "react-router";
import Layout from "./Layout";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

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
            element={<LoginForm />}
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

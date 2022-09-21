import "../styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import HomePage from "./pages/HomePage";
import Layout from "../components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/index" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

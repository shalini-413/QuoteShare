import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="p-8">
      <nav className="flex gap-4 mb-4">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

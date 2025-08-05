import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AgregarServicio from "./pages/AgregarServicio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />             {/* Página pública */}
        <Route path="/login" element={<Login />} />       {/* Página de login */}
        <Route path="/admin" element={<Admin />} />       {/* Panel para el dueño */}
        <Route path="/agregar-servicio" element={<AgregarServicio />} />
      </Routes>
    </Router>
  );
}

export default App;



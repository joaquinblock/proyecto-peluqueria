import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/Input.css"
import Header from "../components/Header.jsx";
import Input from "../components/Input.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";

function Login() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  
  const sumbit = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <>
      <Header textTitle="Login" textSubtitle="𝕷𝖆𝖚𝖈𝖍𝖆 𝕾𝖙𝖚𝖉𝖎𝖔💈" />
      <main>
        <form 
          className="login-form" 
          onSubmit={sumbit}>
          <h1 className="login-title">Administración</h1>
          <div className="input-group">
            <Input
              type="text"
              placeholder="Nombre de usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              name="nombre"
            ></Input>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            >
            </Input>
            <Button type="submit" text="Ingresar"></Button>
          </div>
        </form>
      </main>
    </>
  );
}
export default Login;

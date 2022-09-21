import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        navigate("/");
      } else {
        alert("Erro No Login");
      }
    }
  }

  return (
    <div>
      <h2>Página fechada</h2>

      <input
        type="text"
        value={email}
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Logar</button>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({ username: "", role: "" });

  const [loginAttempts, setLoginAttempts] = useState(0);

  const resetLoginAttempts = () => {
    setLoginAttempts(0);
  };

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:7000/user/login", {
        username: username,
        password: password,
        role: role
      });
  
      if (response.status === 200 && response.data !== "Login unsuccessful") {
        // Atualize setLoggedInUser com o username e o role do usuário
        setLoggedInUser({ username, role: response.data });
        localStorage.setItem("loggedInUser", JSON.stringify({ username, role: response.data }));
        
        // Redirecione para a página inicial após o login bem-sucedido
        navigate('/');
      } else {
        setError("Usuário não encontrado ou senha incorreta.");
      }
    } catch (error) {
      setLoginAttempts(loginAttempts + 1);
        if (loginAttempts >= 3) {
          setError("Conta bloqueada devido a múltiplas tentativas malsucedidas. Tente novamente mais tarde.");
        } else {
          setError("Erro ao fazer login. Tente novamente mais tarde.");
        }
      }
  }

  setTimeout(resetLoginAttempts, 30000);
  
  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Workflow" className="logoImg" />
      </header>

      <form>
        {error && <p className="error-message">{error}</p>}
        <div className="inputContainer">
          <label htmlFor="username">E-mail</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
          />
        </div>

        <a href="#">Esqueceu sua senha?</a>

        <button className="button" onClick={handleSignIn}>
          Entrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Você não tem uma conta?</p>
          <Link to="/register">Crie a sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}

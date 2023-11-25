import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password) => {
    // Critérios de força da senha
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
  
    if (password.length < minLength) {
        setPasswordStrength("A senha deve ter no mínimo " + minLength + " caracteres.");
    } else if (!hasNumber) {
        setPasswordStrength("A senha deve conter pelo menos um número.");
    } else if (!hasSpecialChar) {
        setPasswordStrength("A senha deve conter pelo menos um caractere especial.");
    } else if (!hasUpperCase) {
        setPasswordStrength("A senha deve conter pelo menos uma letra maiúscula.");
    } else {
      // Se atender todos os critérios
        setPasswordStrength("Senha forte");
    }
  }; 

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:7000/user/register", {
        username: email,
        password: password,
        email: email
      });

      if (response.status === 200) {
     
        navigate('/');
      } else {
        setError("Falha ao realizar o registro. Tente novamente.");
      }
    } catch (error) {
      setError("Erro ao realizar o registro. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Workflow" className="logoImg" />
        <span>Por favor, digite suas informações de cadastro</span>
      </header>

      <form>
        {error && <p className="error-message">{error}</p>}
        <div className="inputContainer">
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="johndoe"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
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
          {passwordStrength && <p className="password-strength">{passwordStrength}</p>}
        </div>

        <button onClick={handleSignUp} className="button">
          Cadastrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Você já tem uma conta?</p>
          <Link to="/">Acesse sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}

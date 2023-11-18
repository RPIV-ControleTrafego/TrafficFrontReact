import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import arrowImg from '../../assets/arrow.svg';
import logoImg from '../../assets/logo.svg';
import LogInHandler from './LogInHandler'; // Importe a classe LogInHandler ou sua implementação correspondente
import './styles.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignIn(e) {
    e.preventDefault();
    setError('');

    // Instanciando o manipulador de login
    const loginHandler = new LogInHandler();

    // Chamando o método handleLogin do manipulador de login
    const loginSuccessful = loginHandler.handleLogin(username, password);

    if (loginSuccessful) {
      try {
        // Aqui você poderia realizar a chamada para o servidor com axios ou fetch
        const response = await axios.post('http://localhost:7000/user/login', {
          username: username,
          password: password,
        });

        if (response.status === 200 && response.data !== 'Login unsuccessful') {
          console.log('Login bem-sucedido:', response.data);
          navigate('/');
        } else {
          setError('Usuário não encontrado ou senha incorreta.');
        }
      } catch (error) {
        setError('Erro ao fazer login. Tente novamente mais tarde.');
        console.error('Erro ao fazer login:', error);
      }
    } else {
      setError('Falha na autenticação.');
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Workflow" className="logoImg" />
      </header>

      <form onSubmit={handleSignIn}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a href="#">Esqueceu sua senha?</a>

        <button className="button" type="submit">
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

export default Login;

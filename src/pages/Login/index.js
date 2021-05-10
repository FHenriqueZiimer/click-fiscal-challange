import React, { useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.scss';
import logo from '../../assets/logo-clickfiscal.webp'

function Login () {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  if (user !== null) {
    history.push('/home');
    window.location.reload();
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  function login(e) {
    e.preventDefault();

    let valid = true;

    if (email.replace(/^\s+|\s+$|\s+(?=\s)/g, "") === '') {
      valid = false;
      emailInput.current.style.borderColor = 'red'
      setEmailAlert('Preencha esse campo com seu Email')
    };

    if (password.replace(/^\s+|\s+$|\s+(?=\s)/g, "") === '') {
      valid = false;
      passwordInput.current.style.borderColor = 'red'
      setPasswordAlert('Preencha esse campo com sua Senha')
    };

    if (valid === true) {
      const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      })

      const body = {
        email: email,
        password: password
      }

      fetch(`${process.env.REACT_APP_API_LINK}/users/login`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
      }).then(res => res.json())
        .then(response => {
          if (response.statusCode !== 200) {
            if (response.statusCode === 404) {
              return setEmailAlert(response.data.message)
            }
            if (response.statusCode === 401) {
              return setPasswordAlert(response.data.message)
            }
          }
          if(response.statusCode === 200) {
            localStorage.setItem('user', JSON.stringify(response.data));    
            history.push('/home');
          }
        })
    };
  };


  return (
    <>
    <div className="logon-container">
        <section className="form">
          <form>
            <h1>Faça seu Login</h1>

            <input
              placeholder="* Seu Email"
              name="email"
              ref={emailInput}
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailAlert(''); emailInput.current.style.borderColor = '' }}
            />
            <span className="error">
              {emailAlert}
            </span>

            <input
              placeholder="* Sua Senha"
              name="password"
              ref={passwordInput}
              value={password}
              onChange={e => { setPassword(e.target.value); setPasswordAlert(''); passwordInput.current.style.borderColor = '' }}
            />
            <span className="error">
              {passwordAlert}
            </span>
            <button onClick={e => login(e)} className="button" type="submit">Entrar</button>
              <Link className="back-link" to="/register">
                <FiLogIn size={16} color="blue"/>
                  Não tenho cadastro
              </Link>
            </form>
          </section>

          <img src={logo} alt="logo"></img>
      </div>
    </>
  )
}

export default Login;
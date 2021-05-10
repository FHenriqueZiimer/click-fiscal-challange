import React, { useState, useRef } from 'react';

import logo from '../../assets/logo-clickfiscal.webp'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.scss'


function Register () {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  if (user !== null) {
    history.push('/home');
    window.location.reload();
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameAlert, setNameAlert] = useState('')
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('')

  const emailInput = useRef(null);
  const nameInput = useRef(null);
  const passwordInput = useRef(null);

  function saveUser(e) {
    e.preventDefault();

    let valid = true

    if (name.replace(/^\s+|\s+$|\s+(?=\s)/g, "") === '') {
      valid = false;
      nameInput.current.style.borderColor = 'red'
      setNameAlert('Preencha esse campo com seu Nome')
    };

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


    if(valid === true) {
      const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY
      })

      const body = {
        name: name,
        email: email,
        password: password
      }

      fetch(`${process.env.REACT_APP_API_LINK}/users/create`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
      }).then(res => res.json())
      .then(response => {
        if(response.statusCode !== 200) {
          return swal.fire({
            icon: 'error',
            text: response.data.message
          })
        }
        swal.fire({
          text: response.data.message
        }).then(() => {
          history.push('/')
        })
      })
    }

    
  }

  return (
    <>
     <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logo"/>
             <h1>Cadastro</h1>
             <p>Faça seu cadastro, entre na plataforma e veja como esse projeto funciona!</p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="blue"/>
                Login
            </Link>
        </section>

        <form>
          <input
            name="name"
            ref={nameInput}
            placeholder="* Nome"
            value={name}
            onChange={e => { setName(e.target.value); setNameAlert(''); nameInput.current.style.borderColor = '' }}
          />
          <span className="error">
            {nameAlert}
          </span>

          <input
            name="email"
            ref={emailInput}
            placeholder="* E-mail"
            value={email}
            onChange={e => { setEmail(e.target.value); setEmailAlert(''); emailInput.current.style.borderColor = '' }}
          />
            <span className="error">
              {emailAlert}
            </span>

            <input
            name="password"
            ref={passwordInput}
            placeholder="* Senha"
            value={password}
            onChange={e => { setPassword(e.target.value); setPasswordAlert(''); passwordInput.current.style.borderColor = '' }}
          />
            <span className="error">
              {passwordAlert}
            </span>

          <button onClick={e => saveUser(e)} className="button" type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register;
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import swal from 'sweetalert2';

import './styles.scss';
import logoImg from '../../assets/logo-clickfiscal.webp';

function NewPhrase () {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  if (user === null) {
    history.push('/home');
    window.location.reload();
  }

  const phraseInput = useRef(null)

  const [phrase, setPhrase] = useState('');
  const [phraseAlert, setPhraseAlert] = useState('');

  function savePhrase (e) {
    e.preventDefault();

    let valid = true;

    if(phrase.replace(/^\s+|\s+$|\s+(?=\s)/g, "") === '') {
      valid = false;
      phraseInput.current.style.borderColor = 'red';
      setPhraseAlert('Preencha esse campo com sua Frase :)')
    }

    if(valid === true) {
      const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY
      })

      const body = {
        phrase: phrase,
        user_id: user.id
      }

      fetch(`${process.env.REACT_APP_API_LINK}/phrases/create`, {
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
          history.push('/home')
        })
      }).catch()
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
          <section>
              <img src={logoImg} alt="logo"/>
              <h1>Cadastrar nova frase</h1>
              <Link className="back-link" to="/home">
                  <FiArrowLeft size={16} color="blue" />
                  Voltar para Home
              </Link>
          </section>

          <form>
              <input
                name="title"
                ref={phraseInput}
                placeholder="* Frase"
                value={phrase}
                onChange={e => { setPhrase(e.target.value); setPhraseAlert(''); phraseInput.current.style.borderColor = '' }}
              />
              <span className="error">
                {phraseAlert}
              </span>

              <button className="button" onClick={e => savePhrase(e)}>Cadastrar</button>

          </form>
      </div>
  </div>
  )
}

export default NewPhrase; 

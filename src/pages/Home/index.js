import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo-clickfiscal.webp'
import { Link } from 'react-router-dom'
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineFileGif, AiOutlineArrowDown } from 'react-icons/ai';
import swal from 'sweetalert2';

import './styles.scss';

function Home () {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  if (user === null) {
    history.push('/');
    window.location.reload();
  }

  const [allPhrase, setAllPhrase] = useState([]);
  const [showHomeMenu, setShowHomeMenu] = useState(false);

  useEffect(() => {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-api-key': process.env.REACT_APP_API_KEY
    })

    fetch(`${process.env.REACT_APP_API_LINK}/phrases/`, {
      method: 'GET',
      headers: myHeaders,
    }).then(res => res.json())
      .then(res => {
        setAllPhrase(res.data);
      })
  }, []);

  function logout(e) {
    e.preventDefault();

    localStorage.clear();
    history.push('/');
  }

  function deletePhrase(phraseId, e) {
    e.preventDefault();

    swal.fire({
      icon: 'warning',
      title: 'Tem certeza que deseja excluir essa linda frase?',
      showCancelButton: true,
      confirmButtonText: `Excluir`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        const myHeaders = new Headers({
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_API_KEY
        })
   
        fetch(`${process.env.REACT_APP_API_LINK}/phrases/delete/${phraseId}`, {
          method: 'DELETE',
          body: JSON.stringify({
            userId: user.id 
          }),
          headers: myHeaders,
        }).then(res => res.json())
          .then(res => {
            swal.fire(res.data.message, '',).then(() => {
              window.location.reload();
            })
          })
      }
    })
  }


  function showGif(phrase) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=pvj7mnhEwGtDrBeMA0ene1u2iOhKbj5r&q=${phrase}&limit=1&offset=0&rating=g&lang=en`, {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {
        swal.fire({
          title: '<strong>GIF :)</strong>',
          imageUrl: res.data[0].embed_url,
           html:
           `<iframe src="${res.data[0].embed_url}" width="100%" height="423" frameBorder="0" ></iframe><p><a href="https://giphy.com/gifs/dillonfrancis-dillion-francis-zuJByExyV8WnS">via GIPHY</a></p>`
        })
      })
  }

  return (
    <>
    <div className="incidents-container">
        <header>
          <img src={logo} alt="Logo" />
          <span>Bem vindo (a), <strong>{user.name}</strong>!</span>

          <Link className="button" to="phrase/new">Criar nova Frase</Link>
            <button onClick={e => logout(e)} type="button">
              <FiPower size={18} color="#E02041" />
            </button>
        </header>
        <button className="button" style={{
          width: '550px',
          marginTop: '50px',
          marginBottom: '20px'
        }} onClick={() => showHomeMenu === true ? setShowHomeMenu(false) : setShowHomeMenu(true)}>Minhas Frases criadas: <AiOutlineArrowDown /></button>
        {showHomeMenu && (
          <>
        <ul>
          {allPhrase.map(phrase => (
            phrase.user.id === user.id
            ? <li key={phrase.id}>
              <strong>Frase:</strong>
                <p>{phrase.phrase}</p>
              <strong>Criado Por:</strong>
                <p>{phrase.user.name}</p>
              <button onClick={(e) => deletePhrase(phrase.id, e)} type="button">
                <FiTrash2 size={20} color="#E02041" />
              </button>
              <button id="btn-gif" onClick={(e) => showGif(phrase.phrase)} type="button">
                <AiOutlineFileGif size={25} />
              </button>
            </li>
            : <> Você ainda não possui frases Criadas </>
          ))}
        </ul>
        </>
      )}
        <h1>Todas Frases criadas<strong>{}</strong></h1>
        <ul>
          {allPhrase.map(phrase => (
            <li key={phrase.id}>
              <strong>Frase:</strong>
                <p>{phrase.phrase}</p>
              <strong>Criado Por:</strong>
                <p>{phrase.user.name}</p>

              <button id="btn-gif" onClick={(e) => showGif(phrase.phrase)} type="button">
                <AiOutlineFileGif size={25} />
              </button>
            </li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default Home
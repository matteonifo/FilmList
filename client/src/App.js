import { Row , Container} from 'react-bootstrap';
import {NavBar} from './NavBar.js';
import {Body} from './Body.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { FilmForm } from './FilmForm.js';
import dayjs from 'dayjs';
import API from './API';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './style.css';

/*
const film_prova = [
  {codice: 1, nome: "Pulp Fiction", preferito: true, data: dayjs('2022-03-10'), rating: 5},
  {codice: 2, nome: "21 Grams", preferito: true, data: dayjs('2022-4-14'), rating: 4},
  {codice: 3, nome: "Star Wars", preferito: false, data: dayjs(), rating: 0},
  {codice: 4, nome: "Il pianeta del Tesoro", preferito: true, data: dayjs(), rating: 3},
  {codice: 5, nome: "Le follie dell'imperatore", preferito: false, data: dayjs(), rating: 4},
]*/


function App() {

  const [dark, setDark] = useState(false);
  const [films, setFilms] = useState([]);
  const [filtro, setFiltro] = useState("Tutti");

  useEffect(() => {
      API.tuttiIFilm()
      .then((films) => setFilms(films))
      .catch((err)=> console.log(err));
  }, [])


  const modificaPreferito = (codice) => {
    setFilms(films.map(f =>{if(f.codice===codice){
        return {...f, preferito: !f.preferito};}
        return f;
    }))
}

const modificaVoto = (voto,codice) => {
    setFilms(films.map(f => {
        if(f.codice===codice){
            return {...f, rating: voto};
        }
        return f;
    }))
}


const aggFilm = (film) => {
    setFilms(oldFilms => [...oldFilms, film]);
    //cambiaFiltro(filtro);
}

function aggiornaFilm(film) {
    setFilms(films => films.map(f => {
        if(f.codice === film.codice){
            return Object.assign({}, film);
        }
        return f;
    }
    ));
  }


const eliminaFilm = (codice) => {
    setFilms(films.filter((f) => f.codice!==codice));
}


const cambiaFiltro = (filtro) => {
    if(filtro==="Tutti"){
        tuttiIFilm();
    } else if(filtro==="Migliori") {
        filmMigliori();
    } else if(filtro==="Da vedere") {
        filmDaVedere();
    } else if(filtro==="Preferiti") {
        filmPreferiti();
    } else if(filtro==="Recenti") {
        filmRecenti();
    }
}

const tuttiIFilm = () => {
    setFilms( () => [...films]);
    setFiltro("Tutti");
}

const filmMigliori = () => {
    setFilms( () => films.filter( (f) => f.rating>4) );
    setFiltro("Migliori");
}

const filmDaVedere = () => {
    setFilms( () => films.filter((f) => f.data===null));
    setFiltro("Da vedere");
}

const filmPreferiti = () => {
    setFilms( () => films.filter((f) => f.preferito));
    setFiltro("Preferiti");
}

const filmRecenti = () => {
    setFilms( () =>  films.filter((f) => f.data===dayjs()));
    setFiltro("Recenti");
}

  return (
    <><Router>
      <Routes>
        <Route path='/'element={<><Row>
        <NavBar dark={dark} modNotte={setDark}/>
      </Row>
      <Row className={!dark ? "row sposAlto vh-100" : "row sposAlto darkMode vh-100"}>
        <Body filtro={filtro} modificaPreferito={modificaPreferito} modVoto={modificaVoto} aggFilm={aggFilm} aggiornaFilm={aggiornaFilm} eliminaFilm={eliminaFilm} cambiaFiltro={cambiaFiltro} films={films} dark={dark}/>
      </Row></>}></Route>
        <Route path='/add' element={<Container fluid>
            <FilmForm films={films} aggiornaFilm={aggFilm}></FilmForm>
        </Container>}></Route>
        <Route path='/edit/:filmId' element={<Container fluid>
            <FilmForm films={films} aggiornaFilm={aggiornaFilm}></FilmForm>
        </Container>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
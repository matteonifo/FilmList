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
  const [inLoading, setInLoading] = useState(true);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
      
        switch (filtro) {
          case 'Tutti' :
            API.tuttiIFilm()
            .then((films) => {
                setFilms(films);
                setInLoading(false);
              })
            .catch((err)=> console.log(err));
            break;
          case 'Preferiti' :
              API.filmPreferiti()
                .then((films) => {
                    setFilms(films);
                    setInLoading(false);
                })
                .catch((err)=> console.log(err));
                break;
            case 'Migliori' :
                API.filmMigliori()
                .then((films) => {
                    setFilms(films);
                    setInLoading(false);
                })
                .catch(err => console.log(err));
                break;
            case 'Recenti' :
                API.filmRecenti()
                .then((films) => {
                    setFilms(films);
                    setInLoading(false);
                })
                .catch(err => console.log(err));
                break;
            case 'Da Vedere' :
                API.filmDaVedere()
                .then((films) => {
                    setFilms(films);
                    setInLoading(false);
                })  
                .catch(err => console.log(err));
                break;
          default:             
          setInLoading(false);   
      }
      setDirty(false);
  }, [filtro,dirty])


  const modificaPreferito = (codice) => {
    setFilms(films.map(f =>{if(f.codice===codice){
        return {...f, preferito: !f.preferito};}
        return f;
    }))
    const filmAgg = films.find(f => f.codice === codice);
    filmAgg.preferito = !filmAgg.preferito;
    API.modificaFilm(filmAgg)
    .then(() => setDirty(true))
    .catch(err => console.log(err));
}

const modificaVoto = (voto,codice) => {
    setFilms(films.map(f => {
        if(f.codice===codice){
            return {...f, rating: voto};
        }
        return f;
    }))
    const filmAgg = films.find(f => f.codice === codice);
    filmAgg.rating = voto;
    API.modificaFilm(filmAgg)
    .then(() => setDirty(true))
    .catch(err => console.log(err));
}


const aggFilm = (film) => {
    setFilms(oldFilms => [...oldFilms, film]);
    //cambiaFiltro(filtro);
    API.aggiungiFilm(film)
        .then( () => setDirty(true))
        .catch(err => console.log(err));
}

function aggiornaFilm(film) {
    setFilms(films => films.map(f => {
        if(f.codice === film.codice){
            return Object.assign({}, film);
        }
        return f;
    }
    ));
    API.modificaFilm(film)
    .then(() => setDirty(true))
    .catch(err => console.log(err));
  }


const eliminaFilm = (codice) => {
    setFilms(films.filter((f) => f.codice!==codice));
    API.eliminaFilm(codice)
        .then(() => setDirty(true))
        .catch( err => console.log(err));
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
    //setFilms( () => [...films]);
    setFiltro("Tutti");
    setInLoading(true);
    setDirty(true);
}

const filmMigliori = () => {
    //setFilms( () => films.filter( (f) => f.rating>4) );
    setFiltro("Migliori");
    setInLoading(true);
    setDirty(true);
}

const filmDaVedere = () => {
    //setFilms( () => films.filter((f) => f.data===null));
    setFiltro("Da vedere");
    setInLoading(true);
    setDirty(true);
}

const filmPreferiti = () => {
    //setFilms( () => films.filter((f) => f.preferito));
    setFiltro("Preferiti");
    setInLoading(true);
    setDirty(true);
}

const filmRecenti = () => {
    //setFilms( () =>  films.filter((f) => f.data===dayjs()));
    setFiltro("Recenti");
    setInLoading(true);
    setDirty(true);
}

  return (
    <><Router>
      <Routes>
        <Route path='/Tutti'element={<><Row>
        <NavBar dark={dark} modNotte={setDark}/>
      </Row>
      <Row className={!dark ? "row sposAlto vh-100" : "row sposAlto darkMode vh-100"}>
        <Body loading={inLoading} filtro={filtro} modificaPreferito={modificaPreferito} modVoto={modificaVoto} aggFilm={aggFilm} aggiornaFilm={aggiornaFilm} eliminaFilm={eliminaFilm} cambiaFiltro={cambiaFiltro} films={films} dark={dark}/>
      </Row></>}></Route>
      <Route path='/Preferiti'element={<><Row>
        <NavBar dark={dark} modNotte={setDark}/>
      </Row>
      <Row className={!dark ? "row sposAlto vh-100" : "row sposAlto darkMode vh-100"}>
        <Body loading={inLoading} filtro={filtro} modificaPreferito={modificaPreferito} modVoto={modificaVoto} aggFilm={aggFilm} aggiornaFilm={aggiornaFilm} eliminaFilm={eliminaFilm} cambiaFiltro={cambiaFiltro} films={films} dark={dark}/>
      </Row></>}></Route>
      <Route path='/Migliori'element={<><Row>
        <NavBar dark={dark} modNotte={setDark}/>
      </Row>
      <Row className={!dark ? "row sposAlto vh-100" : "row sposAlto darkMode vh-100"}>
        <Body loading={inLoading} filtro={filtro} modificaPreferito={modificaPreferito} modVoto={modificaVoto} aggFilm={aggFilm} aggiornaFilm={aggiornaFilm} eliminaFilm={eliminaFilm} cambiaFiltro={cambiaFiltro} films={films} dark={dark}/>
      </Row></>}></Route>
      <Route path='/Recenti'element={<><Row>
        <NavBar dark={dark} modNotte={setDark}/>
      </Row>
      <Row className={!dark ? "row sposAlto vh-100" : "row sposAlto darkMode vh-100"}>
        <Body loading={inLoading} filtro={filtro} modificaPreferito={modificaPreferito} modVoto={modificaVoto} aggFilm={aggFilm} aggiornaFilm={aggiornaFilm} eliminaFilm={eliminaFilm} cambiaFiltro={cambiaFiltro} films={films} dark={dark}/>
      </Row></>}></Route>
      <Route path='/Da_Vedere'element={<><Row>
        <NavBar dark={dark} modNotte={setDark}/>
      </Row>
      <Row className={!dark ? "row sposAlto vh-100" : "row sposAlto darkMode vh-100"}>
        <Body loading={inLoading} filtro={filtro} modificaPreferito={modificaPreferito} modVoto={modificaVoto} aggFilm={aggFilm} aggiornaFilm={aggiornaFilm} eliminaFilm={eliminaFilm} cambiaFiltro={cambiaFiltro} films={films} dark={dark}/>
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
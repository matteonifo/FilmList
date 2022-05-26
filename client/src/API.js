/* 
* All the API calls 
*/

const dayjs = require('dayjs');
const URL = 'http://localhost:3001/api';

async function tuttiIFilm() {

    const response = await fetch(URL + '/films');
    const filmJson = await response.json();
    if(response.ok) {
        return filmJson.map((f) => ({codice: f.id, titolo: f.title, preferito: f.favorite, data: dayjs(f.watchdate), rating: f.rating}))
    } else {
        throw filmJson;
    }
}

async function filmPreferiti() {

    const response = await fetch(URL + '/preferiti');
    const filmJson = await response.json();
    if(response.ok) {
        return filmJson.map( (f) => ({codice: f.id, titolo: f.title, preferito: f.favorite, data: dayjs(f.watchdate), rating: f.rating}))
    } else {
        throw filmJson;
    }
}

async function filmMigliori() {

    const response = await fetch(URL + '/migliori');
    const filmJson = await response.json();
    if(response.ok) {
        return filmJson.map( (f) => ({codice: f.id, titolo: f.title, preferito: f.favorite, data: dayjs(f.watchdate), rating: f.rating}))
    } else {
        throw filmJson;
    }
}

async function filmRecenti() {
    
    const response = await fetch(URL + '/recenti');
    const filmJson =  await response.json();
    if(response.ok) {
        return filmJson.map( (f) => ({codice: f.id, titolo: f.title, preferito: f.favorite, data: dayjs(f.watchdate), rating: f.rating}))
    } else {
        throw filmJson;
    }
}

async function filmDaVedere() {

    const response = await fetch(URL + '/davedere');
    const filmJson = await response.json();
    if(response.ok) {
        return filmJson.map( (f) => ({codice: f.id, titolo: f.title, preferito: f.favorite, data: dayjs(f.watchdate), rating: f.rating}))
    } else {
        throw filmJson;
    }
}

function aggiungiFilm(film) {
    return new Promise((resolve, reject) => {
        fetch(URL +'/films', {
            method: 'POST',
            headers : {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({titolo: film.titolo, preferito: film.preferito, data: film.data.format('YYYY-MM-DD'), rating: film.rating}),
        }).then((response) => {
            if(response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => {reject(message); })
                    .catch(() => {reject({ error: "Cannot parse server response"}) });
            }
        }).catch(() => {reject({error: "Cannot communicate with the server."}) });
    });
}

function eliminaFilm(codice) {
    return new Promise((resolve, reject) => {
        fetch(URL +'/films', {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({codice : codice})
        }).then((response) => {
            if(response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => {reject(message);})
                    .catch(() => {reject({ error: "Cannot parse server response."}) });
            }
        }).catch(() => {reject({error: "Cannot communicate with the server."}) });
    });
}

function modificaFilm(film) {
    return new Promise((resolve, reject) => {
        fetch(URL + '/films', {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({codice: film.codice, titolo: film.titolo, preferito: film.preferito, data: film.data.format('YYYY-MM-DD'), rating: film.rating }),
        }).then((response) => {
            if(response.ok) {
                resolve(null);
            } else {
                response.json()
                .then((obj) => {reject(obj); })
                .catch(() => { reject({error: "cannot parse server response."}) });
            }
        }).catch(() => {reject({ error: "Cannot communicate with the server"}) });
    });
}

const API = {tuttiIFilm,filmPreferiti,filmMigliori,filmRecenti,filmDaVedere,aggiungiFilm,eliminaFilm,modificaFilm};
export default API;
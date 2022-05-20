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


const API = {tuttiIFilm};
export default API;
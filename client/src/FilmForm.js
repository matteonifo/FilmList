import {useState} from 'react';
import { Form , Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useNavigate , useParams } from 'react-router-dom';



function FilmForm(props) {

    const { filmId } = useParams();

    const film = props.films.find((f) => f.codice === parseInt(filmId));

    const [titolo, setNome] = useState(film ? film.titolo : 'Titolo');
    const [preferito, setPreferito] = useState(film ? film.preferito : false);
    const [data, setData] = useState(film ? film.data : dayjs());
    const [voto, setVoto] = useState(film ? film.rating : 3);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(titolo.trim().length === 0){
            //setErrorMsg('Nome con solo spazio non valido');
        } else if (data.isAfter(dayjs())) {
               // setErrorMsg('La data non può essere futura');
        } else {
            const cod = film ? film.codice : props.films.length+1;
            const nuovoFilm = {codice: cod, titolo: titolo, preferito: preferito, data: data, rating: voto};
            props.aggiornaFilm(nuovoFilm);
            navigate('/Tutti');
        }
    }

    const handleVoto = (voto) => {
        if(voto>5){
            setVoto(5);
        } else if( voto<0){
            setVoto(0);
        } else {
            setVoto(voto);
        }
    }


    return (<>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control required={true} maxLength={20} value={titolo} onChange={ev => setNome(ev.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Preferito</Form.Label>
                    <Form.Check value={preferito} defaultChecked={preferito} type="checkbox" onChange={ev => setPreferito(!preferito)}></Form.Check>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data</Form.Label>
                    <Form.Control type="date" value={data.format('YYYY-MM-DD')} onChange={ev => setData(dayjs(ev.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Voto</Form.Label>
                    <Form.Control type="number" min={0} max={5} value={voto} onChange={ev => handleVoto(ev.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'>{filmId ? <span>Aggiorna</span> : <span>Aggiungi</span>}</Button>
                <Button onClick={() => navigate('/Tutti')} variant="warning">Cancella</Button>
            </Form> 
    </>
    )
}

export {FilmForm};
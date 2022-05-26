import { Col , Button } from 'react-bootstrap';
import {Filters} from './Filters.js';
import {FilmList} from './FilmList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';



function Body(props) {

    const navigate = useNavigate();

    return(<>
        <Col md={4}>
          <Filters dark={props.dark} filtro={props.filtro}  cambiaFiltro={props.cambiaFiltro}/>
        </Col>
        <Col md={8}>
          <FilmList loading={props.loading} dark={props.dark} films={props.films} modificaPreferito={props.modificaPreferito} modificaVoto={props.modVoto} eliminaFilm={props.eliminaFilm}/>
          <Button className="rounded-circle" onClick={ () => navigate('/add') }>+</Button>
        </Col>
    </>
    )
}

export {Body};
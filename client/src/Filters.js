import { ListGroup , Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';


function Filters(props) {

  const navigate = useNavigate();

    return(
        <Col>
  <ListGroup variant="flush">
  <ListGroup.Item className={!props.dark ? "" : "darkMode"} action active={props.filtro==="Tutti" ? true : false} onClick={() => {props.cambiaFiltro("Tutti");navigate('/Tutti');}}>Tutti i film</ListGroup.Item>
  <ListGroup.Item className={!props.dark ? "" : "darkMode"} action active={props.filtro==="Preferiti" ? true : false} onClick={() => {props.cambiaFiltro("Preferiti");navigate('/Preferiti')}}>Preferiti</ListGroup.Item>
  <ListGroup.Item className={!props.dark ? "" : "darkMode"} action active={props.filtro==="Migliori" ? true : false} onClick={() => {props.cambiaFiltro("Migliori");navigate('/Migliori')}}>Migliori</ListGroup.Item>
  <ListGroup.Item className={!props.dark ? "" : "darkMode"} action active={props.filtro==="Recenti" ? true : false} onClick={() => {props.cambiaFiltro("Recenti");navigate('/Recenti')}}>Visti di recente</ListGroup.Item>
  <ListGroup.Item className={!props.dark ? "" : "darkMode"} action active={props.filtro==="Da vedere" ? true : false} onClick={() => {props.cambiaFiltro("Da vedere");navigate('/Da_Vedere')}}>Da vedere</ListGroup.Item>
</ListGroup>
  </Col>
    )
}

export {Filters};
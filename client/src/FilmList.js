import { Col , Table , Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { useNavigate } from 'react-router-dom';


function FilmList(props) {

    return(
        <Col>
    <h2>Libreria</h2>
      <FilmTable form={props.form} modFilm={props.modFilm} dark={props.dark} eliminaFilm={props.eliminaFilm} modificaVoto={props.modificaVoto} modificaPreferito={props.modificaPreferito} films={props.films}></FilmTable>
  </Col>
    )
}

function FilmTable(props) {
    return (
      <>
      <Table variant={!props.dark ? "" : "dark"}>
        <tbody>
          {props.films.map((f) => <FilmRow form={props.form} modFilm={props.modFilm} eliminaFilm={props.eliminaFilm} modificaVoto={props.modificaVoto} modificaPreferito={props.modificaPreferito} film={f} key={f.codice}></FilmRow>)}
        </tbody>
      </Table>
      </>
    )
  }

  function FilmRow(props) {

    const navigate = useNavigate();

    return (
      <>
      <tr>
        <td  className={props.film.preferito ? "important" : false}>{props.film.titolo}</td>
        <td><Form.Check onClick={() => props.modificaPreferito(props.film.codice)} 
              checked={props.film.preferito ? true : false} inline></Form.Check> Preferito</td>
        <td>{(props.film.data!==null) ? props.film.data.format('MMM D, YYYY'): false}</td>
        <td><span onClick={() => props.modificaVoto(1 ,props.film.codice)}><FilmRating voto={props.film.rating}></FilmRating></span>
        <span onClick={() => props.modificaVoto(2 ,props.film.codice)}><FilmRating voto={props.film.rating-1}></FilmRating></span>
        <span onClick={() => props.modificaVoto(3 ,props.film.codice)}><FilmRating voto={props.film.rating-2}></FilmRating></span>
        <span onClick={() => props.modificaVoto(4 ,props.film.codice)}><FilmRating voto={props.film.rating-3}></FilmRating></span>
        <span onClick={() => props.modificaVoto(5 ,props.film.codice)}><FilmRating voto={props.film.rating-4}></FilmRating></span>
        </td>
        <td><span onClick={() => {navigate(`/edit/${props.film.codice}`)}}><ModifyIcon/></span></td>
        <td><span onClick={() => props.eliminaFilm(props.film.codice)}><DeleteIcon/></span></td>
      </tr>
      </>
    )
  }

  function FilmRating(props)  {
    if(props.voto>0){
      return(<StellaPiena></StellaPiena>)
    } else {
      return(<StellaVuota></StellaVuota>)
    }
 }


 function StellaPiena(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
       <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
     </svg>
    )
  }
  
  function StellaVuota() {
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </svg>
    )
  }

  function DeleteIcon() {
      return(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg>
      )
  }

  function ModifyIcon() {
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
    )
  }


  export {FilmList};
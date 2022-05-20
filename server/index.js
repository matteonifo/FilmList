// Import express
const express = require('express');
//Import module for logging
const morgan = require('morgan');
//Import checking
const {check, validationResult} = require('express-validator');
//Import Dao module for accessing DB
const dao = require('./dao');
const cors = require('cors');
//Create application
const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

/***  APIs  ***/

// GET /api/films OK
app.get('/api/films', async (req, res) => {
    try{
        const films = await dao.tuttiIFilm();
        res.status(200).json(films);
    } catch (err) {
        res.status(500).end();
    }
})

// GET /api/films/:id OK
app.get('/api/films/:id', async (req, res) => {
    try{
        const result = await dao.filmCodice(req.params.id);
        if(result.error){
            res.status(404).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).end();
    }
})

//POST /api/films OK
app.post('/api/films',[
    check('rating').isInt({min:1, max:5}),
    check('data').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }

    const id = await dao.numeroFilm();

    const film = {
        codice : id,
        titolo : req.body.titolo,
        preferito : req.body.preferito,
        data: req.body.data,
        rating: req.body.rating
    };
    try{
        await dao.aggiungiFilm(film);
        res.status(201).end();
    } catch (err) {
        res.status(500).json({error: `Database error while adding film`});
    }
})

//DELETE /api/films OK
app.delete('/api/films', async (req, res) => {
    const id = req.body.codice;
    try{
        await dao.eliminaFilm(id);
        res.status(202).end();
    } catch (err) {
        res.status(500).json({error: `Database error while updating film`});
    }
})

//UPDATE film OK

app.put('/api/films',[
    check('rating').isInt({min:0, max:5}),
    check('data').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    
    const film = {
        codice : req.body.codice,
        titolo : req.body.titolo,
        preferito : req.body.preferito,
        data: req.body.data,
        rating: req.body.rating
    };
    console.log(film);
    try{
        await dao.modificaFilm(film);
        res.status(202).end();
    } catch (err) {
        res.status(500).json({error: `Database error while updating film`});
    }
})

//GET /api/preferiti OK

app.get('/api/preferiti', async (req, res) => {
    try{
        const filmPreferiti = await dao.filmPreferiti();
        res.status(200).json(filmPreferiti);
    } catch (err) {
        res.status(500).end();
    }
})

//GET /api/migliori OK

app.get('/api/migliori', async (req, res) => {
    try{
        const filmMigliori = await dao.filmMigliori();
        res.status(200).json(filmMigliori);
    } catch (err) {
        res.status(500).end();
    }
})

//GET /api/DaVedere

app.get('/api/DaVedere', async (req, res) => {
    try{
        const filmDaVedere = await dao.filmDaVedere();
        res.status(200).json(filmDaVedere);
    } catch (err) {
        res.status(500).end();
    }
})

//GET /api/Recenti

app.get('/api/Recenti', async (req, res) => {
    try{
        const filmRecenti = await dao.filmRecenti();
        res.status(200).json(filmRecenti);
    } catch (err) {
        res.status(500).end();
    }
})

//Active server
app.listen(port, () =>
console.log('Server ready')) ;
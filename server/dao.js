'use strict';
//Import sqlite3
const dayjs = require('dayjs');
const sqlite = require('sqlite3');

//Open the DB
const db = new sqlite.Database('films.db', (err) => {
    if(err) throw err;
});

exports.tuttiIFilm = () => {
    return new Promise( (resolve, reject) => {
      const query = 'SELECT * FROM films';
      db.all(query, [], (err, rows) => {
        if(err) {
          reject(err);
          return;
        }
        else {
          const films = rows.map((el) => ({id: el.id, title: el.title, favorite: el.favorite, watchdate: el.watchdate, rating: el.rating}) );
          resolve(films);
        }
      })
    })
 }

 exports.filmPreferiti = () => {
    return new Promise( (resolve, reject) => {
      const sql = 'SELECT * FROM films WHERE favorite = true';
      db.all(sql, [], (err, rows) => {
        if(err) {
          reject(err);
          return;
        }
        else {
          const films = rows.map( (el) => ({id: el.id, title: el.title, favorite: el.favorite, watchdate: el.watchdate, rating: el.rating}));
          resolve(films);
        }
      })
    })
  }

  exports.filmMigliori = () => {
    return new Promise( (resolve, reject) => {
      const sql = "SELECT * FROM films WHERE rating > 4";
      db.all(sql, [], (err,rows) => {
        if(err) {
          reject(err);
          return;
        } else {
          const films = rows.map( (el) => ({id: el.id, title: el.title, favorite: el.favorite, watchdate: el.watchdate, rating: el.rating}));
          resolve(films);
        }
      })
    })
  } 

  exports.filmRecenti = () => {
    return new Promise( (resolve, reject) => {
      const sql = 'SELECT * FROM films WHERE watchdate = ?';
      db.all(sql, [dayjs().format('YYYY-MM-DD')], (err,rows) => {
        if(err){
          reject(err);
          return;
        } else {
          const films = rows.map( (el) => ({id: el.id, title: el.title, favorite: el.favorite, watchdate: el.watchdate, rating: el.rating}));
          resolve(films);
        }
      })
    })
  }

  exports.filmDaVedere = () => {
    return new Promise( (resolve, reject) => {
      const sql = 'SELECT * FROM films WHERE watchdate = ""';
      db.all(sql, [], (err,rows) => {
        if(err){
          reject(err);
          return;
        } else {
          const films = rows.map( (el) => ({id: el.id, title: el.title, favorite: el.favorite, watchdate: el.watchdate, rating: el.rating}));
          resolve(films);
        }
      })
    })
  }

  exports.filmCodice = (codice) => {
    return new Promise( (resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE id=?';
        db.all(sql,  [codice], (err,row) => {
            if(err){
                reject(err);
                return;
            } else {
                const film = row.map( (el) => ({id: el.id, title: el.title, favorite: el.favorite, watchdate: el.watchdate, rating: el.rating}));
                resolve(film);
            }
          })
      })
  }

  exports.aggiungiFilm = (film) => {
    return new Promise( (resolve, reject) => {
      const sql = "INSERT INTO films(id,title,favorite,watchdate,rating) VALUES(?,?,?,DATE(?),?)";
      db.run(sql, [ film.codice, film.titolo, film.preferito, film.data, film.rating], (err) => {
        if(err){
          reject(err);
          return;
        } else {
          const mess = "Il film è stato inserito nel db";
          resolve(mess);
        }
      });
    })
  }

  exports.eliminaFilm = (id) => {
    return new Promise ( (resolve, reject) => {
      const sql = "DELETE FROM films WHERE id = ?";
      db.run(sql, [id], (err) => {
        if(err) {
          reject(err);
          return;
        } else {
          const mess = "Il film è stato eliminato dal DB";
          resolve(mess);
        }
      });
    })
  }

  exports.modificaFilm = (film) => {
      return new Promise((resolve,reject) => {
          const sql = 'UPDATE films SET title=?, favorite=?, watchdate=DATE(?), rating=? WHERE id=?';
          db.run(sql, [film.titolo, film.preferito, film.data, film.rating, film.codice], (err) => {
              if(err) {
                  reject(err);
                  return;
              } else {
                  resolve(this.lastID);
              }
          })
      })
  }


  exports.cambiaPreferito = (film) => {
      return new Promise((resolve, reject) => {
          const sql = 'UPDATE film SET favorite=? WHERE id=?';
          db.run(sql, [!film.preferito, film.codice], (err) => {
              if(err) {
                  reject(err);
              } else {
                  resolve(this.lastID);
              }
          })
      })
  }

  exports.numeroFilm = () => {
      return new Promise((resolve,reject) => {
          const sql = 'SELECT COUNT(*) as tot FROM films';
          db.all(sql, [], (err,res) => {
              if(err) {
                  reject(err);
                  return;
              } else {
                  resolve(res.tot);
              }
          })
      })
  }
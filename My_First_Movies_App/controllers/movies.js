// CODE TO ADD MOVIE TO DATABASE
 const sqlite3 = require('sqlite3').verbose(); // this is the syntax to let js access to sqlite3

// Backend file

const connectBackendToBrain = (movie) => {
    console.log('Helllo form back-end');
    console.log(movie);


let db = new sqlite3.Database('db/db.moviedatabase'); // this is a standard initialated by sqlite3
// db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
db.run(`INSERT INTO movies (Title , Type , Poster , Year) VALUES (?,?,?,?)`, [movie.Title , movie.Type ,movie.Poster ,movie.Year], function(err) {
    if (err) {
      return console.log(err);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});

console.log(movie)
db.close(); 
}


const connectIndextoBackEnd = (req , res) => {
    console.log('Bonjour du BackEnd');

    let sendData = {data: []}; // this object is used as a container to get the info from back-end

    let db = new sqlite3.Database('db/db.moviedatabase', (err) => { // this is a standard initialated by sqlite3 in order to select the database
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the movies database.');
    });
     db.serialize(() => {
      db.each(`SELECT * FROM movies`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row)
        sendData.data.push(row)
  
      });
      // res.send(sendData)
    });
  
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(sendData)
      res.send(sendData)
      console.log('Close the database connection.');
    });
}





exports.connectBackendToBrain = connectBackendToBrain;
exports.connectIndextoBackEnd = connectIndextoBackEnd;





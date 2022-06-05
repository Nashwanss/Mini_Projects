const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES

const createRecipeB = (data) => {
    console.log('CREATE from the Backend');

    let db = new sqlite3.Database('db/db.my_recipes'); // this is a standard initialated by sqlite3
    // db.run(`INSERT INTO tableName (column1, column2, column3, column4) VALUES ("VALUE1", "VALUE2.jpg", "VALUE3", "VALUE4")`, function(err) {
    db.run(`INSERT INTO MY_RECIPES (TITLE , INGREDIENTS , INSTRUCTIONS , RATING ) VALUES (?,?,?,?)`, [data.TITLE ,data.INGREDIENTS,data.INSTRUCTIONS ,data.RATING], function(err) {
    if (err) {
        return console.log(err);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    db.close(); 
}


const getDatabaseB = (req , res) => {
    console.log('READ from the Backend');

    let sendRecipe = [];
    let db = new sqlite3.Database('db/db.my_recipes', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the recipes database.');
    });
     db.serialize(() => { // Can we use (select * from table_name) here ?
      db.each(`SELECT rowid, TITLE , INGREDIENTS , INSTRUCTIONS , RATING  FROM MY_RECIPES`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        DataBaseRecipe = {
            ID: row.ID,
            TITLE: row.TITLE,
            INGREDIENTS: row.INGREDIENTS,
            INSTRUCTIONS : row.INSTRUCTIONS,
            RATING : row.RATING
        }
        sendRecipe.push(DataBaseRecipe)
      });
      // res.send(sendData)
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      res.send(sendRecipe)
      console.log('Close the database connection.');
    });
}



const delRecipeB = (req , res) => {
    console.log('DELETE from the BackEnd')

	const recipeID = req.params.theIdOfDelRec
    console.log(req.params);
  
      // delete sqlite3 db :
      let db = new sqlite3.Database('db/db.my_recipes');
  
      // delete a row based on id
      db.run(`DELETE FROM MY_RECIPES WHERE ID=?`, recipeID, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
      });
  
      // close the database connection
      db.close((err) => {
          if (err) {
              res.send(err)
          }
          // send back the whole updated list of tasks:
          getDatabaseB(req, res)
      });
}


const updateRecipeB = (req , res) => {
    console.log('UPDATE FROM THE BackEND');

    const updateRecipe = req.params.updateIdBrain
    console.log(req.params);
    console.log(req.body);

    let db = new sqlite3.Database('db/db.my_recipes');

//// open a database connection

    let data = [req.body.TITLE ,req.body.INGREDIENTS , req.body.INSTRUCTIONS , req.body.RATING , updateRecipe];
    console.log(data);
    // let data = ["Pizza" , "Garlic" , " Do it as you like" , "Good" , 27];
    let sql = `UPDATE MY_RECIPES
                SET
                TITLE = ?,
                INGREDIENTS = ?,
                INSTRUCTIONS = ?,
                RATING = ? 
                WHERE ID= ?`  // NO space between the character(=) and the word WHERE.

    // sqlite> `UPDATE MY_RECIPES SET TITLE = "UUUU",  INGREDIENTS = "GGG" ,  INSTRUCTIONS = "DDD" , RATING = 5 WHERE ID = 43;`


    db.run(sql, data, function(err) {
    if (err) {
     return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);

    });

// close the database connection
    db.close(() => {
      res.send({response: 'Row updated with:' + data})
    });
}


exports.createRecipeB = createRecipeB
exports.getDatabaseB = getDatabaseB
exports.delRecipeB = delRecipeB
exports.updateRecipeB = updateRecipeB






// The brain '_ '    (index) file

// lib and imports

const express = require("express");
const app = express();
const test = require("./controllers/test")
const movie = require("./controllers/movies")

// app setup
app.use(express.json())

app.use("/static", express.static("public"))
app.set("view engine", "ejs");

// pages and api
app.get('/',(req, res) => { // Define the route of rendering the file.
  res.render('movies.ejs');
});

app.post('/api/addtest', (req, res) => {
   test.addTest(req.body)
})
app.post('/api/test', test.testdb)




app.post('/apiGate/add', (req , res) => { // In order to connect the brain to the Front-end file via the function connectFrontendToBrain
  console.log('Hello from the brain');
  // console.log(req.body); // we are receiving the information from the front-end file to the Brain file (((((it will apperars in the Terminal backend)))))))
  movie.connectBackendToBrain(req.body); // In order to connect the Backend to the Front-end file via the function connectBackendToBrain
})

app.post('/apiGate/getInformation' , (req , res) => { // we link the frontEnd with the index file via the function loadMoviesFromDB 
  console.log("Bonjour de l'index (the brain) cette fois");
  movie.connectIndextoBackEnd(req , res); //in this case we connect the backEnd to frontEnd
})


app.listen(3000, () => console.log("Server Up and running"));

/*

We passes the information from front-end to the brain then we passed it to the back-end 
via the function : connectBackendToBrain

*/

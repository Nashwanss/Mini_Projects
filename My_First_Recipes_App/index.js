// lib and imports
const express = require("express");
const app = express();

const recipe = require("./controllers/recipe")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  // callback
  res.render('recipes.ejs');
});


// Create here your api setup

app.post('/apiRecipe/Create' , (req , res) => {
  console.log('CREATE from the brain');
  recipe.createRecipeB(req.body);
})

// app.get('/apiRecipe/Read' , (req , res) => {
//   console.log('READ from the brain');
//   recipe.getDatabaseB(res);
// })

app.get('/apiRecipe/Read' , recipe.getDatabaseB)   // WHY it worksssss !!!
  console.log('READ from the brain');


app.delete('/apiRecipe/Delete/:theIdOfDelRec' , (req , res) => {
  console.log('DELETE from the BRAIN');
  // console.log(req.params.theIdOfDelRec);
  console.log(req.params);
  console.log(req.body);
  recipe.delRecipeB(req,res);
})


app.put('/apiRecipe/Update/:updateIdBrain' , (req , res) => {
  console.log('UPDATE from the BRAIN');
  console.log(req.params);
  console.log(req.body);

  recipe.updateRecipeB(req,res);
})




app.listen(3000, () => console.log("Server Up and running"));

// FRONT END FILE TO INTERACT WITH THE DOM

// const { response } = require("express");

const createBtn = document.querySelector('.create');
const getSavedData = document.querySelector('.read');
const updateBtn = document.querySelector('.update');
const displaySection = document.querySelector('#hoho');

const createRecipe = () =>  {

    const recipeInforamation = newContent();
    fetch('/apiRecipe/Create' , { //route
        method : 'POST' ,
        headers : {
            'Content-Type' : 'application/json'
        } ,
        body: JSON.stringify(recipeInforamation)
        })
        getDatabase();
}


const getDatabase = () => {

    displaySection.innerHTML = ""
    console.log(`Getting all the recipes from the database table : MY_RECIPES`);

        // Fetching the data from the database
    fetch('/apiRecipe/Read', {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'
        },
        })
        .then (response => response.json())
        .then (data => {
            data.forEach(recipe => {

            const section = document.querySelector('.contents');    
            const displayDiv = document.createElement('div');
            displayDiv.className = 'div-database';
            section.appendChild(displayDiv);


            const ParaTitle = document.createElement('h3');
            ParaTitle.style.color = '#882d11';
            ParaTitle.innerText = `${recipe.ID} - TITLE `
            displayDiv.appendChild(ParaTitle);
            const ParaTitleCon = document.createElement('h1');
            ParaTitleCon.innerText = `${recipe.TITLE}`
            displayDiv.appendChild(ParaTitleCon);

            const ParaIngrediets = document.createElement('h4');
            ParaIngrediets.innerText = 'Ingrediets'
            displayDiv.appendChild(ParaIngrediets);
            const ParaIngredietsCon = document.createElement('h3');
            ParaIngredietsCon.innerText = `${recipe.INGREDIENTS}`
            displayDiv.appendChild(ParaIngredietsCon);

            const ParaInstructions = document.createElement('h4');
            ParaInstructions.innerText = 'Instructions'
            displayDiv.appendChild(ParaInstructions);
            const ParaInstructionsCon = document.createElement('h3');
            ParaInstructionsCon.innerText = `${recipe.INSTRUCTIONS}`
            displayDiv.appendChild(ParaInstructionsCon);

            const ParaRating = document.createElement('h4');
            ParaRating.innerText = 'Rating'
            displayDiv.appendChild(ParaRating);
            const ParaRatingCon = document.createElement('h3');
            ParaRatingCon.innerText = `( ${recipe.RATING} )   out of (5) Stars`
            displayDiv.appendChild(ParaRatingCon);


        // Creating the Delete buttun
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Delete'
            displayDiv.appendChild(deleteBtn);

            deleteBtn.addEventListener('click' , (del) => {
                console.log(`You have deleted recipe no.  ${recipe.ID}`);
                delRecipe(recipe.ID);
            })

        // Creating the update buttun
            const updateBtn = document.createElement('button');
            updateBtn.innerHTML = 'Update'
            // newTD.appendChild(updateBtn);
            displayDiv.appendChild(updateBtn);


            updateBtn.addEventListener('click' , (update) => {
                console.log('updting');
                const newValueRecipe = newContent()
                updateRecipe(recipe.ID , newValueRecipe );
                // newContent();
                // console.log(newContent());
            })
        });
    })
}




const delRecipe = (delRecID) => {
    fetch(`/apiRecipe/Delete/${delRecID}` , {
        method : 'DELETE' ,
    })
    .then (response => response.json())
    .then (data => {
        // console.log(data);
        // console.log(delRecID);
        getDatabase();
    })
}


const updateRecipe = (updateIdFront ,contentValue) => {
    fetch(`/apiRecipe/Update/${updateIdFront}` , {
        method : 'PUT',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(contentValue)
    })
    .then (response => response.json())
    .then (data => {
        console.log(data);
        getDatabase();
    })
}



const newContent = () => {
    const titleInput = document.querySelector('#title');
    // console.log(titleInput.value);
const ingredientsInput = document.querySelector('#ingredients');
    // console.log(ingredientsInput.value);
const instructionsInput = document.querySelector('#instructions');
    // console.log(instructionsInput.value);
const ratingInput = document.querySelector('#rating');
    // console.log(ratingInput.value);
    console.log(`New recipe had been added with title ${titleInput.value}`);

let recipeInfo = 
{
    TITLE : titleInput.value,
    INGREDIENTS :ingredientsInput.value,
    INSTRUCTIONS : instructionsInput.value,
    RATING :ratingInput.value
}
return recipeInfo
}




// The eventListener:

createBtn.addEventListener('click' , (create) => {
    createRecipe();        
})


getSavedData.addEventListener('click' , (read) => {
    getDatabase();
})




// Fetching from the API (https://www.themealdb.com/api.php)

const fetchBtn = document.querySelector('.fetch');

fetchBtn.addEventListener('click' , (fetch) => {
const fetchInput = document.querySelector('#fetch-input')
const recipeName = fetchInput.value
console.log(recipeName)

fetchfunc();
})

const fetchfunc = () => {
    const fetchInput = document.querySelector('#fetch-input')
    const recipeName = fetchInput.value
    
    // fetch(`https://www.breakingbadapi.com/api/characters?name=${recipeName}`) /// BREAK BAD api for test only
    

    // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${recipeName}`) // by first letter
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`) // by name
    // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeName}`) // by ID

    // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeName}`) // by category
    .then(response => response.json())
    .then(data => {
        console.log(data.meals);

         content.innerHTML = '';


        data.meals.forEach((recipe) => {


                        // Displaying the fetched data in the HTML as a DIVision

                        const section2 = document.querySelector('.contents2');    
                        const displayDiv2 = document.createElement('div');
                        displayDiv2.className = 'div-database2';
                        section2.appendChild(displayDiv2);


                        const youtubeLink = document.createElement('a');
                        youtubeLink.href = `${recipe.strYoutube}`
                        youtubeLink.target = '_blank' 




                        const youtubeBtn = document.createElement('button');
                        // youtubeBtn.style.color = 'white';
                        youtubeBtn.className = 'youtubeBtn';
                        youtubeBtn.innerText = 'YOUTUBE'  
                        youtubeLink.appendChild(youtubeBtn);
                        displayDiv2.appendChild(youtubeLink);
                        const ParaTitleCon = document.createElement('h1');
                        ParaTitleCon.innerText = `${recipe.strMeal}`
                        displayDiv2.appendChild(ParaTitleCon);

                        // youtubeBtn.addEventListener('click' , (visit) => {
                        //     console.log('Vers -->  YOUTUBE');
                        //     '<a href= 'www.youtube.com'></a>'
                        // })
            
                        const ParaIngrediets = document.createElement('h2');
                        ParaIngrediets.innerText = 'Ingrediets & Measures'  
                        displayDiv2.appendChild(ParaIngrediets);
                        const ParaIngredietsCon = document.createElement('p');
                        ParaIngredietsCon.innerText = 
                        ` ${recipe.strMeasure1} ${recipe.strIngredient1}  
                          ${recipe.strMeasure2} ${recipe.strIngredient2} 
                          ${recipe.strMeasure3} ${recipe.strIngredient3} 
                          ${recipe.strMeasure4} ${recipe.strIngredient4} 
                          ${recipe.strMeasure5} ${recipe.strIngredient5} 
                          ${recipe.strMeasure6} ${recipe.strIngredient6} 
                          ${recipe.strMeasure7} ${recipe.strIngredient7} 
                          ${recipe.strMeasure8} ${recipe.strIngredient8} 
                          ${recipe.strMeasure9} ${recipe.strIngredient9} 
                          ${recipe.strMeasure10} ${recipe.strIngredient10} 
                          ${recipe.strMeasure11} ${recipe.strIngredient11} 
                          ${recipe.strMeasure12} ${recipe.strIngredient12} 
                          ${recipe.strMeasure13} ${recipe.strIngredient13} 
                          ${recipe.strMeasure14} ${recipe.strIngredient14} 
                          ${recipe.strMeasure15} ${recipe.strIngredient15} `
                        displayDiv2.appendChild(ParaIngredietsCon);
            

                        const ParaInstructions = document.createElement('h2');
                        ParaInstructions.innerText = 'Instructions'
                        displayDiv2.appendChild(ParaInstructions);
                        const ParaInstructionsCon = document.createElement('p');
                        ParaInstructionsCon.innerText = `${recipe.strInstructions}`
                        displayDiv2.appendChild(ParaInstructionsCon);
            
                        const ParaRating = document.createElement('h2');
                        ParaRating.innerText = 'More info:'
                        displayDiv2.appendChild(ParaRating);
                        const ParaRatingCon = document.createElement('p');
                        ParaRatingCon.innerText = 
                        ` Category    : ${recipe.strCategory}
                           Area       : ${recipe.strArea}
                           Meal ID    : ${recipe.idMeal}`
                        displayDiv2.appendChild(ParaRatingCon);

          const img = document.createElement('img')
          img.setAttribute('href', recipe.img)
            img.src = recipe.strMealThumb
            section2.appendChild(img);
            
      });
  })

  .catch (error => { 
    console.log('Pay attention !!! There was an error  ' , error );
  }); 
}






// let dell = 5;
// let hp = 15;

const acer = (a,b=5) => {
    console.log(a*b);
}

acer(5, 15);
acer(5, 25);
acer(5, 10);
acer(5, 30);
acer(5);


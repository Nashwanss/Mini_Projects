// Front-end file


const movieContainer = document.getElementById('movies')
const searchBtn = document.querySelector('.btn-search')







const loadMoviesFromDB = () => {
  // console.log('Hello from the function')
  fetch('/apiGate/getInformation', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  VisualizeTheData(data.data);

  })
  .catch((error) => {
    console.error('Error:', error);
  });
}





const connectFrontendToBrain = (target) => { // function connect the FE file with the brain and call it back by clicking the btn.

  let movieInfo = // an object
    {
    Title : target.parentElement.parentElement.children[0].children[1].innerText,
    Type :target.parentElement.parentElement.children[1].children[0].innerText,
    Poster : target.parentElement.parentElement.parentElement.dataset.img,
    Year : target.parentElement.parentElement.children[1].children[1].innerText
    }
  console.log(movieInfo);
  fetch('/apiGate/add', {  // 1-route

    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json', // 2 - the options
    } ,
    body: JSON.stringify(movieInfo),// the body // it should be transfer to jSon (we use the Stringify keyword)
  })
      /* 
      in order to send the data to backend file :
      we need three different parameters 
      1- fetching the route (URL)
      2- the options
      3- body (the main data you want to send to the backend file)
      */
}


const VisualizeTheData = (movie) => {

  movie.forEach((movie) => {
    let movieCard = `<section> 
    <div id="card" class="card" data-img=${movie.Poster} style="background-image: url(${movie.Poster})">
      <div class="inner">
        <div class="header">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
          <h1 class="main-title">${movie.Title.substring(0,15)}</h1>
          <div class="stars">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star-half" aria-hidden="true"></i>
          </div>
        </div>
        <div class="content">
          <p class="type">${movie.Type}</p>
          <a class="year" href="#">${movie.Year}</a>
        </div>
        <div class="btn_row">
          <a href="#" class="card-action">Add to my DB<i class="fa fa-caret-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <!-- the trailer -->
    </div>
  </section>`
  console.log(movie.Title)
  movieContainer.insertAdjacentHTML('beforeend', movieCard)
})
}



const searchMovies = (movies) => {
  movieContainer.innerHTML = ""

  fetch(`http://www.omdbapi.com/?s=${movies}&apikey=adf1f2d7&`)
    .then(response => response.json())
    .then((data) => {
      console.log(data.Search);
      VisualizeTheData(data.Search);


      
      
      const addToDataBaseBtn = document.querySelectorAll('.card-action');
      // console.log(addToDataBaseBtn);
      addToDataBaseBtn.forEach((btn,index) => {
        btn.addEventListener(('click') , (event) => {
          connectFrontendToBrain(event.target); 

/*

we can also use the index parameter:
          console.log(data.Search[index].Title);  
          console.log(data.Search[index].Type); 
          console.log(data.Search[index].Poster); 
          console.log(data.Search[index].Year); 
          
*/
          console.log("A film has been added to the Data base");
        })
      })
    })
}






// ENTRY POINTS
searchBtn.addEventListener('click', (event) => {
  let input = document.getElementById('searchInput')
  console.log(input.value)
  searchMovies(input.value)
})


const loadBtn = document.querySelector('#load-movies');
loadBtn.addEventListener('click' , (event) => {
  movieContainer.innerHTML = ""

  // console.log('hello from loadBtn')
  loadMoviesFromDB();

})
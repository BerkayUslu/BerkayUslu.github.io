//buttons
const addBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
//inputs
const titleInp = document.getElementById('title');
const exNameInp = document.getElementById('extra-name');
const exValueInp = document.getElementById('extra-value');
const filterInp = document.getElementById('filter-title');
//movie list
const movieListDom = document.getElementById('movie-list');

let listVisible = 0;

class Movie {
  constructor(title, exInfName, exInfVal) {
    this.title = title;
    this.exInfName = exInfName;
    this.exInfVal = exInfVal;
  }
}

let movieList = {
  movieData: [],
  addToData: (movie) => {
    movieList.movieData.push(movie); //neden this hata veriyor
  },
  getData: () => {
    const movie = new Movie(titleInp.value, exNameInp.value, exValueInp.value);
    console.log('getting data');
    movieList.addToData(movie);
    printMovie.printScreen(movieList.movieData);
  },
  initializer: () => {
    addBtn.addEventListener('click', movieList.getData); //neden this hata veriyor
    searchBtn.addEventListener('click',movieFilter.filterMovie);
  },
};

const printMovie = {
  printScreen: (movieData) => {
    const movieListTempDom = document.createElement('div');
    movieData.forEach(function (movie) {
      const movieElement = document.createElement('li');
      movieElement.classList.add('card');
      movieElement.innerHTML = `
      <div>
        <h3>TITLE : ${movie.title}</h3>  
      </div>
      <div>
        <h6>
          TOPIC : ${movie.exInfName}
          <br>
          SCORE :${movie.exInfVal}
        </h6>
      </div>
      
    `;
      movieListTempDom.append(movieElement);
  });
    movieListDom.innerHTML = '';
    movieListDom.append(movieListTempDom);
    if (listVisible === 0) {
      listVisible = 1;
      movieListDom.classList.toggle('visible');
    }
  },
};

const movieFilter = {
  filterMovie: ()=>{
    const temp = [];
    movieList.movieData.forEach(function(movie){
      if(movie.title === filterInp.value){
        temp.push(movie);
      }
    printMovie.printScreen(temp);
  })
}
}

movieList.initializer();

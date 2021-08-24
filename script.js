const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f56ae2ef30925f80511d7e0510318eaf&page=1";
const imageUrl = "https://image.tmdb.org/t/p/w1280";
const searchUrl =
  'https://api.themoviedb.org/3/search/movie?api_key=f56ae2ef30925f80511d7e0510318eaf&query="';
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// Fetching Api from themomoviedb
const getAPI = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      displayMovies(data.results);
    });
};

// Rating color functionality
const getClassOfRating = (vote_average) => {
  if (vote_average >= 8) {
    return "green";
  } else if (vote_average >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

getAPI(apiUrl);

// Displaying movie card
const displayMovies = (movies) => {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, vote_average, poster_path, overview } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
        <img src="${imageUrl + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3 class="movie-name">${title}</h3>
            <span class="movie-rating 
            ${getClassOfRating(vote_average)}">
            ${vote_average}
            </span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `;

    main.appendChild(movieElement);
  });
};

// Search form functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const serachTerm = search.value;

  if (serachTerm && serachTerm !== "") {
    getAPI(searchUrl + serachTerm);

    search.value = "";
  } else {
    window.location.reload;
  }
});

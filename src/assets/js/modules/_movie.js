import { API_KEY } from './_config';

export const _fetch = () => {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const languages = {
    ja: 'ja',
    en: 'en',
  };
  // 初回表示は日本語
  let selectedLanguage = languages.ja;
  const moviesList = document.querySelector('[data-movie-list]');
  const _fetchMovie = () => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=${selectedLanguage}&page=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        _movieItems(data.results);
      })
      .catch((error) => {
        console.error('😣');
      });
  };
  const _movieItems = (movies) => {
    moviesList.innerHTML = '';
    movies.forEach((movie) => {
      const movieElement = document.createElement('li');
      movieElement.className = 'p-top_movieItem';
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} ポスター" class="i">
      `;
      moviesList.appendChild(movieElement);
    });
  };
  _fetchMovie();
  window.addEventListener('DOMContentLoaded', () => {
    _fetchMovie();
  });
};

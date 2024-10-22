import { gsap } from 'gsap';
import { API_KEY } from './_config';

export const _fetch = () => {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const languages = {
    ja: 'ja',
    en: 'en',
  };
  let selectedLanguage = languages.ja;
  const moviesList = document.querySelector('[data-movie-list]');
  const movieButton = document.querySelector('[date-movie-button]');
  let currentPage = 1;

  const _fetchMovie = (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=${selectedLanguage}&page=${page}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        _movieItems(data.results);
      })
      .catch((error) => {
        console.error('😣', error);
      });
  };

  const _movieItems = (movies) => {
    moviesList.innerHTML = '';

    // まずはリスト要素を作成して追加
    movies.forEach((movie) => {
      const movieElement = document.createElement('li');
      movieElement.className = 'p-top_movieItem';
      movieElement.innerHTML = `
      <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" rel="noopener noreferrer">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} ポスター" class="i">
      </a>
    `;
      moviesList.appendChild(movieElement);
    });

    // すべての映画アイテムに対してアニメーションを適用
    gsap.set(moviesList.children, { autoAlpha: 0 });
    gsap.to(moviesList.children, {
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power1.out',
      stagger: 0.1,
    });
  };

  _fetchMovie();
  movieButton.addEventListener('click', () => {
    currentPage++;
    _fetchMovie(currentPage);
  });
  window.addEventListener('DOMContentLoaded', () => {
    _fetchMovie();
  });
};

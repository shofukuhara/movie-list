import { gsap } from 'gsap';
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
  const movieButton = document.querySelector('[data-movie-button]');

  const _fetchMovie = () => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=${selectedLanguage}&page=1`;
    console.log(url);
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
    movies.forEach((movie) => {
      const movieElement = document.createElement('li');
      movieElement.className = 'p-top_movieItem';
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} ポスター" class="i">
        <div class="p-top_movieModal" data-movie-modal="closed">
          <div class="p-top_movieArea">
            <svg class="p-top_movieClose" data-movie-close xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.cls-1,.cls-2{fill:none;}.cls-2{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>cross_24</title><g id="レイヤー_2" data-name="レイヤー 2"><g id="Rectangle"><rect class="cls-1" width="48" height="48"/></g><g id="icon_data"><line class="cls-2" x1="12.13" y1="12.63" x2="36.13" y2="36.13"/><line class="cls-2" x1="12.38" y1="36.38" x2="35.88" y2="12.38"/></g></g></svg>
            <div class="p-top_movieTextArea">
              <p class="p-top_movieTitle">${movie.title}</p>
              <p class="p-top_movieRelease">${movie.release_date}</p>
            </div>
          </div>
        </div>
      `;

      // モーダルを開く処理
      movieElement.addEventListener('click', () => {
        const modal = movieElement.querySelector('[data-movie-modal]');
        const body = document.querySelector('[data-fix]');
        body.setAttribute('data-fix', 'fix');
        modal.setAttribute('data-movie-modal', 'open');
        gsap.to(modal, {
          autoAlpha: 1,
          duration: 0.5,
          pointerEvents: 'auto',
          ease: 'power1.out',
        });
      });

      // 閉じるボタンのクリックイベントリスナーを設定
      const movieModalClose = movieElement.querySelector('[data-movie-close]');
      movieModalClose.addEventListener('click', (event) => {
        event.stopPropagation(); // クリックイベントが親要素に伝播しないようにする
        const modal = movieElement.querySelector('[data-movie-modal]');
        const body = document.querySelector('[data-fix]');
        body.setAttribute('data-fix', '');
        modal.setAttribute('data-movie-modal', '');
        gsap.to(modal, {
          autoAlpha: 0,
          duration: 0.5,
          pointerEvents: 'none',
          ease: 'power1.out',
        });
      });

      moviesList.appendChild(movieElement);
    });
  };

  _fetchMovie();
  window.addEventListener('DOMContentLoaded', () => {
    _fetchMovie();
  });
};

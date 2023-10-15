import * as asFunctions from './modules/functions.js';
import * as api from './modules/api.js';
import '../scss/liked-style.scss';
asFunctions.isWebp();

let curHref = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);
document.querySelector('.load').style.display = 'flex';
document.querySelector('body').style.overflowY = 'hidden';
let flags = [false, false, false];

let liked = JSON.parse(localStorage.getItem('liked'));
if (liked['track'].length === 0 && liked['album'].length === 0 && liked['artist'].length === 0) {
  window.location.href = `${curHref}nothing.html`;
}

if (liked['track']) {
  liked['track'].forEach((el) => {
    api
      .get(el, 'track-details')
      .then(function (result) {
        let urlImage = '';
        if (result.song.custom_song_art_image_url) {
          urlImage = result.song.custom_song_art_image_url;
        } else if (result.song.album && result.song.album.cover_art_url) {
          urlImage = result.song.album.cover_art_url;
        } else {
          urlImage = result.song.header_image_url;
        }
        document
          .querySelector('.liked__part-tracks')
          .querySelector('.liked__content')
          .insertAdjacentHTML(
            'beforeend',
            `<a class="card" href="${curHref}track.html?${result.song.id}">
                <img class="card__img" src="${urlImage}">
                <div class="card__info">
                  <div class="card__desc">
                    <h2 class="card__title">${result.song.title}</h2>
                    <p class="card__artist">${result.song.artist_names}</p>
                  </div>
                  <div class="like__box" data-id="${result.song.id}" data-type="track">
                    <svg class="like like--active" xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="none" viewBox="0 0 32 30">
                      <path fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="2"
                            d="M29.6 15.43c-1.94 3.954-10.29 10.296-13.539 13.239-1.624-1.471-11.429-9.273-13.54-13.24C-2.67 5.67 6.314-3.326 16.062 4.95c9.748-8.275 18.414.55 13.54 10.48Z"/>
                    </svg>
                  </div>
                </div>
              </a>`,
          );
      })
      .finally(() => {
        flags[0] = true;
      });
  });
  if (liked['track'].length === 0) {
    document.querySelector('.liked__part-tracks').remove();
    flags[0] = true;
  }
}

if (liked['album']) {
  liked['album'].forEach((el) => {
    api
      .get(el, 'album-details')
      .then(function (result) {
        document
          .querySelector('.liked__part-albums')
          .querySelector('.liked__content')
          .insertAdjacentHTML(
            'beforeend',
            `<a class="card" href="${curHref}album.html?${result.album.id}">
                <img class="card__img" src="${result.album.cover_art_url}">
                <div class="card__info">
                  <div class="card__desc">
                    <h2 class="card__title">${result.album.name}</h2>
                    <p class="card__artist">${result.album.artist.name}</p>
                  </div>
                  <div class="like__box" data-id="${result.album.id}" data-type="album">
                    <svg class="like like--active" xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="none" viewBox="0 0 32 30">
                      <path fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="2"
                            d="M29.6 15.43c-1.94 3.954-10.29 10.296-13.539 13.239-1.624-1.471-11.429-9.273-13.54-13.24C-2.67 5.67 6.314-3.326 16.062 4.95c9.748-8.275 18.414.55 13.54 10.48Z"/>
                    </svg>
                  </div>
                </div>
              </a>`,
          );
      })
      .finally(() => {
        flags[1] = true;
      });
  });
  if (liked['album'].length === 0) {
    document.querySelector('.liked__part-albums').remove();
    flags[1] = true;
  }
}

if (liked['artist']) {
  liked['artist'].forEach((el) => {
    api
      .get(el, 'artist-details')
      .then(function (result) {
        document
          .querySelector('.liked__part-artists')
          .querySelector('.liked__content')
          .insertAdjacentHTML(
            'beforeend',
            `<a class="card" href="${curHref}artist.html?${result.artist.id}">
                <img class="card__img card__img-artist" src="${result.artist.image_url}">
                <div class="card__info">
                  <div class="card__desc">
                    <h2 class="card__title">${result.artist.name}</h2>
                  </div>
                  <div class="like__box" data-id="${result.artist.id}" data-type="artist">
                    <svg class="like like--active" xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="none" viewBox="0 0 32 30">
                      <path fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="2"
                            d="M29.6 15.43c-1.94 3.954-10.29 10.296-13.539 13.239-1.624-1.471-11.429-9.273-13.54-13.24C-2.67 5.67 6.314-3.326 16.062 4.95c9.748-8.275 18.414.55 13.54 10.48Z"/>
                    </svg>
                  </div>
                </div>
              </a>`,
          );
      })
      .finally(() => {
        flags[2] = true;
      });
  });
  if (liked['artist'].length === 0) {
    document.querySelector('.liked__part-artists').remove();
    flags[2] = true;
  }
}

function loadAnimation() {
  for (let el in flags) {
    if (!flags[el]) {
      return false;
    }
  }
  document.querySelector('.load').style.display = 'none';
  document.querySelector('body').style.overflowY = 'auto';
  asFunctions.like();
  return true;
}

let date = new Date();
let timer = setInterval(() => {
  if (new Date() - date > 10000) {
    window.location.href = curHref + '404.html';
  }
  let ac = loadAnimation();
  if (ac) {
    clearInterval(timer);
  }
}, 100);

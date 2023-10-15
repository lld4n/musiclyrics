import * as asFunctions from './modules/functions.js';
import * as api from './modules/api.js';
import '../scss/artist-style.scss';
asFunctions.infoAnimation();
asFunctions.like();
asFunctions.isWebp();

let flags = [false, false, false];
let curHref = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);
const href = window.location.href;
let value = '';

if (href.includes('?')) {
  value = href.slice(href.indexOf('?') + 1);
}

document.querySelector('.load').style.display = 'flex';
document.querySelector('body').style.overflowY = 'hidden';
document.querySelector('.like__box').dataset.id = value;
document.querySelector('.like__box').dataset.type = 'artist';

let liked = JSON.parse(localStorage.getItem('liked'));
asFunctions.createLocal();
if (liked && liked['artist'].includes(value)) {
  document.querySelector('.like').classList.add('like--active');
}

api.get(value, 'artist-details').then(function (result) {
  artist(result);
});

function artist(result) {
  let artist = result.artist;
  document.querySelector('title').textContent = artist.name;
  document.querySelector('.info__title').textContent = artist.name;
  document.querySelector('.info__socials-item-genius').href = artist.url;
  document.querySelector('.info__img').src = artist.image_url;
  if (artist.description_preview !== '') {
    document.querySelector('.artist__about-content').textContent = artist.description_preview;
  } else {
    document.querySelector('.artist__about').remove();
  }
  flags[0] = true;
}

api.get(value, 'artist-albums').then(function (result) {
  artistAlbums(result);
});

function artistAlbums(result) {
  if (result.albums && result.albums.length > 0) {
    result.albums.forEach((el) => {
      document
        .querySelector('.artist__albums-content')
        .querySelector('.result__box')
        .insertAdjacentHTML(
          'beforeend',
          `<a class="result__item" href="${curHref}album.html?${el.id}">
          <img class="result__item-image" src="${el.cover_art_url}">
          <div class="result__item-info">
            <p class="result__item-title">${el.name}</p>
          </div>
        </a>`,
        );
    });
  } else {
    document.querySelector('.artist__albums').remove();
  }
  flags[1] = true;
}

let page = 1;
getTracks();
function getTracks() {
  api.get(value, 'artist-tracks', page).then(function (result) {
    artistTracks(result);
  });

  function artistTracks(result) {
    if (result.next_page === null) {
      document.querySelector('.artist__tracks-btn').remove();
    } else {
      page = result.next_page;
    }
    const tracks = result.songs;
    for (let ind in tracks) {
      document
        .querySelector('.artist__tracks-content')
        .querySelector('.result__box')
        .insertAdjacentHTML(
          'beforeend',
          `<a class="result__item" href="${curHref}track.html?${tracks[ind].id}">
          <img class="result__item-image" src="${tracks[ind].song_art_image_url}">
          <div class="result__item-info">
            <p class="result__item-title">${tracks[ind].title}</p>
            <p class="result__item-artist">${tracks[ind].artist_names}</p>
          </div>
        </a>`,
        );
    }
    flags[2] = true;
  }
}

document.querySelector('.artist__tracks-btn').addEventListener('click', getTracks);

function loadAnimation() {
  for (let el in flags) {
    if (!flags[el]) {
      return false;
    }
  }
  document.querySelector('.load').style.display = 'none';
  document.querySelector('body').style.overflowY = 'auto';
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

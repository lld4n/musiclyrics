import * as asFunctions from './modules/functions.js';
import * as api from './modules/api.js';
import '../scss/album-style.scss';
asFunctions.infoAnimation();

asFunctions.like();

asFunctions.isWebp();

let curHref = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);
const href = window.location.href;
let value = '';
if (href.includes('?')) {
  value = href.slice(href.indexOf('?') + 1);
}
document.querySelector('.load').style.display = 'flex';
document.querySelector('body').style.overflowY = 'hidden';
document.querySelector('.like__box').dataset.id = value;
document.querySelector('.like__box').dataset.type = 'album';
let liked = JSON.parse(localStorage.getItem('liked'));
asFunctions.createLocal();
if (liked && liked['album'].includes(value)) {
  document.querySelector('.like').classList.add('like--active');
}

api.get(value, 'album-details').then(function (result) {
  album(result);
});

function album(result) {
  let album = result.album;
  document.querySelector('title').textContent = album.name;
  document.querySelector('.info__title').textContent = album.name;
  document.querySelector('.info__img').src = album.cover_art_url;
  document.querySelector('.info__artist').textContent = album.artist.name;
  document.querySelector('.info__artist').href = `${curHref}artist.html?${album.artist.id}`;
  document.querySelector('.info__date').textContent = album.release_date_for_display;
  document.querySelector('.info__socials-item-genius').href = album.url;
  if (album.description_preview && album.description_preview !== '') {
    document.querySelector('.album__about-content').textContent = album.description_preview;
  } else {
    document.querySelector('.album__about').remove();
  }
  if (album.performance_groups.length > 0) {
    album.performance_groups.forEach((el) => {
      document.querySelector('.album__credits-content-box').insertAdjacentHTML(
        'beforeend',
        `<div class="album__credits-item">
          <span class="album__credits-item-name">${el.label}</span>
          <span class="album__credits-item-object">${el.artists
            .map((e) => e.name)
            .join(', ')}</span>
        </div>`,
      );
    });
  } else {
    document.querySelector('.album__credits').remove();
  }
}

api.get(value, 'album-appearances').then(function (result) {
  albumTracks(result);
});

function albumTracks(result) {
  result.album_appearances.forEach((el) => {
    let number = el.track_number || '';
    document.querySelector('.album__tracks-content').insertAdjacentHTML(
      'beforeend',
      `<a class="album__tracks-item-box" href="${curHref}track.html?${el.song.id}">
        <div class="album__tracks-item">
          <span class="album__tracks-number">${number}.</span><span class="album__tracks-name">${el.song.title}</span>
        </div>
      </a>`,
    );
  });
  document.querySelector('.load').style.display = 'none';
  document.querySelector('body').style.overflowY = 'auto';
}

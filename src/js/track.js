import * as asFunctions from './modules/functions.js';
import * as api from './modules/api.js';
import '../scss/track-style.scss';
asFunctions.isWebp();

asFunctions.like();

let flags = [false, false, false];
let curHref = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);
const href = window.location.href;
let albumId = '';
let value = '';
if (href.includes('?')) {
  value = href.slice(href.indexOf('?') + 1);
}
document.querySelector('.load').style.display = 'flex';
document.querySelector('body').style.overflowY = 'hidden';
document.querySelector('.like__box').dataset.id = value;
document.querySelector('.like__box').dataset.type = 'track';
let liked = JSON.parse(localStorage.getItem('liked'));
asFunctions.createLocal();
if (liked && liked['track'].includes(value)) {
  document.querySelector('.like').classList.add('like--active');
}

api.get(value, 'track-details').then(function (result) {
  trackDetails(result);
});

function trackDetails(result) {
  let song = result.song;
  if (result.song.custom_song_art_image_url) {
    document.querySelector('.info__img').src = result.song.custom_song_art_image_url;
  } else if (result.song.album && result.song.album.cover_art_url) {
    document.querySelector('.info__img').src = result.song.album.cover_art_url;
  } else {
    document.querySelector('.info__img').src = result.song.header_image_url;
  }
  document.querySelector('title').textContent = result.song.title;
  document.querySelector('.info__title').textContent = result.song.title;
  document.querySelector('.info__artist').textContent = result.song.artist_names;
  document.querySelector(
    '.info__artist',
  ).href = `${curHref}artist.html?${result.song.primary_artist.id}`;
  let producers = result.song.producer_artists;
  if (producers.length > 0) {
    let producersLinks = '';
    for (let index in producers) {
      let item = `<a class="info__producer" href="${curHref}artist.html?${producers[index].id}">${producers[index].name}</a>`;
      if (index === '0') {
        producersLinks += item;
      } else {
        producersLinks += ', ' + item;
      }
    }
    document.querySelector('.info__producer-box').insertAdjacentHTML('beforeend', producersLinks);
  } else {
    removePart('producers');
  }
  let feat = result.song.featured_artists;
  if (feat.length > 0) {
    let featLinks = '';
    for (let index in feat) {
      let item = `<a class="info__feat" href="${curHref}artist.html?${feat[index].id}">${feat[index].name}</a>`;
      if (index === '0') {
        featLinks += item;
      } else {
        featLinks += ', ' + item;
      }
    }
    document.querySelector('.info__feat-box').insertAdjacentHTML('beforeend', featLinks);
  } else {
    removePart('feat');
  }
  document.querySelector('.info__date').textContent = result.song.release_date_for_display;
  document.querySelector('.info__socials-item-genius').href = result.song.url;
  let media = result.song.media;
  for (let ind in media) {
    let ex = media[ind];
    if (ex.provider === 'youtube') {
      document.querySelector('.info__socials-item-youtube').href = ex.url;
    } else if (ex.provider === 'spotify') {
      document.querySelector('.info__socials-item-spotify').href = ex.url;
    } else if (ex.provider === 'soundcloud') {
      document.querySelector('.info__socials-item-soundcloud').href = ex.url;
    }
  }
  document.querySelectorAll('.info__socials-item').forEach((el) => {
    if (el.href === href) {
      el.remove();
    }
  });
  let about = result.song.description.html;
  if (about && about !== '<p>?</p>') {
    document.querySelector('.track__about-content').innerHTML = about;
  } else {
    document.querySelector('.track__about').remove();
  }
  if (result.song.album) {
    albumId = result.song.album.id;
    document.querySelector(
      '.track__album-title',
    ).innerHTML = `${result.song.album.name}(<span class="track__album-date">${result.song.release_date_components.year}</span>)`;
    document.querySelector(
      '.track__album-title',
    ).href = `${curHref}album.html?${result.song.album.id}`;
    api.get(albumId, 'album-appearances').then(function (result) {
      album(result);
    });
  } else {
    document.querySelector('.track__album').remove();
    flags[2] = true;
  }
  let writers = result.song.writer_artists.map((el) => el.name);
  if (writers.length > 0) {
    document.querySelector('.track__credits-artists').textContent = writers.join(', ');
  } else {
    removePart('credits-written');
  }
  let performance = result.song.custom_performances;
  if (performance.length === 0 && !document.querySelector('.track__credits-written')) {
    removePart('credits');
  } else {
    for (let ind in performance) {
      document.querySelector('.track__credits-content-box').insertAdjacentHTML(
        'beforeend',
        `<div class="track__credits-item">
          <span class="track__credits-item-name">${performance[ind].label}</span>
          <span class="track__credits-item-object">${performance[ind].artists
            .map((el) => el.name)
            .join(', ')}</span>
        </div>`,
      );
    }
  }
  flags[0] = true;
}

api.get(value, 'lyrics').then(function (result) {
  lyrics(result);
});

function lyrics(result) {
  const text = result.lyrics.lyrics.body.html;
  if (text) {
    document.querySelector('.track__text-content').innerHTML = text;
  } else {
    removePart('lyrics');
  }
  flags[1] = true;
}

function album(result) {
  let tracks = result.album_appearances;
  for (let index in tracks) {
    let number = tracks[index].track_number || '';
    document.querySelector('.track__album-content').insertAdjacentHTML(
      'beforeend',
      `<a class="track__album-item-box" href="${curHref}track.html?${tracks[index].song.id}">
        <div class="track__album-item">
          <span class="track__album-number">${number}.</span><span class="track__album-name">${tracks[index].song.title}</span>
        </div>
      </a>`,
    );
  }
  flags[2] = true;
}

function removePart(location) {
  if (location === 'lyrics') {
    document.querySelector('.track__text').remove();
  } else if (location === 'feat') {
    document.querySelector('.info__feat-box').remove();
  } else if (location === 'producers') {
    document.querySelector('.info__producer-box').remove();
  } else if (location === 'credits-written') {
    document.querySelector('.track__credits-written').remove();
  } else if (location === 'credits') {
    document.querySelector('.track__credits').remove();
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

asFunctions.infoAnimation();

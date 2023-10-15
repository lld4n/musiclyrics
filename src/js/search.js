import * as api from './modules/api.js';
import * as asFunctions from './modules/functions.js';
import '../scss/search-style.scss';
asFunctions.isWebp();
const curHref = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);
let value = localStorage.getItem('search');
document.querySelector('.load').style.display = 'flex';
document.querySelector('title').textContent = value;
document.querySelector('body').style.overflowY = 'hidden';
document.querySelector('.result__title').textContent = `‘${value}’`;

api.get(value, 'search').then(function (result) {
  treatment(result);
});

function treatment(result) {
  const sections = result.sections;
  sections.forEach((el) => {
    let flag = true;
    if (el.type === 'top_hit') {
      for (let index in el.hits) {
        let elem = el.hits[index];
        if (elem.index === 'song') {
          append(
            generateSong(
              elem.result.title,
              elem.result.artist_names,
              elem.result.song_art_image_url,
              elem.result.id,
            ),
            el.type,
          );
          flag = false;
          break;
        } else if (elem.index === 'artist') {
          append(generateArtist(elem.result.name, elem.result.image_url, elem.result.id), el.type);
          flag = false;
          break;
        } else if (elem.index === 'album') {
          append(
            generateAlbum(
              elem.result.name,
              elem.result.artist.name,
              elem.result.cover_art_url,
              elem.result.id,
            ),
            el.type,
          );
          flag = false;
          break;
        }
      }
      if (flag) {
        removePart(el.type);
      }
    } else if (el.type === 'song') {
      for (let index in el.hits) {
        let elem = el.hits[index];
        if (elem.index === 'song') {
          append(
            generateSong(
              elem.result.title,
              elem.result.artist_names,
              elem.result.song_art_image_url,
              elem.result.id,
            ),
            el.type,
          );
          flag = false;
        }
      }
      if (flag) {
        removePart(el.type);
      }
    } else if (el.type === 'artist') {
      for (let index in el.hits) {
        let elem = el.hits[index];
        if (elem.index === 'artist') {
          append(generateArtist(elem.result.name, elem.result.image_url, elem.result.id), el.type);
          flag = false;
        }
      }
      if (flag) {
        removePart(el.type);
      }
    } else if (el.type === 'album') {
      for (let index in el.hits) {
        let elem = el.hits[index];
        if (elem.index === 'album') {
          append(
            generateAlbum(
              elem.result.name,
              elem.result.artist.name,
              elem.result.cover_art_url,
              elem.result.id,
            ),
            el.type,
          );
          flag = false;
        }
      }
      if (flag) {
        removePart(el.type);
      }
    }
    document.querySelector('.load').style.display = 'none';
    document.querySelector('body').style.overflowY = 'auto';
  });
}

function generateSong(title, artist, img, id) {
  let item = document.createElement('a');
  item.className = 'result__item';
  item.href = `${curHref}track.html?${id}`;
  item.innerHTML = `<img class="result__item-image" src="${img}">
          <div class="result__item-info">
            <p class="result__item-title">${title}</p>
            <p class="result__item-artist">${artist}</p>
          </div>`;
  return item;
}

function generateAlbum(title, artist, img, id) {
  let item = document.createElement('a');
  item.className = 'result__item';
  item.href = `${curHref}album.html?${id}`;
  item.innerHTML = `<img class="result__item-image" src="${img}">
          <div class="result__item-info">
            <p class="result__item-title">${title}</p>
            <p class="result__item-artist">${artist}</p>
          </div>`;
  return item;
}

function generateArtist(title, img, id) {
  let item = document.createElement('a');
  item.className = 'result__item';
  item.href = `${curHref}artist.html?${id}`;
  item.innerHTML = `<img class="result__item-image result__item-image-user" src="${img}">
          <div class="result__item-info">
            <p class="result__item-title">${title}</p>
          </div>`;
  return item;
}

function append(item, location) {
  if (location === 'top_hit') {
    document.querySelector('.result__box-top').append(item);
  } else if (location === 'song') {
    document.querySelector('.result__box-tracks').append(item);
  } else if (location === 'artist') {
    document.querySelector('.result__box-artists').append(item);
  } else if (location === 'album') {
    document.querySelector('.result__box-albums').append(item);
  }
}

function removePart(location) {
  if (location === 'top_hit') {
    document.querySelector('.result__box-top').parentElement.remove();
  } else if (location === 'song') {
    document.querySelector('.result__box-tracks').parentElement.remove();
  } else if (location === 'artist') {
    document.querySelector('.result__box-artists').parentElement.remove();
  } else if (location === 'album') {
    document.querySelector('.result__box-albums').parentElement.remove();
  }
}

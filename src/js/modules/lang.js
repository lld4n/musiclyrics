export let language = {
  footer__based: {
    en: 'based on API <a href="http://genius.com/">Genius</a><picture><source srcset="/genius.webp" type="image/webp"><img src="/genius.png" alt="genius"></picture>',
    ru: 'основано на API <a href="http://genius.com/">Genius</a><picture><source srcset="/genius.webp" type="image/webp"><img src="/genius.png" alt="genius"></picture>',
    fr: 'basé sur l\'API <a href="http://genius.com/">Genius</a><picture><source srcset="/genius.webp" type="image/webp"><img src="/genius.png" alt="genius"></picture>',
  },
  placeholder: {
    en: 'track, artist or album',
    ru: 'трек, исполнитель или альбом',
    fr: 'piste, artiste ou album',
  },
  header__link: {
    en: 'liked',
    ru: 'любимое',
    fr: 'aimé',
  },
  'header__menu-link': {
    en: 'liked',
    ru: 'любимое',
    fr: 'aimé',
  },
  main__title: {
    en: 'lyrics of <span>any</span> song',
    ru: 'текст <span>любой</span> песни',
    fr: "les paroles de <span>n'importe quelle</span> chanson",
  },
  main__subtitle: {
    en: 'just try',
    ru: 'просто попробуй',
    fr: 'essayez simplement',
  },
  main__placeholder: {
    en: 'track, artist or album',
    ru: 'трек, исполнитель или альбом',
    fr: 'piste, artiste ou album',
  },
  album__about: {
    en: 'about',
    ru: 'информация',
    fr: 'à propos de',
  },
  album__credits: {
    en: 'credits',
    ru: 'создатели',
    fr: 'créateurs',
  },
  track__credits: {
    en: 'credits',
    ru: 'создатели',
    fr: 'créateurs',
  },
  'track__credits-written': {
    en: 'written by <span class="track__credits-artists"></span>',
    ru: 'создатели <span class="track__credits-artists"></span>',
    fr: 'rédigé par <span class="track__credits-artists"></span>',
  },
  album__tracks: {
    en: 'tracks',
    ru: 'песни',
    fr: 'pistes',
  },
  track__text: {
    en: 'text',
    ru: 'текст',
    fr: 'texte',
  },
  artist__tracks: {
    en: 'tracks',
    ru: 'песни',
    fr: 'pistes',
  },
  artist__about: {
    en: 'about',
    ru: 'информация',
    fr: 'à propos de',
  },
  track__about: {
    en: 'about',
    ru: 'информация',
    fr: 'à propos de',
  },
  artist__albums: {
    en: 'albums',
    ru: 'альбомы',
    fr: 'albums',
  },
  track__album: {
    en: 'album',
    ru: 'альбом',
    fr: 'album',
  },
  artist__btn: {
    en: 'show more',
    ru: 'показать больше',
    fr: 'en savoir plus',
  },
  result__text: {
    en: 'result of search',
    ru: 'результат поиска',
    fr: 'résultat de la recherche',
  },
  'result-top': {
    en: 'TOP RESULT',
    ru: 'ЛУЧШИЙ РЕЗУЛЬТАТ',
    fr: 'RÉSULTAT TOP',
  },
  'result-tracks': {
    en: 'TRACKS',
    ru: 'ПЕСНИ',
    fr: 'PISTES',
  },
  'result-artists': {
    en: 'ARTISTS',
    ru: 'ИСПОЛНИТЕЛИ',
    fr: 'ARTISTES',
  },
  'result-albums': {
    en: 'ALBUMS',
    ru: 'АЛЬБОМЫ',
    fr: 'ALBUMS',
  },
  key: {
    en: '',
    ru: '',
    fr: '',
  },
};

export function translate() {
  const lang = localStorage.getItem('lang');
  for (let key in language) {
    let buffer = document.querySelector('[data-lang="' + key + '"]');
    if (buffer) {
      if (key === 'placeholder' || key === 'main__placeholder') {
        buffer.placeholder = language[key][lang];
      } else {
        buffer.innerHTML = language[key][lang];
      }
    }
  }
}

export function changeLangLocal(string = 'en') {
  localStorage.setItem('lang', string);
}

export function createLangLocal() {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en');
  }
}

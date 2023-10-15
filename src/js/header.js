import * as asFunctions from './modules/functions';
import { translate, changeLangLocal, createLangLocal } from './modules/lang';
createLangLocal();
translate();
const lang = localStorage.getItem('lang');
document.querySelector('.header__choice--selected').classList.remove('header__choice--selected');
document
  .querySelector('.header__menu-choice--selected')
  .classList.remove('header__menu-choice--selected');
document
  .querySelector('.header__choice[data-language="' + lang + '"]')
  .classList.add('header__choice--selected');
document
  .querySelector('.header__menu-choice[data-language="' + lang + '"]')
  .classList.add('header__menu-choice--selected');
document.querySelector('.header__selected').innerHTML = `${
  document.querySelector('.header__choice--selected').textContent
}
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" fill="none">
          <path fill="#fff"
                d="M10.246 1.167a1 1 0 0 0-1.41 0l-3.59 3.54-3.54-3.54a1 1 0 1 0-1.41 1.42l4.24 4.24a1 1 0 0 0 1.42 0l4.29-4.24a1.001 1.001 0 0 0 0-1.42Z"/>
        </svg>`;

let logo = document.querySelector('.logo');
let mainLogo = document.querySelector('.logo__main');
let decorLogo = document.querySelector('.logo__decor');
let logoAnimation = true;

if (!asFunctions.is_touch_device() && document.documentElement.clientWidth > 1200) {
  document.querySelector('.logo').style.width = '184px';
  logo.addEventListener('mouseenter', logoAnimationOver);
  logo.addEventListener('mouseleave', logoAnimationOut);
} else {
  document.querySelector('.logo').style.width = 'auto';
}

function logoAnimationOver(event) {
  if (logoAnimation) {
    let mainContent = 'usic';
    for (let i = 0; i < 4; i++) {
      let newElement = document.createElement('span');
      newElement.style.opacity = '0';
      newElement.textContent = mainContent[i];
      newElement.style.transition = 'all .3s';
      mainLogo.append(newElement);
      setTimeout(() => {
        newElement.style.opacity = '1';
      }, i * 40);
    }
    let decorContent = 'yrics';
    for (let i = 0; i < 5; i++) {
      let newEl = document.createElement('span');
      newEl.style.opacity = '0';
      newEl.textContent = decorContent[i];
      newEl.style.transition = 'all .3s';
      decorLogo.append(newEl);
      setTimeout(() => {
        newEl.style.opacity = '1';
      }, i * 40);
    }
  }
}

function logoAnimationOut(event) {
  logoAnimation = false;
  mainLogo.querySelectorAll('span').forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.remove();
      }, (3 - index) * 50);
    }, (3 - index) * 40);
  });
  setTimeout(() => (mainLogo.innerHTML = 'm'), 280);
  decorLogo.querySelectorAll('span').forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.remove();
      }, (4 - index) * 50);
    }, (4 - index) * 40);
  });
  setTimeout(() => (decorLogo.innerHTML = 'l'), 440);
  setTimeout(() => (logoAnimation = true), 440);
}

let headerInput = document.querySelector('.header__input');

headerInput.addEventListener('focus', () => {
  document.querySelector('.header__label').style.border = '2px solid #FFFFFF';
  window.addEventListener('keypress', enterSend);
});
headerInput.addEventListener('blur', () => {
  document.querySelector('.header__label').style.border = '';
  window.removeEventListener('keypress', enterSend);
});

document.querySelector('.header__language').addEventListener('click', () => {
  document.querySelector('.header__box').classList.toggle('header__box--open');
  if (document.querySelector('.header__box').classList.contains('header__box--open')) {
    document.querySelector('.header__selected').querySelector('svg').style.transform =
      'rotate(180deg)';
  } else {
    document.querySelector('.header__selected').querySelector('svg').style.transform = '';
  }
});

document.querySelectorAll('.header__choice').forEach((el) => {
  el.addEventListener('click', (event) => {
    event.stopPropagation();
    document.querySelector('.header__selected').innerHTML =
      el.textContent +
      `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" fill="none" style="transform: rotate(180deg);"><path fill="#fff" d="M10.246 1.167a1 1 0 0 0-1.41 0l-3.59 3.54-3.54-3.54a1 1 0 1 0-1.41 1.42l4.24 4.24a1 1 0 0 0 1.42 0l4.29-4.24a1.001 1.001 0 0 0 0-1.42Z"/></svg>`;
    document
      .querySelector('.header__choice--selected')
      .classList.remove('header__choice--selected');
    el.classList.add('header__choice--selected');
    document.querySelector('.header__box').classList.remove('header__box--open');
    setTimeout(() => {
      document.querySelector('.header__selected').querySelector('svg').style.transform = '';
    }, 50);
    changeLangLocal(document.querySelector('.header__choice--selected').dataset.language);
    window.location.reload();
  });
});

document.querySelector('.header__burger').addEventListener('click', () => {
  document.querySelector('.header__burger').classList.toggle('active');
  document.querySelector('.header__menu').classList.toggle('active');
});

document.querySelectorAll('.header__menu-choice').forEach((el) => {
  el.addEventListener('click', () => {
    document
      .querySelector('.header__menu-choice--selected')
      .classList.remove('header__menu-choice--selected');
    el.classList.add('header__menu-choice--selected');
    document.querySelector('.header__burger').classList.toggle('active');
    document.querySelector('.header__menu').classList.toggle('active');
    changeLangLocal(document.querySelector('.header__menu-choice--selected').dataset.language);
    window.location.reload();
  });
});

document.querySelector('.header__btn').addEventListener('click', send);

function enterSend(e) {
  if (e.code === 'Enter') {
    send();
  }
}

function send() {
  const value = document.querySelector('.header__input').value;
  if (value) {
    localStorage.setItem('search', value);
    let curHref = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);

    window.location.href = `${curHref}search.html?${value}`;
  } else {
    localStorage.setItem('search', '');
  }
}

import * as asFunctions from './modules/functions';
import '../scss/style.scss';
asFunctions.isWebp();
let mainInput = document.querySelector('.main__input');

mainInput.addEventListener('focus', () => {
  document.querySelector('.main__label').style.border = '4px solid #FFFFFF';
  window.addEventListener('keypress', enterSend);
});
mainInput.addEventListener('blur', () => {
  document.querySelector('.main__label').style.border = '';
  window.removeEventListener('keypress', enterSend);
});

if (!asFunctions.is_touch_device()) {
  let mainContainer = document.querySelector('.wrapper');
  let width = mainContainer.offsetWidth;
  let height = mainContainer.offsetHeight;
  let rotw = 360 / width;
  let roth = 360 / height;
  mainContainer.addEventListener('mousemove', (e) => {
    document.querySelector('.main__decor-1').style.transform = `rotate(${rotw * e.screenX}deg)`;
    document.querySelector('.main__decor-2').style.transform = `rotate(${
      rotw * e.screenX * 0.7
    }deg)`;
    document.querySelector('.main__decor-3').style.transform = `rotate(${
      rotw * e.screenX * 0.3
    }deg)`;
    document.querySelector('.main__decor-4').style.transform = `rotate(${roth * e.screenY}deg)`;
    document.querySelector('.main__decor-5').style.transform = `rotate(${
      roth * e.screenY * 0.7
    }deg)`;
    document.querySelector('.main__decor-6').style.transform = `rotate(${
      roth * e.screenY * 0.3
    }deg)`;
  });
} else {
  document.querySelector('.main__decor-1').style.display = 'none';
  document.querySelector('.main__decor-2').style.display = 'none';
  document.querySelector('.main__decor-3').style.display = 'none';
  document.querySelector('.main__decor-4').style.display = 'none';
  document.querySelector('.main__decor-5').style.display = 'none';
  document.querySelector('.main__decor-6').style.display = 'none';
}

document.querySelector('.main__btn').addEventListener('click', send);

function enterSend(e) {
  if (e.code === 'Enter') {
    send();
  }
}

function send() {
  const value = document.querySelector('.main__input').value;
  if (value) {
    localStorage.setItem('search', value);
    let curHref = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1);
    window.location.href = `${curHref}search.html?${value}`;
  } else {
    localStorage.setItem('search', '');
  }
}

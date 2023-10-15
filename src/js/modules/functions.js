export function isWebp() {
  function testWebP(callback) {

    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {

    if (support === true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });

}

export function is_touch_device() {
  return ('ontouchstart' in window);
}
export function createLocal() {
  if (!JSON.parse(localStorage.getItem('liked'))) {
    let buffer = {
      'artist': [],
      'track': [],
      'album': []
    }
    localStorage.setItem('liked', JSON.stringify(buffer))
  }
}
export function like() {
  document.querySelectorAll('.like').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      el.classList.toggle('like--active')
      if (el.classList.contains('like--active')) {
        createLocal();
        let liked = JSON.parse(localStorage.getItem('liked'));
        let type = e.target.closest('.like__box').dataset.type;
        let id = e.target.closest('.like__box').dataset.id;
        liked[type].push(id);
        localStorage.setItem('liked', JSON.stringify(liked))
      } else {

        let liked = JSON.parse(localStorage.getItem('liked'));
        let type = e.target.closest('.like__box').dataset.type;
        let id = e.target.closest('.like__box').dataset.id;
        liked[type] = liked[type].filter(el => el !== id)
        localStorage.setItem('liked', JSON.stringify(liked))
      }
    })

  })
}

export function infoAnimation() {
  if (!is_touch_device() && document.documentElement.clientWidth > 1200) {
    let info = document.querySelector('.info');
    let infoImg = document.querySelector('.info__img');
    let infoContent = document.querySelector('.info__content');
    let infoSocialsText = document.querySelectorAll('.info__socials-item-text');
    let infoBox = document.querySelector('.info__box');
    let infoAdditional = document.querySelector('.info__additional');
    let infoProducerBox = document.querySelector('.info__producer-box');
    let infoFeatBox = document.querySelector('.info__feat-box');
    window.addEventListener('scroll', (e) => {
      let curScrollY = window.scrollY;
      if (curScrollY < 500) {
        info.style.height = `${600 - window.scrollY}px`
      } else {
        info.style.height = `100px`
      }
      if (curScrollY <= 480) {
        infoImg.style.width = `${560 - window.scrollY}px`
        infoImg.style.height = `${560 - window.scrollY}px`
      } else {
        infoImg.style.width = `80px`
        infoImg.style.height = `80px`
      }
      if (curScrollY >= 300) {
        info.style.padding = `10px`
        info.style.gap = '20px';
        infoImg.style.borderRadius = `5px`
        infoContent.style.alignItems = 'center';
        infoContent.style.flexDirection = 'row';
        if (infoProducerBox) infoProducerBox.style.display = 'none';
        if (infoFeatBox) infoFeatBox.style.display = 'none';
        if (infoBox) {
          infoBox.style.flexDirection = 'row';
          infoBox.style.alignItems = 'center';
        }
        if (infoAdditional) {
          infoAdditional.style.flexDirection = 'row';
          infoAdditional.style.alignItems = 'center';
        }
        infoSocialsText.forEach(el => {
          el.style.display = 'none';
        })
      } else {
        info.style.padding = `20px`
        info.style.gap = '40px';
        infoImg.style.borderRadius = `20px`
        infoContent.style.alignItems = 'flex-start';
        infoContent.style.flexDirection = 'column';
        if (infoProducerBox) infoProducerBox.style.display = 'block';
        if (infoFeatBox) infoFeatBox.style.display = 'block';
        if (infoBox) {
          infoBox.style.flexDirection = 'column';
          infoBox.style.alignItems = 'flex-start';
        }
        if (infoAdditional) {
          infoAdditional.style.flexDirection = 'column';
          infoAdditional.style.alignItems = 'flex-start';
        }
        infoSocialsText.forEach(el => {
          el.style.display = 'block';
        })
      }
    })
  } else {
    if (document.querySelector('.track__content')) document.querySelector('.track__content').style.marginTop = '0';
    if (document.querySelector('.artist__content')) document.querySelector('.artist__content').style.marginTop = '0';
    if (document.querySelector('.album__content')) document.querySelector('.album__content').style.marginTop = '0';
    document.querySelector('.info').style.position = 'inherit'
  }
}
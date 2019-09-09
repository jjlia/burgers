//////Меню (аккордеон)
const menu = document.querySelector('.menu-acco');
const accoItem = document.querySelectorAll('.menu-acco__item');
const accoItemLength = accoItem.Length;


menu.addEventListener('click', function (e) {
    e.preventDefault();
    for (let i = 0; i < accoItemLength; i++) {
        accoItem[i].classList.remove('active');
    }
});

for (let i = 0; i < accoItemLength; i++) {
    accoItem[i].addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (accoItem[i].classList.contains('active')) {
            accoItem[i].classList.remove('active');
        } else {
            for (let i = 0; i < accoItemLength; i++) {
                accoItem[i].classList.remove('active');
            }
            accoItem[i].classList.add('active');
        }
    });
}

//////////////меню слайдер////////
    const right = document.querySelector('.burger__controls-link--next');
    const left = document.querySelector('.burger__controls-link--prev');
    const list = document.querySelector('.burger__list');
    let items = document.querySelector('.burger__item');

    let container = document.querySelector('.burger');
    let widthWrapper = container.clientWidth;
    
    let wrapper = document.querySelector('.burger__wrapper');
	wrapper.style.width = widthWrapper  + 'px';


    const minRight = 0;
    const maxRight = widthWrapper * (items.length - 1);
    const step = widthWrapper;
    let currentRight = 0;

    list.style.right = currentRight + 'px';
    right.addEventListener('click', function(e) {
        e.preventDefault();

        if (currentRight < maxRight) {
            currentRight += step;
            list.style.right = currentRight + 'px';
        } else {
            currentRight = minRight;
            list.style.right = currentRight + 'px';
        }
    });

    left.addEventListener("click", function(e) {
        e.preventDefault();

            if (currentRight > minRight) {
                currentRight -= step;
                items.style.right = currentRight + "px";
            } else {
                currentRight = maxRight;
                items.style.right = currentRight + "px";
            }
        });
/////////////////////////////////////

const reviews = document.querySelector('.reviews__list');
const overlay = document.querySelector('.overlay');
const popup__text = document.querySelector('.popup__text');
const popup__title = document.querySelector('.popup__title');


reviews.addEventListener('click', function(e) {
    let elem = e.target;
    // console.log(document.getElementsByTagName('h4')[0].innerHTML);
    
    if (elem.tagName === 'BUTTON') {
        let modalText = elem.previousElementSibling.innerHTML;
        let modalTitle = document.getElementsByTagName('h4')[0].innerHTML;

        popup__title.innerHTML = modalTitle;
        popup__text.innerHTML = modalText;
        overlay.style.display = 'block';
        
    }
    const closeElement = document.querySelector('.popup__close');
    closeElement.addEventListener('click', function(e) {
        e.preventDefault();

        overlay.style.display = 'none';
    })

    document.addEventListener('keyup', e => {
        let keyName = e.key;

        if (keyName === 'Escape') {
            overlay.style.display = 'none';
        }
    });
});
//////////
const element = document.querySelector('.team-accordeon__list');
const item = document.querySelectorAll('.team-accordeon__item');
const title = document.querySelector('.team-accordeon__trigger');
const content = document.querySelector('.team-accordeon__content');

console.log(item);

element.classList.add("team-accordeon__list");
element.addEventListener("click", function(e) {
    e.preventDefault();
    let lastActive;
    if (e.target.classList.contains("team-accordeon__trigger")) {
     if (lastActive) {
        lastActive.classList.remove("active");
      }

      lastActive = e.target.parentNode;
      lastActive.classList.add("active");
    }
  });

/////////////////////////////////////////
   
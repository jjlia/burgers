//////Меню (аккордеон)
const menu = document.querySelector('.menu-acco');
const accoItem = document.querySelectorAll('.menu-acco__item');
const accoItemLength = accoItem.length;


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
    const item1 = document.querySelectorAll('#items');

    right.addEventListener("click", function () {
        loop("right");
    });
    left.addEventListener("click", function () {
        loop("left");
    });
    function loop(direction) {
        if (direction === "right") {
            items.appendChild(items.firstElementChild);
        } else {
            items.insertBefore(items.lastElementChild, items.firstElementChild);
        }
    }
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
    });

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


element.addEventListener("click", function(e) {
    e.preventDefault();
    let itemActive = document.querySelector('.active');
    console.log(itemActive);
    if (e.target.classList.contains("team-accordeon__trigger")) {
    if (itemActive) {
        itemActive.classList.remove('active');
    }
    
    itemActive = e.target.parentNode;
    itemActive.classList.add("active");
    }
});

/////////////////////////////////////////
let hamburger = options => {
	let button = document.querySelector(options.button);
	let menu = document.querySelector(options.menu);
	let list = document.querySelector(".mobile-menu__list");

	let _openMenu = e => {
		e.preventDefault();

		menu.classList.toggle("active");
		button.classList.toggle("active");
		document.body.classList.toggle("lock");
	};

	let _closeMenu = e => {
		e.preventDefault();

		if (e.target.className === "mobile-menu__link") {
			menu.classList.remove("active");
			button.classList.remove("active");
			document.body.classList.remove("lock");
		}
	};

	let addListeners = () => {
		button.addEventListener("click", _openMenu);
		list.addEventListener("click", _closeMenu);
	};

	return {
		init: addListeners
	};
};

hamburger({
	button: ".hamburger-menu-link",
	menu: ".mobile-menu"
}).init();  
///////////form//////
const myform = document.querySelector("#myform");
const send = document.querySelector("#send");
const formRow = document.querySelector(".form__row-block");

send.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm(myform)) {
        let data = new FormData;
        data.append("name", myform.elements.name.value);
        data.append("phone", myform.elements.phone.value);
        data.append("street", myform.elements.street.value);
        data.append("home", myform.elements.home.value);
        data.append("sect", myform.elements.sect.value);
        data.append("appartment", myform.elements.appartment.value);
        data.append("comment", myform.elements.comment.value);
        data.append("to", "my@gmail.com");

        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(data);
        xhr.addEventListener('load', () => {
            if (xhr.response.status == 1) {
                const element = document.createElement("div");
                formRow.appendChild(element);
                element.classList.add("message__modal");

                const element2 = document.createElement("div");
                element.appendChild(element2);
                element2.classList.add("message__send");

                const element3 = document.createElement("div");
                element2.appendChild(element3);
                element3.classList.add("message__text");
                element3.textContent = "Спасибо за заказ.";

                const element4 = document.createElement("button");
                element2.appendChild(element4);
                element4.classList.add("btn");
                element4.textContent = "Закрыть";

                element4.addEventListener('click', function () {
                    formRow.removeChild(element);
                });
            }
            else {
                const element = document.createElement("div");
                formRow.appendChild(element);
                element.classList.add("message__modal");

                const element2 = document.createElement("div");
                element.appendChild(element2);
                element2.classList.add("message__send");

                const element3 = document.createElement("div");
                element2.appendChild(element3);
                element3.classList.add("message__text");
                element3.textContent = "Сообщение не отправлено.";

                const element4 = document.createElement("button");
                element2.appendChild(element4);
                element4.classList.add("btn");
                element4.textContent = "Закрыть";

                element4.addEventListener('click', function () {
                    formRow.removeChild(element);
                });
            }
            send.disabled = false;
        });
    }
});

function validateForm(form) {
    let valid = true;
    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.street)) {
        valid = false;
    }
    if (!validateField(form.elements.home)) {
        valid = false;
    }
    if (!validateField(form.elements.sect)) {
        valid = false;
    }
    if (!validateField(form.elements.appartment)) {
        valid = false;
    }
    if (!validateField(form.elements.comment)) {
        valid = true;
    }
    return valid;
}

function validateField(field) {
    if (!field.checkValidity()) {
        field.nextElementSibling.textContent = field.validationMessage;
        return false;
    } else {
        field.nextElementSibling.textContent = "";
        return true;
    }
}

/////////// стили инпутов

const phone = document.querySelector('#formphone');

phone.addEventListener('keydown', function (e) {
    let isDigit = false;
    let isDash = false;
    let isControl = false;
    let isBackspace = false;

    if (e.key >= 0 || e.key <= 9) {
        isDigit = true;
    }
    if (e.key == '-') {
        isDash = true;
    }

    if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
        isControl = true;
    }

    if (e.key == 'Backspace') {
        isBackspace = true;
    }

    if (!isDigit && !isDash && !isControl && !isBackspace) {
        e.preventDefault();
    }
});

const formjustNumber = document.querySelector('#formjustNumber');

formjustNumber.addEventListener('keydown', function (e) {
    let isDigit = false;
    let isDash = false;
    let isControl = false;
    let isBackspace = false;

    if (e.key >= 0 || e.key <= 9) {
        isDigit = true;
    }
    if (e.key == '-') {
        isDash = false;
    }

    if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
        isControl = true;
    }

    if (e.key == 'Backspace') {
        isBackspace = true;
    }

    if (!isDigit && !isDash && !isControl && !isBackspace) {
        e.preventDefault();
    }
});

const formNumber = document.querySelector('#formNumber');

formNumber.addEventListener('keydown', function (e) {
    let isDigit = false;
    let isDash = false;
    let isControl = false;
    let isBackspace = false;

    if (e.key >= 0 || e.key <= 9) {
        isDigit = true;
    }
    if (e.key == '-') {
        isDash = false;
    }

    if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
        isControl = true;
    }

    if (e.key == 'Backspace') {
        isBackspace = true;
    }

    if (!isDigit && !isDash && !isControl && !isBackspace) {
        e.preventDefault();
    }
});
/////////////////////////////////////////////
const sections = $(".section");
const display = $(".maincontent");
let inscroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const countPositionPercent = sectionEq => {
  return `${sectionEq * -100}%`;
};

const switchActiveClass = (elems, elemNdx) => {
  elems
    .eq(elemNdx)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const unBlockScroll = () => {
  setTimeout(() => {
    inscroll = false;
  }, 1300); 
};

const performTransition = sectionEq => {
  if (inscroll) return;
  inscroll = true;

  const position = countPositionPercent(sectionEq);
  const switchFixedMenuClass = () =>
    switchActiveClass($(".fixed-menu__item"), sectionEq);

  switchActiveClass(sections, sectionEq);
  switchFixedMenuClass();

  display.css({
    transform: `translateY(${position})`
  });

  unBlockScroll();
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "next" : "prev";
    scrollViewport(direction);
  },
  keydown: e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";

    if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 40:
        scrollViewport("next");
        break;

      case 38:
        scrollViewport("prev");
        break;
    }
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
});

// mobile
if (isMobile) {
  window.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
    },
    { passive: false }
  );

  $("body").swipe({
    swipe: (event, direction) => {
      let scrollDirecrion;
      if (direction === "up") scrollDirecrion = "next";
      if (direction === "down") scrollDirecrion = "prev";
      scrollViewport(scrollDirecrion);
    }
  });
}
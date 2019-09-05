//////Меню (аккордеон)
const menu = document.querySelector('.menu-acco');
const accoItem = document.querySelectorAll('.menu-acco__item'); 
const accoItemLength = accoItem.Length;
console.log(accoItemLength);


menu.addEventListener('click', function(e) {
    e.preventDefault();
    for (let i = 0; i < accoItemLength; i++) {
        accoItem[i].classList.remove('menu-acco__item--active');
    }
});

for (let i = 0; i < accoItemLength; i++) {
    accoItem[i].addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

        if (accoItem[i].classList.contains('menu-acco__item--active')) {
            accoItem[i].classList.remove('menu-acco__item--active');
        } else {
            for (let i = 0; i < accoItemLength; i++) {
                accoItem[i].classList.remove('menu-acco__item--active');   
            }
            accoItem[i].classList.add('menu-acco__item--active');
        }
    });
}

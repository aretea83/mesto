let profileInfoButton = document.querySelector('.profile__info-btn');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__info-name');
let profileAbout = document.querySelector('.profile__info-about');
let popupForm = document.querySelector('.popup__container');
let popupName = popupForm.querySelector('.popup__name');
let popupAbout = popupForm.querySelector('.popup__about');

// делаем popup видимым
profileInfoButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

// закрываем popup
function popupNone() {
  popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', popupNone);

// вводим текст в поля из input и закрываем popup функцией popupNone
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    popupNone();
}

popupForm.addEventListener('submit', formSubmitHandler);

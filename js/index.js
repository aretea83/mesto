let profileInfoButton = document.querySelector('.profile__info-btn');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__info-name');
let profileAbout = document.querySelector('.profile__info-about');
let popupForm = document.querySelector('.popup__container');
let popupName = popupForm.querySelector('#popup-name');
let popupAbout = popupForm.querySelector('#popup-about');

// делаем popup видимым
function popupOpen() {
  popup.classList.add('popup_opened');

  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

// закрываем popup
function popupNone() {
  popup.classList.remove('popup_opened');
}

// вводим текст в поля из input и закрываем popup функцией popupNone
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    popupNone();
}

profileInfoButton.addEventListener('click', popupOpen); // нажатием кнопки в профайле открываем popup
popupClose.addEventListener('click', popupNone); // клик по кнопке закрыть(закрывается popup)
popupForm.addEventListener('submit', formSubmitHandler); //отправка формы

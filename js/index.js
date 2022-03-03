import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const page = document.querySelector('.page');

const profileInfoButton = document.querySelector('.profile__info-btn'); // section profile
const profileName = document.querySelector('.profile__info-name');
const profileAbout = document.querySelector('.profile__info-about');
const profileButton = document.querySelector('.profile__btn');

const galleryContainer = document.querySelector('.gallery__items'); // ul из section gallery

const popupProfile = document.querySelector('.popup-profile'); // popup-profile
const popupProfileClose = popupProfile.querySelector('.popup-profile__close');
const popupProfileForm = popupProfile.querySelector('.popup__items');
const popupProfileName = popupProfileForm.querySelector('#popup-name');
const popupProfileAbout = popupProfileForm.querySelector('#popup-about');

const popupCards = document.querySelector('.popup-cards'); // popup-cards
const popupCloseCards = popupCards.querySelector('.popup__close-cards');
const popupCardsForm = popupCards.querySelector('.popup__items-cards');
const popupCardsTitle = popupCards.querySelector('#popup-title');
const popupCardsLink = popupCards.querySelector('#popup-link');
const popupCardsBtn = popupCards.querySelector('.popup__btn');

const popupGallery = document.querySelector('.popup-gallery'); // popup-gallery
const popupGalleryClose = popupGallery.querySelector('.popup-gallery__close');
const popupGalleryImg = popupGallery.querySelector('.popup-gallery__img');
const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');

// карточки через template
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const  settings = ({
  formSelector: '.popup__items',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error'
});

const profileValidator = new FormValidator(settings, popupProfileForm);
const cardValidator = new FormValidator(settings, popupCardsForm);

function createCard(name, link) {
  const card = new Card(name, link);
  const cardElement = card.generateCard();

  galleryContainer.prepend(cardElement);
}

initialCards.reverse().forEach((item) => { // перебор массива и добавление карточек из него
  createCard(item, '#gallery-template');
});

function submitCardForm(evt) {
  evt.preventDefault();

  const item = {  // заменяем значения из инпутов popup
    link: popupCardsLink.value,
    name: popupCardsTitle.value
  };
  createCard(item, '#gallery-template');
  closePopup(popupCards);

  popupCardsForm.reset(); // обнуляем инпуты добавления карточки
  popupCardsBtn.disabled = true;
  popupCardsBtn.classList.add('popup__btn_disabled');
}

// делаем popup видимым
function openPopup(popup) { // эта функция принимает узел Node, которая является попапом
  popup.classList.add('popup_opened');
  popup.addEventListener('click', clickOnPage);  // слушатель при клике вне попапа
  page.addEventListener('keydown', closePopupOnEsc); // слушатель при нажатии на Esc
}

// закрываем popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', clickOnPage);  // удаляем слушатели при закрытии попапа
  page.removeEventListener('keydown', closePopupOnEsc); // удаляем слушатели при закрытии попапа
}

// вводим текст в поля из input и закрываем popup функцией closePopup
function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileAbout.textContent = popupProfileAbout.value;

  closePopup(popupProfile);
}

function closePopupOnEsc(evt) { // функция закрытия popup на Esc
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened')); // срабатывает на открытом попапе
  }
}

function clickOnPage(evt) { // функция закрытия попапа по клику вне
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

profileValidator.enableValidation(); // вызов функций валидации
cardValidator.enableValidation();

profileInfoButton.addEventListener('click', () => {// нажатием кнопки в профайле открываем popup
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
});
popupProfileClose.addEventListener('click', () => closePopup(popupProfile)); // клик по кнопке закрыть(закрывается popup)
popupProfileForm.addEventListener('submit', submitProfileForm); //отправка формы
profileButton.addEventListener('click', () => openPopup(popupCards)); // открыть popup карточки
popupCloseCards.addEventListener('click', () => closePopup(popupCards)); // закрыть popup карточки
popupCardsForm.addEventListener('submit', submitCardForm); // добавление карточки при отправке формы popupCards

export {popupGallery, popupGalleryImg, popupGalleryCaption, popupGalleryClose, openPopup, closePopup};

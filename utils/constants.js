export const page = document.querySelector('.page');

export const profileInfoButton = document.querySelector('.profile__info-btn'); // section profile
export const profileName = document.querySelector('.profile__info-name');
export const profileAbout = document.querySelector('.profile__info-about');
export const profileButton = document.querySelector('.profile__btn');

export const galleryContainer = document.querySelector('.gallery__items'); // ul из section gallery

export const popupProfile = document.querySelector('.popup-profile'); // popup-profile
export const popupProfileClose = popupProfile.querySelector('.popup-profile__close');
export const popupProfileForm = popupProfile.querySelector('.popup__items');
export const popupProfileName = popupProfileForm.querySelector('#popup-name');
export const popupProfileAbout = popupProfileForm.querySelector('#popup-about');

export const popupCards = document.querySelector('.popup-cards'); // popup-cards
export const popupCloseCards = popupCards.querySelector('.popup__close-cards');
export const popupCardsForm = popupCards.querySelector('.popup__items-cards');
export const popupCardsTitle = popupCards.querySelector('#popup-title');
export const popupCardsLink = popupCards.querySelector('#popup-link');
export const popupCardsBtn = popupCards.querySelector('.popup__btn');

export const popupGallery = document.querySelector('.popup-gallery'); // popup-gallery
export const popupGalleryClose = popupGallery.querySelector('.popup-gallery__close');
export const popupGalleryImg = popupGallery.querySelector('.popup-gallery__img');
export const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');

// карточки через template
export const initialCards = [{
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

export const settings = ({
  formSelector: '.popup__items',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error'
});


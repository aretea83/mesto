let profileInfoButton = document.querySelector('.profile__info-btn');
let popup = document.querySelector('.popup');
let popupProfile = document.querySelector('.popup-profile');
let popupClose = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__info-name');
let profileAbout = document.querySelector('.profile__info-about');
let popupForm = popup.querySelector('.popup__items');
let popupCardSubmit = popup.querySelector('.popup__items-cards');
let popupName = popupForm.querySelector('#popup-name');
let popupAbout = popupForm.querySelector('#popup-about');
let profileButton = document.querySelector('.profile__btn');
let popupCards = document.querySelector('.popup-cards');
let popupCloseCards = popupCards.querySelector('.popup__close-cards');
let popupTitle = popupForm.querySelector('#popup-title');
let popupLink = popupForm.querySelector('#popup-link');
let galleryContainer = document.querySelector('.gallery__items');
let popupGallery = document.querySelector('.popup-gallery');
let popupGalleryClose = popupGallery.querySelector('.popup-gallery__close');

// делаем popup видимым
function popupOpen(popup) {
  popup.classList.add('popup_opened');

  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

// закрываем popup
function popupNone(popup) {
  popup.classList.remove('popup_opened');
}

// вводим текст в поля из input и закрываем popup функцией popupNone
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;

    popupNone(popup);
}

profileInfoButton.addEventListener('click', () => popupOpen(popupProfile)); // нажатием кнопки в профайле открываем popup
popupClose.addEventListener('click', () => popupNone(popupProfile)); // клик по кнопке закрыть(закрывается popup)
popupForm.addEventListener('submit', formSubmitHandler); //отправка формы
profileButton.addEventListener('click', () => popupOpen(popupCards)); // открыть popup карточки
popupCloseCards.addEventListener('click', () => popupNone(popupCards)); // закрыть popup карточки
popupGalleryClose.addEventListener('click', () => popupNone(popupGallery)); // закрыть фото с карточки

// карточки через template
const initialCards = [
  {
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

 /* initialCards.forEach((item) => {
  const galleryTemplate = document.querySelector('#gallery-template').content;
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__item-del').addEventListener('click', (evt) => { //удаление карточки
    evt.target.closest('.gallery__item');
    galleryItem.remove();
  });
  galleryItem.querySelector('.gallery__image').src = item.link;
  galleryItem.querySelector('.gallery__element');
  galleryItem.querySelector('.gallery__name').textContent = item.name;
  galleryItem.querySelector('.gallery__like').addEventListener('click', (evt) => { //делаем сердечко активным
    evt.target.classList.toggle('gallery__like_active');
  });
  galleryContainer.append(galleryItem);
  galleryItem.querySelector('.gallery__image').addEventListener('click', () => {  // по клику на картинку карточки, фото открывается
    const popupGalleryImg = popupGallery.querySelector('.popup-gallery__img');
    const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');

    popupGalleryImg.src = item.link;
    popupGalleryCaption.textContent = item.name;
    popupOpen(popupGallery);
  });
});

function addCard() {
  const galleryTemplate = document.querySelector('#gallery-template').content;
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__item-del').addEventListener('click', (evt) => { //удаление карточки
    evt.target.closest('.gallery__item');
    galleryItem.remove();
  });
  galleryItem.querySelector('.gallery__image').src = popupLink.value;
  galleryItem.querySelector('.gallery__element');
  galleryItem.querySelector('.gallery__name').textContent = popupTitle.value;
  galleryItem.querySelector('.gallery__like').addEventListener('click', (evt) => { //делаем сердечко активным
    evt.target.classList.toggle('gallery__like_active');
  });
  galleryContainer.prepend(galleryItem);
  galleryItem.querySelector('.gallery__image').addEventListener('click', () => {  // по клику на картинку карточки, фото открывается
    const popupGalleryImg = popupGallery.querySelector('.popup-gallery__img');
    const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');

    popupGalleryImg.src = popupLink.value;
    popupGalleryCaption.textContent = popupTitle.value;
    popupOpen(popupGallery);
  });
}*/

const galleryTemplate = document.querySelector('#gallery-template').content;

function addCards() {
  initialCards.forEach(createCard);
}

function createCard(item) {
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__item-del').addEventListener('click', (evt) => { //удаление карточки
    evt.target.closest('.gallery__item');
    galleryItem.remove();
  });
  galleryItem.querySelector('.gallery__image').src = item.link;
  galleryItem.querySelector('.gallery__element');
  galleryItem.querySelector('.gallery__name').textContent = item.name;
  galleryItem.querySelector('.gallery__like').addEventListener('click', (evt) => { //делаем сердечко активным
    evt.target.classList.toggle('gallery__like_active');
  });
  galleryItem.querySelector('.gallery__image').addEventListener('click', () => {  // по клику на картинку карточки, фото открывается
    const popupGalleryImg = popupGallery.querySelector('.popup-gallery__img');
    const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');

    popupGalleryImg.src = item.link;
    popupGalleryCaption.textContent = item.name;
    popupOpen(popupGallery);
  });
  galleryContainer.append(galleryItem);
}
addCards();

function cardFormSubmit(evt) {
  evt.preventDefault();
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__image').src = popupLink.value;
  galleryItem.querySelector('.gallery__name').textContent = popupTitle.value;

  galleryContainer.prepend(galleryItem);
  popupNone(popupCards);
}

popupCardSubmit.addEventListener('submit', cardFormSubmit);


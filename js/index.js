let profileInfoButton = document.querySelector('.profile__info-btn'); // section profile
let profileName = document.querySelector('.profile__info-name');
let profileAbout = document.querySelector('.profile__info-about');
let profileButton = document.querySelector('.profile__btn');

let galleryContainer = document.querySelector('.gallery__items'); // ul из section gallery

//let popup = document.querySelector('.popup');
let popupProfile = document.querySelector('.popup-profile'); // popup-profile
let popupProfileClose = popupProfile.querySelector('.popup-profile__close');
let popupProfileForm = popupProfile.querySelector('.popup__items');
let popupProfileName = popupProfileForm.querySelector('#popup-name');
let popupProfileAbout = popupProfileForm.querySelector('#popup-about');

let popupCards = document.querySelector('.popup-cards'); // popup-cards
let popupCloseCards = popupCards.querySelector('.popup__close-cards');
let popupCardsCardSubmit = popupCards.querySelector('.popup__items-cards');
let popupCardsTitle = popupCards.querySelector('#popup-title');
let popupCardsLink = popupCards.querySelector('#popup-link');

let popupGallery = document.querySelector('.popup-gallery'); // popup-gallery
let popupGalleryClose = popupGallery.querySelector('.popup-gallery__close');

// делаем popup видимым
function popupOpen(popup) { // эта функция принимает узел Node, которая является попапом (popupGallery или popupCards)
  popup.classList.add('popup_opened');

  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
}

// закрываем popup
function popupNone(popup) {
  popup.classList.remove('popup_opened');
}

// вводим текст в поля из input и закрываем popup функцией popupNone
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileAbout.textContent = popupProfileAbout.value;

  popupNone(popupProfile);
}

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

const galleryTemplate = document.querySelector('#gallery-template').content;

function addCards() {
  initialCards.reverse().forEach(createCard); // перебор массива
}

function createCard(item) { // создание карточки
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__item-del').addEventListener('click', () => { //удаление карточки
    galleryItem.remove();
  });
  galleryItem.querySelector('.gallery__image').src = item.link;
  galleryItem.querySelector('.gallery__element');
  galleryItem.querySelector('.gallery__name').textContent = item.name;
  galleryItem.querySelector('.gallery__like').addEventListener('click', (evt) => { //делаем сердечко активным
    evt.target.classList.toggle('gallery__like_active');
  });
  galleryItem.querySelector('.gallery__image').addEventListener('click', () => { // по клику на картинку карточки, фото открывается
    const popupGalleryImg = popupGallery.querySelector('.popup-gallery__img');
    const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');

    popupGalleryImg.src = item.link;
    popupGalleryCaption.textContent = item.name;
    popupOpen(popupGallery);
  });
  galleryContainer.prepend(galleryItem);
}

function cardFormSubmit(evt) {
  evt.preventDefault();

  const item = {  // заменяем значения из инпутов popup
    link: popupCardsLink.value,
    name: popupCardsTitle.value
  };
  createCard(item);
  popupNone(popupCards);

  popupCardsLink.value = ''; // обнуляем инпуты
  popupCardsTitle.value = '';
}

profileInfoButton.addEventListener('click', () => popupOpen(popupProfile)); // нажатием кнопки в профайле открываем popup
popupProfileClose.addEventListener('click', () => popupNone(popupProfile)); // клик по кнопке закрыть(закрывается popup)
popupProfileForm.addEventListener('submit', formSubmitHandler); //отправка формы
profileButton.addEventListener('click', () => popupOpen(popupCards)); // открыть popup карточки
popupCloseCards.addEventListener('click', () => popupNone(popupCards)); // закрыть popup карточки
popupGalleryClose.addEventListener('click', () => popupNone(popupGallery)); // закрыть фото с карточки
popupCardsCardSubmit.addEventListener('submit', cardFormSubmit); // добавление карточки при отправке формы popupCards
addCards();


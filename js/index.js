const profileInfoButton = document.querySelector('.profile__info-btn'); // section profile
const profileName = document.querySelector('.profile__info-name');
const profileAbout = document.querySelector('.profile__info-about');
const profileButton = document.querySelector('.profile__btn');

const galleryContainer = document.querySelector('.gallery__items'); // ul из section gallery

//const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile'); // popup-profile
const popupProfileClose = popupProfile.querySelector('.popup-profile__close');
const popupProfileForm = popupProfile.querySelector('.popup__items');
const popupProfileName = popupProfileForm.querySelector('#popup-name');
const popupProfileAbout = popupProfileForm.querySelector('#popup-about');

const popupCards = document.querySelector('.popup-cards'); // popup-cards
const popupCloseCards = popupCards.querySelector('.popup__close-cards');
const popupCardsCardSubmit = popupCards.querySelector('.popup__items-cards');
const popupCardsTitle = popupCards.querySelector('#popup-title');
const popupCardsLink = popupCards.querySelector('#popup-link');

const popupGallery = document.querySelector('.popup-gallery'); // popup-gallery
const popupGalleryClose = popupGallery.querySelector('.popup-gallery__close');

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


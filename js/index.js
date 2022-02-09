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
const popupCardsCardSubmit = popupCards.querySelector('.popup__items-cards');
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

const galleryTemplate = document.querySelector('#gallery-template').content;

function createCard(name, link) { // создание карточки
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);
  const galleryItemDel = galleryItem.querySelector('.gallery__item-del');
  const galleryImage = galleryItem.querySelector('.gallery__image');

  galleryImage.src = link;
  galleryImage.alt = name;
  galleryItem.querySelector('.gallery__element');
  galleryItem.querySelector('.gallery__name').textContent = name;
  galleryItem.addEventListener('click', likeCard); // вызов функции лайка карточки
  galleryImage.addEventListener('click', openGalleryImage); // вызов функции открытия большой картинки
  galleryItemDel.addEventListener('click', deleteCard); // вызов функции удаления карточки

  return galleryItem;
}

function openGalleryImage(evt) { // функция открытия большой картинки
  const name = evt.target.closest('.gallery__item').querySelector('.gallery__name').textContent;
  const link = evt.target.closest('.gallery__item').querySelector('.gallery__image').src;

  popupGalleryImg.src = link;
  popupGalleryImg.alt = name;
  popupGalleryCaption.textContent = name;
  openPopup(popupGallery);
}

function addCard(container, element) { // функция добавления элемента в контейнер
  container.prepend(element);
}

initialCards.reverse().forEach(item => { // перебор массива с конца и добавление карточек в контейнер
  addCard(galleryContainer, createCard(item.name, item.link));
});

function cardFormSubmit(evt) {
  evt.preventDefault();

  const item = {  // заменяем значения из инпутов popup
    link: popupCardsLink.value,
    name: popupCardsTitle.value
  };
  addCard(galleryContainer, createCard(item.name, item.link)); // вызов функции добавления карточки с значениями инпутов
  closePopup(popupCards);

  popupCardsCardSubmit.reset(); // обнуляем инпуты добавления карточки
  popupCardsBtn.disabled = true;
  popupCardsBtn.classList.add('popup__btn_disabled');
}

function likeCard(evt) { // функция лайков
  if (evt.target.classList.contains('gallery__like')) {
    evt.target.classList.toggle('gallery__like_active');
  }
}

function deleteCard(evt) { // функция удаления карточки
  evt.target.closest('.gallery__item').remove();
}

// делаем popup видимым
function openPopup(popup) { // эта функция принимает узел Node, которая является попапом
  popup.classList.add('popup_opened');
  popup.addEventListener('click', clickOnPage);  // слушатель при клике вне попапа
  page.addEventListener('keydown', keyHandlerEsc); // слушатель при нажатии на Esc
}

// закрываем popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', clickOnPage);  // удаляем слушатели при закрытии попапа
  page.removeEventListener('keydown', keyHandlerEsc); // удаляем слушатели при закрытии попапа
}

// вводим текст в поля из input и закрываем popup функцией closePopup
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileAbout.textContent = popupProfileAbout.value;

  closePopup(popupProfile);
}

function keyHandlerEsc(evt) { // функция закрытия popup на Esc
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened')); // срабатывает на открытом попапе
  }
}

function clickOnPage(evt) { // функция закрытия попапа по клику вне
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

profileInfoButton.addEventListener('click', () => {// нажатием кнопки в профайле открываем popup
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
});
popupProfileClose.addEventListener('click', () => closePopup(popupProfile)); // клик по кнопке закрыть(закрывается popup)
popupProfileForm.addEventListener('submit', formSubmitHandler); //отправка формы
profileButton.addEventListener('click', () => openPopup(popupCards)); // открыть popup карточки
popupCloseCards.addEventListener('click', () => closePopup(popupCards)); // закрыть popup карточки
popupGalleryClose.addEventListener('click', () => closePopup(popupGallery)); // закрыть фото с карточки
popupCardsCardSubmit.addEventListener('submit', cardFormSubmit); // добавление карточки при отправке формы popupCards



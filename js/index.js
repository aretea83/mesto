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

  galleryItem.querySelector('.gallery__item-del').addEventListener('click', () => { //удаление карточки
    galleryItem.remove();
  });
  galleryItem.querySelector('.gallery__image').src = link;
  galleryItem.querySelector('.gallery__image').alt = name;
  galleryItem.querySelector('.gallery__element');
  galleryItem.querySelector('.gallery__name').textContent = name;
  galleryItem.querySelector('.gallery__like').addEventListener('click', (evt) => { //делаем сердечко активным
    evt.target.classList.toggle('gallery__like_active');
  });
  galleryItem.querySelector('.gallery__image').addEventListener('click', () => { // по клику на картинку карточки, фото открывается
    const popupGalleryImg = popupGallery.querySelector('.popup-gallery__img');
    const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');

    popupGalleryImg.src = link;
    popupGalleryCaption.textContent = name;
    popupOpen(popupGallery);
  });
  return galleryItem;
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
}

// делаем popup видимым
function popupOpen(popup) { // эта функция принимает узел Node, которая является попапом (popupGallery или popupCards)
  popup.classList.add('popup_opened');
}

// закрываем popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// вводим текст в поля из input и закрываем popup функцией closePopup
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileAbout.textContent = popupProfileAbout.value;

  closePopup(popupProfile);
}

profileInfoButton.addEventListener('click', () => {// нажатием кнопки в профайле открываем popup
  popupOpen(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
});
popupProfileClose.addEventListener('click', () => closePopup(popupProfile)); // клик по кнопке закрыть(закрывается popup)
popupProfileForm.addEventListener('submit', formSubmitHandler); //отправка формы
profileButton.addEventListener('click', () => popupOpen(popupCards)); // открыть popup карточки
popupCloseCards.addEventListener('click', () => closePopup(popupCards)); // закрыть popup карточки
popupGalleryClose.addEventListener('click', () => closePopup(popupGallery)); // закрыть фото с карточки
popupCardsCardSubmit.addEventListener('submit', cardFormSubmit); // добавление карточки при отправке формы popupCards



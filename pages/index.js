import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {profileInfoButton, profileName, profileAbout, profileButton, popupProfileForm, popupProfileName, popupProfileAbout, popupCardsForm, popupCardsTitle, popupCardsLink, popupCardsBtn, initialCards, settings} from '../utils/constants.js';


const profileValidator = new FormValidator(settings, popupProfileForm);
const cardValidator = new FormValidator(settings, popupCardsForm);
const popupWithImage = new PopupWithImage('.popup-gallery');

const openGalleryImage = (evt) => { // открытие картинки
  popupWithImage.open(evt);
}

const createCard = (item) => {  // создаем карточку
  const card = new Card(item, '#gallery-template', openGalleryImage);
  const cardElement = card.generateCard();
  return cardElement;
}

const renderCards = new Section({  // перебор и добавление в контейнер из массива
  items: initialCards,
  renderer: (item) => {
    renderCards.addItem(createCard(item));
  }
}, '.gallery__items');

const addCard = () => {  // добавление карточки
  renderCards.addItem(createCard({
    name: popupCardsTitle.value,
    link: popupCardsLink.value
  }));
}

const popupCardsWithForm = new PopupWithForm('.popup-cards', addCard);

const submitCardForm = () => {
  popupCardsBtn.disabled = true;
  popupCardsBtn.classList.add('popup__btn_disabled');
  popupCardsLink.value = '';
  popupCardsTitle.value = '';

  popupCardsWithForm.open();
}

const userInfo = new UserInfo({userName: profileName, userAbout: profileAbout});

const submitProfileForm = (inputs) => {
  userInfo.setUserInfo(inputs);
}

const popupProfileWithForm = new PopupWithForm('.popup-profile', submitProfileForm);

const changeProfile = () => { // замена данных профиля
  const profileInfo = userInfo.getUserInfo();
  popupProfileName.value = profileInfo.name;
  popupProfileAbout.value = profileInfo.about;

  popupProfileWithForm.open();
}

profileButton.addEventListener('click', submitCardForm);
profileInfoButton.addEventListener('click', changeProfile);
profileValidator.enableValidation(); // вызов функций валидации
cardValidator.enableValidation();
renderCards.renderItems();  // вызов загрузки карточек


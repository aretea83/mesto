import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import PopupWitConfirmation from '../components/PopupWithConfirmation';
import {profileInfoButton, profileName, profileAbout, profileButton, popupProfileForm, popupProfileName, popupProfileAbout, popupCardsForm, popupCardsTitle, popupCardsLink, popupCardsBtn, initialCards, settings, profileAvatar, popupAvatarForm, popupAvatarOpenBtn} from '../utils/constants.js';

const profileValidator = new FormValidator(settings, popupProfileForm);
const cardValidator = new FormValidator(settings, popupCardsForm);
const avatarValidator = new FormValidator(settings, popupAvatarForm);
const popupWithImage = new PopupWithImage('.popup-gallery');

let userId;
// профиль
api.getProfile()
  .then((res) => {
    userInfo.setUserInfo(res)
    userId = res._id;
  })
  .catch((err) => console.log(err));

const userInfo = new UserInfo({userName: profileName, userAbout: profileAbout, userAvatar: profileAvatar});

const submitProfileForm = (inputs) => {
  popupProfileWithForm.renderLoading(true);
  api.editProfile(inputs)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfileWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupProfileWithForm.renderLoading(false))
}

const popupProfileWithForm = new PopupWithForm('.popup-profile', submitProfileForm);

const changeProfile = () => { // замена данных профиля
  const profileInfo = userInfo.getUserInfo();
  popupProfileName.value = profileInfo.name;
  popupProfileAbout.value = profileInfo.about;

  profileValidator.resetValidation();
  popupProfileWithForm.open();
}

// карточки
const renderCards = new Section({  // перебор и добавление в контейнер из массива
  items: [],
  renderer: (item) => {
    renderCards.setItem(createCard(item, userId));
  }
}, '.gallery__items');

  api.getInitialCards(userId)
  .then(res => {
    res.forEach((data) => {
      const card = createCard(data, userId)
      renderCards.setItem(card)
    })
  })

const confirmPopup = new PopupWitConfirmation('.popup__card-delete');

function createCard(item) {  // создаем карточку
  const card = new Card(item, userId, '#gallery-template', handleCardClick, (id) => { // функция handleDeleteClick
    confirmPopup.open();
    confirmPopup.submitForm(() => {
      api.deleteCard(id)
        .then(() => {
          confirmPopup.close();
          card.deleteCard();
        })
        .catch((err) => console.log(err))
    })
  }, (id) => { // функция handleLikeClick
    if(card.isLiked()) {
      api.deleteLike(id)
        .then((res) => card.setLikes(res.likes))
        .catch((err) => console.log(err))
    } else {
      api.putLike(id)
        .then((res) => card.setLikes(res.likes))
        .catch((err) => console.log(err))
    }
  });

  return card.generateCard();
}

const popupCardsWithForm = new PopupWithForm('.popup-cards', addCard);

function addCard(item) {  // добавление карточки
  popupCardsWithForm.renderLoading(true);
  api.postCard(item.name, item.link)
    .then((res) => { renderCards.addItem(createCard(res));
    popupCardsWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupCardsWithForm.renderLoading(false))
}

const handleCardClick = (evt) => { // открытие картинки
  popupWithImage.open(evt);
}

const openCardForm = () => {
  cardValidator.resetValidation();
  popupCardsWithForm.open();
}

// аватар
const popupAvatarWithForm = new PopupWithForm('.popup-avatar', handleFormAvatar);

function handleFormAvatar (data){
  popupAvatarWithForm.renderLoading(true);
  api.patchAvatar(data)
    .then (() => {
      userInfo.setUserInfo(data.link);
      popupAvatarWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatarWithForm.renderLoading(false))
}

function openAvatarForm() {
  avatarValidator.resetValidation();
  popupAvatarWithForm.open();
}

popupAvatarOpenBtn.addEventListener('click', openAvatarForm);
profileButton.addEventListener('click', openCardForm);
profileInfoButton.addEventListener('click', changeProfile);
profileValidator.enableValidation(); // вызов функций валидации
cardValidator.enableValidation();
avatarValidator.enableValidation();
//renderCards.renderItems();  // вызов загрузки карточек
popupCardsWithForm.setEventListeners();
popupProfileWithForm.setEventListeners();
popupWithImage.setEventListeners();
confirmPopup.setEventListeners();
popupAvatarWithForm.setEventListeners();


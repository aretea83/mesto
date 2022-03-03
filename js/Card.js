import {popupGallery, popupGalleryImg, popupGalleryCaption, popupGalleryClose, openPopup, closePopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() { // разметка карточки
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__item').cloneNode(true);

    return cardElement;
  }

  _deleteCard(evt) { // функция удаления карточки
    evt.target.closest('.gallery__item').remove();
    this._element = null;
  }

  _likeCard(evt) { // лайк карточки
    if(evt.target.classList.contains('gallery__like')) {
      evt.target.classList.toggle('gallery__like_active');
    }
  }

  _openGalleryImage(evt) { // открытие картинки
    popupGalleryImg.src = evt.target.src;
    popupGalleryImg.alt = evt.target.alt;
    popupGalleryCaption.textContent = evt.target.alt;
    openPopup(popupGallery);
  }

  _setEventListeners() { // все оработчики
    this._element.querySelector('.gallery__item-del').addEventListener('click', this._deleteCard);
    this._element.addEventListener('click', this._likeCard);
    this._element.querySelector('.gallery__image').addEventListener('click', this._openGalleryImage);
    popupGalleryClose.addEventListener('click', () => closePopup(popupGallery));
  }

  generateCard() { // создание карточки
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.gallery__name').textContent = this._name;
    this._element.querySelector('.gallery__image').src = this._link;
    this._element.querySelector('.gallery__image').alt = this._name;

    return this._element;
  }
}

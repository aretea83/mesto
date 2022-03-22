
export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() { // разметка карточки
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__item').cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.gallery__like');
    return this._cardElement;
  }

  _deleteCard = () => { // функция удаления карточки
    this._cardElement.remove();
  }

  _likeCard = () => { // лайк карточки
      this._likeButton.classList.toggle('gallery__like_active');
  }

  _setEventListeners() { // все оработчики
    this._element.querySelector('.gallery__item-del').addEventListener('click', this._deleteCard);
    this._likeButton.addEventListener('click', this._likeCard);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  generateCard() { // создание карточки
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__image');
    this._cardName = this._element.querySelector('.gallery__name');
    this._setEventListeners();

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
}

export default class Card {
  constructor(data, userId, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() { // разметка карточки
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__item').cloneNode(true);
    return this._cardElement;
  }

  deleteCard = () => { // функция удаления карточки
    this._cardElement.remove();
    this._cardElement = null;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCount.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add('gallery__like_active');
    } else {
      this._likeButton.classList.remove('gallery__like_active');
    }
  }

  isLiked() {
    const userLikedCard = this._likes.find(user => user._id === this._userId);
    return userLikedCard;
  }

  _setEventListeners() { // все оработчики
    this._element.querySelector('.gallery__item-del').addEventListener('click', () => this._handleDeleteClick(this._id));
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  generateCard() { // создание карточки
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__image');
    this._cardName = this._element.querySelector('.gallery__name');
    this._likeCount = this._element.querySelector('.gallery__like-count');
    this._likeButton = this._cardElement.querySelector('.gallery__like');
    this._setEventListeners();
    this.setLikes(this._likes);

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._userId !== this._ownerId) {
      this._element.querySelector('.gallery__item-del').style.display = 'none';
    }

    return this._element
  }
}

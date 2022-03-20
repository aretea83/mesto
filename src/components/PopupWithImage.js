import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupGalleryImg = this._popup.querySelector('.popup-gallery__img');
    this._popupGalleryCaption = this._popup.querySelector('.popup-gallery__caption');
  }

  open(evt) {
    this._popupGalleryImg.src = evt.target.src;
    this._popupGalleryImg.alt = evt.target.alt;
    this._popupGalleryCaption.textContent = evt.target.alt;
    super.open();
  }
}

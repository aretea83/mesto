export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handlePageClose = this._handlePageClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlePageClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close-img')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._handlePageClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handlePageClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}



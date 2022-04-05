import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__items');
    this._handleFormSubmit = handleFormSubmit;
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit();
    })
  }

  submitForm(newSubmit) {
    this._handleFormSubmit = newSubmit;
  }
}

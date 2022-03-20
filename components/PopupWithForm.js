import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitForm = this._submitForm.bind(this);
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
  }

  _getInputValues() {   //собирает данные всех полей формы
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {   //добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    this._popup.addEventListener('submit', this._submitForm);
    super.setEventListeners();
  }

  close() {   //при закрытии попапа форма должна ещё и сбрасываться
    this._popup.removeEventListener('submit', this._submitForm);
    this._inputList.forEach((input) => {
      input.value = '';
    });
    super.close();
  }
}

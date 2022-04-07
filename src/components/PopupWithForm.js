import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitForm = this._submitForm.bind(this);
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
    this._form = this._popup.querySelector('.popup__items');
    this._formBtn = this._form.querySelector('.popup__btn');
  }

  _getInputValues() { //собирает данные всех полей формы
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    //this.close();
  }

  setEventListeners() { //добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    this._popup.addEventListener('submit', this._submitForm);
    super.setEventListeners();
  }

  close() { //при закрытии попапа форма должна ещё и сбрасываться
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formBtn.textContent = 'Сохранение...';
    } else {
      this._formBtn.textContent = 'Сохранить';
    }
  }
}

export default class UserInfo {
  constructor({ userName, userAbout }) {
    this._name = userName;
    this._about = userAbout;
  }

  getUserInfo() {  //возвращает объект с данными пользователя
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(item) {  //принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = item.name;
    this._about.textContent = item.about;
  }
}

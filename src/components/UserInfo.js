export default class UserInfo {
  constructor({userName, userAbout, userAvatar}) {
    this._name = userName;
    this._about = userAbout;
    this._avatar = userAvatar;
  }

  getUserInfo() {  //возвращает объект с данными пользователя
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {  //принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}

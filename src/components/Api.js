class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err);
    })
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err);
    })
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err);
    })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err);
    })
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err);
    })
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err);
    })
  }

  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => {
        console.log(err);
      })
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'fdbba481-3f1e-4a3b-88fc-6dec895d4e3b',
    'Content-Type': 'application/json'
  }
});

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение инфо профиля
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // получение карточек
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      "Content-Type": "application/json",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  // удаление карточки
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      method: "DELETE",
      "Content-Type": "application/json",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // передача профиля на сервер
  setProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(data, isLiked){
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._handleResponse);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-35",
  headers: {
    authorization: "13e9bed3-e4af-4dd6-bea1-4d68d972a159",
    "Content-Type": "application/json",
  },
});

export default api;

export class Api {
  constructor(inObj) {
    this._baseUrl = inObj.baseUrl;
    this._headers = inObj.headers;
  }
  //Общая обработка результата запроса: ok - возвращаем сериализованный ответ, not ok - возвращаем промис со статусом  (аргумент - объект Response возвращемый промисом fetch)
  _returnStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Получить данные начальные о всех картах
  getInitialCards() {
    return fetch( `${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._returnStatus);
  }

  // Получить информацию о пользователе с сервера
  getUserInfo() {
    return fetch( `${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._returnStatus);
  }

  // Отправить данные о пользователе на сервер (аргумент - объект с данными о пользователе)
  setUserInfo(userInfoData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfoData.name,
        about: userInfoData.about,
      }),
    }).then(this._returnStatus);
  }

  //Отправить ссылку на новый аватар на сервер (аргумент - объект с данными о пользователе)
  setUserAvatar(userInfoData) {
    //console.log(userInfoData);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userInfoData.avatar,
      }),
    }).then(this._returnStatus);
  }

  //Отправить свой like серверу (аргумент - ID карточки)
  addLikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._returnStatus);
  }

  //Удалить свой like на сервере аргумент - ID карточки)
  removeLikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._returnStatus);
  }


  //Создать карту на сервере (аргумент - объект данных карточки)
  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(this._returnStatus);
  }


  //Удалить карту на сервере (аргумент - ID карточки)
  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._returnStatus);
  }
}



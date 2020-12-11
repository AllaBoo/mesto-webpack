export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }


  getUserAvatar() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

  patchUserInfo(newUserInfo) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newUserInfo.nikname,
        about: newUserInfo.job,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }


  patchUserAvatar(avatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();

        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

  postCard(userObj) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: userObj.name,
        link: userObj.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

  deleteCard(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

  putLike(id) {
    return fetch(`${this.url}cards/like/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

  deleteLike(id) {
    return fetch(`${this.url}cards/like/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }
}

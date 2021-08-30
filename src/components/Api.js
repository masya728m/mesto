export default class Api {
  #_baseUrl;
  #_headers;

  constructor({baseUrl, headers}) {
    this.#_baseUrl = baseUrl;
    this.#_headers = headers;
  }

  getUserInfo() {
    return this.#_request('GET', '/users/me')
      .then(res => res.json());
  }

  getInitialCards() {
    return this.#_request('GET', '/cards')
      .then(res => res.json())
      .catch(err => err);
  }

  setUserInfo({name, about}) {
    return this.#_request('PATCH', '/users/me', {
      name:  name,
      about: about
    })
      .then(res => res.json());
  }

  addCard({name, link}) {
    return this.#_request('POST', '/cards', {
      name: name,
      link: link
    }).then(res => res.json());
  }

  deleteCard(cardId) {
    return this.#_request('DELETE', '/cards/' + cardId)
      .then(res => res.json());
  }

  likeCard(like, cardId) {
    const method = like ? 'PUT' : 'DELETE';
    return this.#_request(method, '/cards/likes/' + cardId)
      .then(res => res.json());
  }


  updateProfileImage(imageLink) {
    return this.#_request('PATCH', '/users/me/avatar', {
      avatar: imageLink
    })
      .then(res => res.json());
  }

  #_request(method, path, body) {
    const init = {};
    init.method = method;
    init.headers = this.#_headers;
    if (body)
      init.body = body;
    return fetch(this.#_baseUrl + path, init);
  }

}
export default class UserInfo {
  #_userNameSelector;
  #_userInfoSelector;
  #_userNameElement;
  #_userInfoElement;

  constructor({userNameSelector, userInfoSelector}) {
    this.#_userNameSelector = userNameSelector;
    this.#_userInfoSelector = userInfoSelector;
    this.#_userNameElement = document.querySelector(this.#_userNameSelector);
    this.#_userInfoElement = document.querySelector(this.#_userInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this.#_userNameElement.textContent,
      userInfo: this.#_userInfoElement.textContent,
    };
  }

  setUserInfo({userName, userInfo}) {
    this.#_userNameElement.textContent = userName;
    this.#_userInfoElement.textContent = userInfo;
  }
}
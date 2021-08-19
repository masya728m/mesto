export default class Popup {
  #_popupSelector;
  #_popupElement;
  #_closeButtonSelector;
  #_closeButtonElement;
  #_handleEscCloseBound;

  constructor({popupSelector, exitButtonSelector}) {
    this.#_popupSelector = popupSelector;
    this.#_popupElement = document.querySelector(this.#_popupSelector);
    this.#_closeButtonSelector = exitButtonSelector;
    this.#_closeButtonElement = this.#_popupElement.querySelector(this.#_closeButtonSelector);
    this.#_handleEscCloseBound = this.#_handleEscClose.bind(this);
  }

  open() {
    this.#_popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this.#_handleEscCloseBound);
  }

  close() {
    this.#_popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#_handleEscCloseBound);
  }

  #_handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('click', this.#_handleClickClose.bind(this));
    this.#_closeButtonElement.addEventListener('click', this.close.bind(this));
  }

  #_handleClickClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  getElement() {
    return this.#_popupElement;
  }
}
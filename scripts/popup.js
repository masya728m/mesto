export default class Popup {
  #_popupElement;
  #_popupSelector;
  #_popupOpeningModifier;
  #_closeButtonSelector;
  #_closeButtonElement;

  constructor(popupParams) {
    this.#_popupSelector = popupParams.popupSelector;
    this.#_closeButtonSelector = popupParams.closeButtonSelector;
    this.#_popupOpeningModifier = popupParams.popupOpeningModifier;
    this.#_popupElement = document.querySelector(this.#_popupSelector);
    this.#_closeButtonElement = document.querySelector(this.#_closeButtonSelector);
    this.#_closeButtonElement.addEventListener('click', this.closePopup);
  }

  openPopup() {
    this.#_popupElement.classList.add(this.#_popupOpeningModifier);
  }

  closePopup() {
    this.#_popupElement.classList.remove(this.#_popupOpeningModifier);
  }

  getPopupElement() {
    return this.#_popupElement;
  }
}
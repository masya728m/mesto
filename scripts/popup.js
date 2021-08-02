export default class Popup {
  #_popupElement;
  #_popupSelector;
  #_popupOpeningModifier;
  #_closeButtonSelector;
  #_closeButtonElement;

  #_closeByEscapeHandlerBound;

  constructor(popupParams) {
    this.#_popupSelector = popupParams.popupSelector;
    this.#_closeButtonSelector = popupParams.closeButtonSelector;
    this.#_popupOpeningModifier = popupParams.popupOpeningModifier;
    this.#_popupElement = document.querySelector(this.#_popupSelector);
    this.#_closeButtonElement = this.#_popupElement.querySelector(this.#_closeButtonSelector);
    this.#_setupEventListeners();
    this.#_closeByEscapeHandlerBound = this.#_closeByEscapeHandler.bind(this);
  }

  #_setupEventListeners() {
    this.#_closeButtonElement.addEventListener('click', () => {
      this.closePopup();
    });
    this.#_popupElement.addEventListener('click', evt => {
      if (evt.target !== this.#_popupElement) return;
      this.closePopup();
    });
  }

  #_closeByEscapeHandler(evt) {
    if (evt.key !== 'Escape') return;
    this.closePopup();
  }

  openPopup() {
    this.#_popupElement.classList.add(this.#_popupOpeningModifier);
    document.addEventListener('keydown', this.#_closeByEscapeHandlerBound);
  }

  closePopup() {
    this.#_popupElement.classList.remove(this.#_popupOpeningModifier);
    document.removeEventListener('keydown', this.#_closeByEscapeHandlerBound);
  }

  getPopupElement() {
    return this.#_popupElement;
  }
}
export default class FormValidator {
  #_formElement;

  #_openButtonSelector;
  #_openButtonElement;

  #_submitButtonSelector;
  #_submitButtonElement;
  #_submitButtonDisableModifier;

  #_onOpenCallback;
  #_onSubmitCallback;

  #_popupFieldSelector;
  #_popupFieldErrorModifier;
  #_popupFieldErrorSelector;

  #_popupSelector;
  #_closeButtonSelector;
  #_popupOpeningModifier;
  #_popupElement;
  #_closeButtonElement;
  #_closeByEscapeHandlerBound;
  #_openButtonClickHandlerBound;
  #_submitClickHandlerBound;
  #_fieldInputHandlerBound;
  #_popupBackgroundClickHandlerBound;
  #_closeButtonClickHandler;

  constructor(formElement, formParams, popupParams) {
    this.#_formElement = formElement;
    this.#_openButtonSelector = formParams.openButtonSelector;
    this.#_popupFieldSelector = formParams.popupFieldSelector;
    this.#_popupFieldErrorSelector = formParams.popupFieldErrorSelector;
    this.#_popupFieldErrorModifier = formParams.popupFieldErrorModifier;

    this.#_openButtonElement = document.querySelector(this.#_openButtonSelector);

    this.#_popupSelector = popupParams.popupSelector;
    this.#_closeButtonSelector = popupParams.closeButtonSelector;
    this.#_popupOpeningModifier = popupParams.popupOpeningModifier;
    this.#_popupElement = document.querySelector(this.#_popupSelector);
    this.#_closeButtonElement = this.#_popupElement.querySelector(this.#_closeButtonSelector);
    this.#_closeByEscapeHandlerBound = this.#_closeByEscapeHandler.bind(this);

    this.#_openButtonClickHandlerBound = this.#_openButtonClickHandler.bind(this);

    this.#_submitClickHandlerBound = this.#_submitClickHandler.bind(this);

    this.#_fieldInputHandlerBound = this.#_fieldInputHandler.bind(this);

    this.#_closeButtonClickHandler = this.#_closePopup.bind(this);
    this.#_popupBackgroundClickHandlerBound = this.#_popupBackgroundClickHandler.bind(this);

    this.#_submitButtonSelector = formParams.submitButtonSelector;
    this.#_submitButtonElement = this.getPopupElement().querySelector(this.#_submitButtonSelector);
    this.#_submitButtonDisableModifier = formParams.submitButtonDisableModifier;

    this.#_setupEventListeners();
  }

  onOpen(onOpenCallback) {
    this.#_onOpenCallback = onOpenCallback;
  }

  onSubmit(onSubmitCallback) {
    this.#_onSubmitCallback = onSubmitCallback;
  }

  enableSubmitButton() {
    this.#_submitButtonElement.removeAttribute('disabled');
    this.#_submitButtonElement.classList.remove(this.#_submitButtonDisableModifier);
  }

  disableSubmitButton() {
    this.#_submitButtonElement.setAttribute('disabled', 'disabled');
    this.#_submitButtonElement.classList.add(this.#_submitButtonDisableModifier);
  }

  getInputFields() {
    return this.getPopupElement().querySelectorAll(this.#_popupFieldSelector);
  }

  #_setupEventListeners() {
    this.#_openButtonElement.addEventListener('click', this.#_openButtonClickHandlerBound);
    this.getPopupElement().addEventListener('submit', this.#_submitClickHandlerBound);
    this.getInputFields().forEach(field => field.addEventListener('input', this.#_fieldInputHandlerBound));
    this.#_closeButtonElement.addEventListener('click', this.#_closeButtonClickHandler);
    this.#_popupElement.addEventListener('click', this.#_popupBackgroundClickHandlerBound);
  }

  #_popupBackgroundClickHandler(evt) {
    if (evt.target !== this.#_popupElement) return;
    this.#_closePopup();
  }

  #_fieldInputHandler(evt) {
    this.checkInputValidity(evt.target);
    this.#_toggleButtonState();
  }

  #_submitClickHandler(evt) {
    evt.preventDefault();
    this.#_onSubmitCallback?.();
    this.#_closePopup();
  }

  #_openButtonClickHandler() {
    this.#_clearErrorFields();
    this.#_onOpenCallback?.();
    this.#_openPopup();
  }

  #_closeByEscapeHandler(evt) {
    if (evt.key !== 'Escape') return;
    this.#_closePopup();
  }

  #_openPopup() {
    this.#_popupElement.classList.add(this.#_popupOpeningModifier);
    document.addEventListener('keydown', this.#_closeByEscapeHandlerBound);
  }

  #_closePopup() {
    this.#_popupElement.classList.remove(this.#_popupOpeningModifier);
    document.removeEventListener('keydown', this.#_closeByEscapeHandlerBound);
  }

  getPopupElement() {
    return this.#_popupElement;
  }

  #_toggleButtonState() {
    if (!Array.from(this.getInputFields()).every(input => input.validity.valid)) {
      this.disableSubmitButton();
      return;
    }
    this.enableSubmitButton();
  }

  #_clearError(field) {
    field.classList.remove(this.#_popupFieldErrorModifier);
    field.parentElement.querySelector(this.#_popupFieldErrorSelector).textContent = '';
  }

  #_displayError(field, errorMessage) {
    field.classList.add(this.#_popupFieldErrorModifier);
    field.parentElement.querySelector(this.#_popupFieldErrorSelector).textContent = errorMessage;
  }

  checkInputValidity(field) {
    if (field.validity.valid) {
      this.#_clearError(field);
      return;
    }
    if (field.validity.valueMissing) {
      this.#_displayError(field, 'Вы пропустили это поле');
    } else if (field.validity.typeMismatch) {
      this.#_displayError(field, 'Введите адрес сайта');
    } else if (field.validity.tooShort) {
      this.#_displayError(field, `Минимальное количество символов: ${field.getAttribute('minlength')}. Длина текста сейчас: ${field.value.length} символ`);
    } else if (field.validity.tooLong) {
      this.#_displayError(field, `Максимальное количество символов: ${field.getAttribute('maxlength')}. Длина текста сейчас: ${field.value.length} символ`);
    }
  }

  #_clearErrorFields() {
    this.getPopupElement().querySelectorAll(this.#_popupFieldSelector).forEach(field => {
      this.#_clearError(field);
    });
  }
}
import Popup from './popup.js';

export default class FormValidator extends Popup {
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

  constructor(formElement, formParams, popupParams) {
    super(popupParams);
    this.#_formElement = formElement;
    this.#_openButtonSelector = formParams.openButtonSelector;
    this.#_popupFieldSelector = formParams.popupFieldSelector;
    this.#_popupFieldErrorSelector = formParams.popupFieldErrorSelector;
    this.#_popupFieldErrorModifier = formParams.popupFieldErrorModifier;

    this.#_submitButtonSelector = formParams.submitButtonSelector;
    this.#_submitButtonElement = super.getPopupElement().querySelector(this.#_submitButtonSelector);
    this.#_submitButtonDisableModifier = formParams.submitButtonDisableModifier;

    this.#_openButtonElement = document.querySelector(this.#_openButtonSelector);
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
    return super.getPopupElement().querySelectorAll(this.#_popupFieldSelector);
  }

  #_setupEventListeners() {
    this.#_openButtonElement.addEventListener('click', () => {
      this.#_clearErrorFields();
      this.#_onOpenCallback?.();
      super.openPopup();
    });

    super.getPopupElement().addEventListener('submit', evt => {
      evt.preventDefault();
      this.#_onSubmitCallback?.();
      super.closePopup();
    });

    this.getInputFields().forEach(field => {
      field.addEventListener('input', evt => {
        this.checkInputValidity(evt.target);
        this.#_toggleButtonState();
      });
    });
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
    super.getPopupElement().querySelectorAll(this.#_popupFieldSelector).forEach(field => {
      this.#_clearError(field);
    });
  }
}
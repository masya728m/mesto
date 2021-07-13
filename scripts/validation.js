let formHandlerMap = null;

function searchInArrayWithMap(array, map) {
  return array.find(elem => map.get(elem));
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const result = searchInArrayWithMap(Array.from(evt.currentTarget.classList), formHandlerMap);
  formHandlerMap.get(result)();
}

function clearError(field, fieldErrorModifier, errorClass) {
  field.classList.remove(fieldErrorModifier);
  field.parentElement.querySelector(errorClass).textContent = '';
}

export function displayError(field, fieldErrorModifier, errorClass, errorMessage) {
  field.classList.add(fieldErrorModifier);
  field.parentElement.querySelector(errorClass).textContent = errorMessage;
}

function checkFieldValidity(field, fieldErrorModifier, errorClass) {
  if (field.validity.valid) {
    clearError(field, fieldErrorModifier, errorClass);
    return;
  }
  if (field.validity.valueMissing) {
    displayError(field, fieldErrorModifier, errorClass, 'Вы пропустили это поле');
  } else if (field.validity.typeMismatch) {
    displayError(field, fieldErrorModifier, errorClass, 'Введите адрес сайта');
  } else if (field.validity.tooShort) {
    displayError(field, fieldErrorModifier, errorClass,
      `Минимальное количество символов: ${field.getAttribute('minlength')}. Длина текста сейчас: ${field.value.length} символ`);
  } else if (field.validity.tooLong) {
    displayError(field, fieldErrorModifier, errorClass,
      `Максимальное количество символов: ${field.getAttribute('maxlength')}. Длина текста сейчас: ${field.value.length} символ`);
  }
}

export function disableButton(button, inactiveButtonModifier) {
  button.setAttribute('disabled', 'disabled');
  button.classList.add(inactiveButtonModifier);
}

export function enableButton(button, inactiveButtonModifier) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonModifier);
}

export function toggleButtonState(inputList, submitButton, inactiveButtonClass) {
  if (!Array.from(inputList).every(input => input.validity.valid)) {
    disableButton(submitButton, inactiveButtonClass);
    return;
  }
  enableButton(submitButton, inactiveButtonClass);
}

export function enableValidation(settings, handlerMap) {
  formHandlerMap = new Map(handlerMap);
  const formSelector = settings?.formSelector;
  const inputSelector = settings?.inputSelector;
  const submitButtonSelector = settings?.submitButtonSelector;
  const inactiveButtonClass = settings?.inactiveButtonClass;
  const inputErrorClass = settings?.inputErrorClass;
  const errorClass = settings?.errorClass;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => {
    if (!searchInArrayWithMap(Array.from(form.classList), handlerMap)) return;
    form.addEventListener('submit', formSubmitHandler);

    const inputList = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);
    inputList.forEach(field => field.addEventListener('input', () => {
      checkFieldValidity(field, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    }));
  });
}
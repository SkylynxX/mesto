
const showInputError = (formElement, inputElement, errorMessage, formDescription) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formDescription.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formDescription.errorClass);
};

const hideInputError = (formElement, inputElement, formDescription) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formDescription.inputErrorClass);
  errorElement.classList.remove(formDescription.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formDescription) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formDescription);
  } else {
    hideInputError(formElement, inputElement, formDescription);
  }
};

const setEventListeners = (formElement, formDescription) => {
  const inputList = Array.from(formElement.querySelectorAll(formDescription.inputSelector));
  const buttonElement = formElement.querySelector(formDescription.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, formDescription);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formDescription);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, formDescription);
    });
  });
};



const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

const toggleButtonState = (inputList, buttonElement, formDescription) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(formDescription.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove(formDescription.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
};

const enableValidation = (formDescription) => {
  // получение массива форм для валидации
  const formList = Array.from(document.querySelectorAll(formDescription.formSelector));
  // отмена стандартного поведения для каждой из выбранных форм
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //добавляю валидацию для формы
    setEventListeners(formElement, formDescription);
  });
};
// включение валидации вызовом enableValidation
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
});

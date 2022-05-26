export class FormValidator {
  constructor (validatorDescription, validatorForm) {
    this._inputSelector = validatorDescription.inputSelector;
    this._submitButtonSelector = validatorDescription.submitButtonSelector;
    this._inactiveButtonClass = validatorDescription.inactiveButtonClass;
    this._inputErrorClass = validatorDescription.inputErrorClass;
    this._errorClass = validatorDescription.errorClass;
    this._formElement = validatorForm;
  }

    _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._validateInputField(inputList, inputElement, buttonElement));
    });
  };

  _validateInputField (inputList, inputElement, buttonElement) {
    this._checkInputValidity(inputElement);
    // чтобы проверять его при изменении любого из полей
    this._toggleButtonState(inputList, buttonElement);
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButten (buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButten(buttonElement);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  enableValidation () {
    // отмена стандартного поведения для каждой из выбранных форм
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //добавляю валидацию для формы
    this._setEventListeners();
  };
};

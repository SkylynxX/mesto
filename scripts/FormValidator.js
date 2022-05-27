export class FormValidator {
  constructor (validatorDescription, validatorForm) {
    this._inputSelector = validatorDescription.inputSelector;
    this._submitButtonSelector = validatorDescription.submitButtonSelector;
    this._inactiveButtonClass = validatorDescription.inactiveButtonClass;
    this._inputErrorClass = validatorDescription.inputErrorClass;
    this._errorClass = validatorDescription.errorClass;
    this._formElement = validatorForm;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._validateInputField(inputElement));
    });
  };

  _validateInputField (inputElement) {
    this._checkInputValidity(inputElement);
    // чтобы проверять его при изменении любого из полей
    this._toggleButtonState();
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableButton () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
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

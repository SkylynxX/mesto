import { FormValidator } from './FormValidator.js';

export class Popup {
  constructor (selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popup = document.querySelector(`.${selectorPopup}`);
    this._form = document.querySelector(`.${selectorPopup}__form`);
    this._closePopupButton =  this._popup.querySelector(`.${selectorPopup}__close`);
    this._validatorFields = {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__save',
      inactiveButtonClass: 'popup__save_disabled',
      inputErrorClass: 'popup__input_error',
      errorClass: 'popup__input-error_visible'
    };
  }

  open () {
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._closePopupButton.addEventListener('click', () => this.close());
  }
}

export class PopupWithImage extends Popup {
  open (item) {
    this._popup.querySelector('.popup-image__img').src = item.querySelector('.element__image').src;
    this._popup.querySelector('.popup-image__img').alt = item.querySelector('.element__group-text').textContent;
    this._popup.querySelector('.popup-image__text').textContent = item.querySelector('.element__group-text').textContent;
    this._popup.classList.add('popup_opened');
  }
}

export class PopupWithForm extends Popup {
  constructor (selectorPopup, callbackFormSub ) {
    super(selectorPopup);

    this._callbackFormSub = callbackFormSub;

  }

  _getInputValues () {
    const inputs = this._form.querySelectorAll('input');
    this._inputs = {};
    inputs.forEach((item) => {
      this._inputs[item.name] = item.value;
    },this)
  }

  _submitForm () {
    this._getInputValues();
    this._callbackFormSub(this._inputs);
    this.close();
  };


  open () {
    //overload для случая когда надо подставить данные в открывающуюся форveу
    switch (arguments.length) {
    case 1:
      this._popup.querySelector(`.${this._selectorPopup}__input-name`).value = arguments[0].userName;
      this._popup.querySelector(`.${this._selectorPopup}__input-info`).value = arguments[0].userInfo;
      this._popup.classList.add('popup_opened');
      break;
    default:
      this._popup.classList.add('popup_opened');
      break;
    }
  }

  close () {
    this._popup.classList.remove('popup_opened');
    this._form.reset();
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
    this._closePopupButton.addEventListener('click', () => this.close());
    this._validatorForm = new FormValidator(this._validatorFields, this._form);
    this._validatorForm.enableValidation();

  }
}

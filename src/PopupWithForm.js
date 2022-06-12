import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor (selectorPopup, callbackFormSub ) {
    super(selectorPopup);
    this._callbackFormSub = callbackFormSub;
    this._form = document.querySelector(`.${selectorPopup}__form`);
    this._inputName = this._popup.querySelector(`.${this._selectorPopup}__input-name`);
    this._inputInfo = this._popup.querySelector(`.${this._selectorPopup}__input-info`);
    this._formInputs = this._form.querySelectorAll('input');
  }

  _getInputValues () {
    this._inputs = {};
    this._formInputs.forEach((item) => {
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
      this._inputName.value = arguments[0].userName;
      this._inputInfo.value = arguments[0].userInfo;
      break;
    default:
      break;
    }
    this._validatorForm.resetValidation();
    super.open();
  }

  close () {
    super.close();
    this._form.reset();
    // this._validatorForm.disableButton();
  }

  setEventListeners (validatorForm) {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
    this._closePopupButton.addEventListener('click', () => this.close());
    this._validatorForm = validatorForm;
    this._validatorForm.enableValidation();
  }
  getForm() {
    return this._form;
  }
}

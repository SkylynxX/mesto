import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor (selectorPopup, callbackFormSub ) {
    super(selectorPopup);
    this._callbackFormSub = callbackFormSub;
    this._form = document.querySelector(`${selectorPopup}__form`);
    this._inputName = this._popup.querySelector(`${this._selectorPopup}__input-name`);
    this._inputInfo = this._popup.querySelector(`${this._selectorPopup}__input-info`);
    this._submitButton = this._popup.querySelector(`${this._selectorPopup}__save`);
    this._formInputs = this._form.querySelectorAll('input');
  }

  _getInputValues () {
    this._inputs = {};
    this._formInputs.forEach((item) => {
      this._inputs[item.name] = item.value;
    },this)
  }

  setButtonText (buttonString) {
    this._submitButton.textContent = buttonString;
  }

  _submitForm () {
    this._getInputValues();
    this._callbackFormSub(this._inputs);
  };

  setInputValues(data){
    this._formInputs.forEach((input) =>{
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  close () {
    super.close();
    this._form.reset();
  }

  setEventListeners () {
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
  }

  getForm() {
    return this._form;
  }
}
